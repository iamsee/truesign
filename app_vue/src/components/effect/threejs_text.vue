<template>
  <div id="v-basethreejs" :style="{width:screenWidth+'px',height:screenHeight+'px'}">
    <input type="button" value="重新描绘" @click="init_objects" style="margin-left: 400px;display: none">
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import drawThreejs from '../../api/drawThreejs'

  const TWEEN = require('@tweenjs/tween.js');
  global.THREE = require('three/build/three')
  var TrackballControls = require('three/examples/js/controls/TrackballControls')
  var CSS3DRenderer = require('three/examples/js/renderers/CSS3DRenderer')

  var stats = require('three/examples/js/libs/stats.min')
  var Projector = require('three/examples/js/renderers/Projector')
  var DAT = require('three/examples/js/libs/dat.gui.min')
  var CanvasRenderer = require('three/examples/js/renderers/CanvasRenderer')


  /*文字展示效果*/

  import {SpriteText2D, MeshText2D, textAlign} from 'three-text2d'

  export default {
    data() {
      return {
        screenWidth: document.body.clientWidth,   // 这里是给到了一个默认值 （这个很重要）
        screenHeight: document.body.clientHeight,  // 这里是给到了一个默认值 （这个很重要）
        mouse_move: {
          mouseX: 0,
          mouseY: 0,
        },
        threejs_dev: {
          stats: '',
          gui: '',
          container: '',
          scene: '',
          camera: '',
          renderer: '',
          controls: '',
          objects: '',
          meshs: [],
          tween: {
            obj: {},
            opts: {
              range: 800,
              duration: 2500,
              delay: 200,
              easing: 'Elastic.EaseInOut',
              position: {
                x: 0,
                y: 0,
                z: 0,
              },
              scale: {
                x: 1,
                y: 1,
                z: 1
              }
            }
          }
        },
        textureList: [
          require("../../../static/img/flowers/flower-1.png"),
          require("../../../static/img/flowers/flower-2.png"),
          require("../../../static/img/flowers/flower-3.png"),
          require("../../../static/img/flowers/flower-4.png"),
          require("../../../static/img/flowers/flower-5.png"),
          require("../../../static/img/flowers/flower-6.png"),
          require("../../../static/img/flowers/flower-7.png"),
          require("../../../static/img/flowers/flower-8.png"),
          require("../../../static/img/flowers/flower-9.png"),
          require("../../../static/img/flowers/flower-10.png"),

        ],
        particles: [],
        note: {
          statistic: {count: 0},
          data: []
        }
      }
    },
    computed: {
      // 使用对象展开运算符将 getters 混入 computed 对象中
      ...mapGetters([
        'sysinfo',
      ])
    },
    created() {
      var vm = this
      this.$root.eventHub.$on('screenWidth2screenHeight', function (data) {
        var width2height = data.split(",")
        vm.screenWidth = parseInt(width2height[0])
        vm.screenHeight = parseInt(width2height[1])
        vm.do_resize()
      })

    },
    mounted() {
      this.start()
      window.addEventListener('resize', this.init_resize, false);

    },
    methods: {
      start() {
        var vm = this
//        this.initStats()

        this.init_renderer()
        this.init_container()
        this.init_scene()
        this.init_camera()
//        this.init_helper()
        this.init_objects()
        this.init_controls()
        this.do_render()
        this.do_animate()
      },
//      initGui() {
//        var Options = function () {
//          this.color0 = "#ffae23"; // CSS string
//          this.color1 = [0, 128, 255]; // RGB array
//          this.color2 = [0, 128, 255, 0.3]; // RGB with alpha
//          this.color3 = {h: 350, s: 0.9, v: 0.3}; // Hue, saturation, value
//        };
//        var options = new Options();
//        var gui = new DAT.GUI();
//        gui.addColor(options, 'color0');
//        gui.addColor(options, 'color1');
//        gui.addColor(options, 'color2');
//        gui.addColor(options, 'color3');
//      },
      initStats() {
        let old_stats = document.getElementById('threejs_stats')
        if (old_stats !== null) {
          document.body.removeChild(old_stats);
        }
        this.threejs_dev.stats = new Stats()
        this.threejs_dev.stats.setMode(0);
        this.threejs_dev.stats.domElement.id = 'threejs_stats'
        this.threejs_dev.stats.domElement.style.position = 'fixed';
        this.threejs_dev.stats.domElement.style.left = this.screenWidth - 100 + 'px';
        this.threejs_dev.stats.domElement.style.top = this.screenHeight - 100 + 'px';
//                this.threejs_dev.stats.domElement.style.width = '300px';
//                this.threejs_dev.stats.domElement.style.height = '100px';
        document.body.appendChild(this.threejs_dev.stats.domElement);
      },
      initTween() {
        var vm = this
        var update = function () {
          vm.threejs_dev.meshs['move_cube'].position.x = current.x;
        }
        var current = {x: -vm.threejs_dev.tween.opts.range};
        TWEEN.removeAll();
        var easing = TWEEN.Easing[vm.threejs_dev.tween.opts.easing.split('.')[0]][vm.threejs_dev.tween.opts.easing.split('.')[1]];
        var tweenHead = new TWEEN.Tween(current)
          .to({x: +vm.threejs_dev.tween.opts.range}, vm.threejs_dev.tween.opts.duration)
          .delay(vm.threejs_dev.tween.opts.delay)
          .easing(easing)
          .onUpdate(update);
        var tweenBack = new TWEEN.Tween(current)
          .to({x: -vm.threejs_dev.tween.opts.range}, vm.threejs_dev.tween.opts.duration)
          .delay(vm.threejs_dev.tween.opts.delay)
          .easing(easing)
          .onUpdate(update);
        tweenHead.chain(tweenBack);
        tweenBack.chain(tweenHead);
        tweenHead.start();
      },
      do_change_render() {

      },
      init_renderer() {
        this.threejs_dev.renderer = new THREE.WebGLRenderer();
        this.threejs_dev.renderer.setClearColor(0xffffff, 1);
        this.threejs_dev.renderer.setPixelRatio(window.devicePixelRatio);
        this.threejs_dev.renderer.setSize(this.screenWidth, this.screenHeight);

        this.threejs_dev.renderer.shadowMap.enabled = true
        this.threejs_dev.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.threejs_dev.renderer.gammaInput = true;
        this.threejs_dev.renderer.gammaOutput = true;

      },
      init_container() {
        var vm = this
        this.threejs_dev.container = document.createElement('div');
        document.getElementById("v-basethreejs").appendChild(this.threejs_dev.container);
//        console.log('container_div', this.threejs_dev.container)
        this.threejs_dev.container.id = 'container_div'
        this.threejs_dev.container.style.fontSize = 0
        this.threejs_dev.container.appendChild(this.threejs_dev.renderer.domElement);
      },
      init_scene() {
        this.threejs_dev.scene = new THREE.Scene();
//                this.threejs_dev.scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
      },
      init_camera() {
        this.threejs_dev.camera = new THREE.PerspectiveCamera(45, this.screenWidth / this.screenHeight, 0.1, 10000);
        this.threejs_dev.camera.position.set(50, 30, 1000);
        this.threejs_dev.camera.lookAt(new THREE.Vector3(0, 0, 0))
      },
      init_helper() {
        var vm = this
        /*环境光*/
        var ambient = new THREE.AmbientLight(0xffffff, 0.4);
        this.threejs_dev.scene.add(ambient);

        var floor_material = new THREE.MeshPhongMaterial({color: 0x666666, dithering: true});
        var floor_geometry = new THREE.BoxGeometry(1000, 1, 1000);
        var floor_mesh = new THREE.Mesh(floor_geometry, floor_material);
        floor_mesh.position.set(0, -10, 0);
        floor_mesh.receiveShadow = true;
        this.threejs_dev.scene.add(floor_mesh);


        var floorcenter_material = new THREE.MeshPhongMaterial({color: 0x4080ff, dithering: true});
        var loorcenter_geometry = new THREE.BoxGeometry(3, 1, 2);
        var loorcenter_mesh = new THREE.Mesh(loorcenter_geometry, floorcenter_material);
        loorcenter_mesh.position.set(10, 10, 0);
        loorcenter_mesh.castShadow = true;
        this.threejs_dev.scene.add(loorcenter_mesh);

        let spotLight = new THREE.SpotLight(0xffffff, 1);
        spotLight.position.set(50, 50, 0);
        spotLight.angle = Math.PI / 6;
        spotLight.penumbra = 0.05;
        spotLight.decay = 2;
        spotLight.distance = 200;
        spotLight.castShadow = true;
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;
        spotLight.shadow.camera.near = 10;
        spotLight.shadow.camera.far = 200;
        this.threejs_dev.scene.add(spotLight);
        let lightHelper = new THREE.SpotLightHelper(spotLight);
        this.threejs_dev.scene.add(lightHelper);
        let shadowCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
        this.threejs_dev.scene.add(shadowCameraHelper);
        this.threejs_dev.scene.add(new THREE.AxisHelper(10));

      },
      init_controls() {
        this.threejs_dev.controls = new THREE.TrackballControls(this.threejs_dev.camera, this.threejs_dev.renderer.domElement);

        this.threejs_dev.controls.rotateSpeed = 1.0;
        this.threejs_dev.controls.zoomSpeed = 1.2;
        this.threejs_dev.controls.panSpeed = 0.8;
        this.threejs_dev.controls.noZoom = false;
        this.threejs_dev.controls.noPan = false;
        this.threejs_dev.controls.staticMoving = false;
        this.threejs_dev.controls.dynamicDampingFactor = 0.1;
        this.threejs_dev.controls.keys = [65, 83, 68];
//                this.threejs_dev.controls.addEventListener('mousemove', this.do_render);


      },
      init_objects() {

        let sprite = new SpriteText2D(
          '你在等..什么...',
          {align: textAlign.center, font: '40px Arial', fillStyle: '#000000', antialias: true}
        )
        this.threejs_dev.scene.add(sprite);
        this.addMeshToScene('sprite', sprite)
        var text = ''
        var time = ''
        var vm = this
        setInterval(function () {
          vm.$http.post('https://www.iamsee.com/Note/getNote?app=note', [], this.$http_config)
          //              axios.post(this.wechat_marketing_store.apihost+'LoginOrReg/login',formdata,axios_config)
            .then((res) => {
              if (res.data.code === 0) {
                if (res.data.response.statistic.count > 0 && vm.note.statistic.count !== res.data.response.statistic.count) {
                  vm.note.statistic = res.data.response.statistic
                  vm.note.data = res.data.response.data
                }
              }


              if (vm.threejs_dev.meshs.hasOwnProperty('sprite')) {
                vm.threejs_dev.scene.remove(vm.threejs_dev.meshs.sprite);
                vm.threejs_dev.scene.remove(vm.threejs_dev.meshs.time);
              }
              if (vm.note.statistic.count > 0) {
                let num = parseInt(vm.randomNumLeft(0, vm.note.statistic.count))
                let data = vm.note.data[num]
                text = data.note
                time = data.update_time

              }
              else {
                text = '数据等待中...'
              }

              let sprite = new SpriteText2D(
                text,
                {align: textAlign.center, font: '40px Arial', fillStyle: '#000000', antialias: true}
              )
              vm.threejs_dev.scene.add(sprite);
              vm.addMeshToScene('sprite', sprite)

              let time = new SpriteText2D(
                time,
                {align: textAlign.topLeft, font: '20px Arial', fillStyle: '#000000', antialias: true}
              )
//              vm.threejs_dev.scene.add(time);
              vm.addMeshToScene('time', time)
            })

        },5000)


//        this.threejs_dev.scene.add(text);
      },
      init_resize() {
        var vm = this

        this.threejs_dev.camera.aspect = this.screenWidth / this.screenHeight
        this.threejs_dev.camera.updateProjectionMatrix();

        this.threejs_dev.renderer.setSize(this.screenWidth, this.screenHeight);


      },
      init_mouse_move(event) {
        this.mouse_move.mouseX = ( event.clientX - this.screenWidth / 2 );
        this.mouse_move.mouseY = ( event.clientY - this.screenHeight / 2 ) * 1;


      },
      do_render() {
        var delta = 10
//        console.log("this.threejs_dev.meshs['laserBeam'].object3d",this.threejs_dev.meshs['laserBeam'].object3d)
//        this.threejs_dev.meshs['line_object3d'].rotation.x += 0.4 * delta;
//        this.threejs_dev.meshs['line_object3d'].rotation.y += 0.5 * delta;
        this.threejs_dev.renderer.render(this.threejs_dev.scene, this.threejs_dev.camera);


      },
      do_animate() {
        requestAnimationFrame(this.do_animate);
        this.threejs_dev.controls.update();
//        this.threejs_dev.stats.update()
        this.do_render();


      },
      do_resize() {
        this.initStats()
        this.threejs_dev.renderer.setSize(this.screenWidth, this.screenHeight);
        this.init_camera()
        this.init_controls()
      },
      /*###### 扩展方法  #############*/
      addMeshToScene(name, mesh) {
        this.threejs_dev.meshs[name] = mesh
      },
      generateLaserBodyCanvas() {
        // init canvas
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        canvas.width = 1;
        canvas.height = 1;
        // set gradient
        var gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
//        gradient.addColorStop(0, 'rgba(  0,  0,  0,0.1)');
//        gradient.addColorStop(0.1, 'rgba(160,160,160,0.3)');
//        gradient.addColorStop(0.5, 'rgba(255,255,255,0.5)');
//        gradient.addColorStop(0.9, 'rgba(160,160,160,0.3)');
//        gradient.addColorStop(1.0, 'rgba(  0,  0,  0,0.1)');
//        gradient.addColorStop(0, 'rgba(  255,  255,  255,0.1)');
//        gradient.addColorStop(0.1, 'rgba(255,255,255,0.3)');
//        gradient.addColorStop(0.5, 'rgba(255,255,255,0.5)');
//        gradient.addColorStop(0.9, 'rgba(255,255,255,0.3)');
        gradient.addColorStop(0, 'rgba(  0,  0, 0,1)');
        gradient.addColorStop(1.0, 'rgba(  255,  255, 255,1)');
        // fill the rectangle
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
        // return the just built canvas
        return canvas;
      },
      randomNumLeft(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.floor(Rand * Range); //舍去
        return num;
      }


    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  #v-time2hope

    background-color transparent
</style>
