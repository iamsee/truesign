<template>
    <div>
        <div id="threejs_dev" style="overflow: hidden;text-align: center;background-color: #ffffff">

        </div>
        <div id="video_div">
            <video id="video" autoplay loop webkit-playsinline style="display:none">
                <source src="http://truesign-app.oss-cn-beijing.aliyuncs.com/demo_video/sintel.mp4"
                        type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
                <source src="http://truesign-app.oss-cn-beijing.aliyuncs.com/demo_video/sintel.ogv"
                        type='video/ogg; codecs="theora, vorbis"'>
            </video>
        </div>
    </div>
</template>


<script>
    const TWEEN = require('@tweenjs/tween.js');
    var THREE = require('three/build/three')
    var TrackballControls = require('three/examples/js/controls/TrackballControls')
    var CSS3DRenderer = require('three/examples/js/renderers/CSS3DRenderer')

    var stats = require('three/examples/js/libs/stats.min')
    var Projector = require('three/examples/js/renderers/Projector')
    var DAT = require('three/examples/js/libs/dat.gui.min')
    var CanvasRenderer = require('three/examples/js/renderers/CanvasRenderer')
    export default {
        data () {
            return {
                screenWidth: document.body.clientWidth,   // 这里是给到了一个默认值 （这个很重要）
                screenHeight: document.body.clientHeight,  // 这里是给到了一个默认值 （这个很重要）
                mouse_move: {
                    mouseX: 0,
                    mouseY: 0,
                },
                threejs_dev: {
                    stats: '',
                    gui:'',
                    container: '',
                    scene: '',
                    camera: '',
                    renderer: '',
                    controls: '',
                    objects: '',
                    meshs: {},
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
                particles: []
            }
        },
        created(){
            var vm = this
            this.$root.eventHub.$on('screenWidth2screenHeight', function (data) {
//                console.log('screenWidth2screenHeight')
//                console.log(data)
                var width2height = data.split(",")
//                console.log(width2height)
                vm.screenWidth = parseInt(width2height[0])
                vm.screenHeight = parseInt(width2height[1])
            })
            var Options = function() {
                this.number = 1;
            };

            window.onload = function() {
                var options = new Options();
                var gui = new DAT.GUI();
                var controller = gui.add(options, 'number').min(0).max(10).step(1);

                controller.onChange(function(value) {
                    console.log("onChange:" + value)
                });

                controller.onFinishChange(function(value) {
                    console.log("onFinishChange" + value)
                });
            };
        },
        mounted(){
            this.start()
            window.addEventListener('resize', this.init_resize, false);

        },
        methods: {
            start(){
                var vm = this
                this.initStats()

                this.init_renderer()
                this.init_container()
                this.init_scene()
                this.init_camera()
                this.init_helper()
                this.init_objects()

//                this.initGui(this.threejs_dev.tween.opts,function (options) {
//                    console.log("userOpts", userOpts)
//                    vm.initTween();
//                    console.log('callback=>',options)
//                    console.log('callback=>',vm.threejs_dev.tween.opts)
//                })

//                this.initGui(this.threejs_dev.tween.opts)
                this.init_controls()
                this.do_render()
                this.do_animate()


            },
            initGui(){
                var Options = function() {
                    this.color0 = "#ffae23"; // CSS string
                    this.color1 = [ 0, 128, 255 ]; // RGB array
                    this.color2 = [ 0, 128, 255, 0.3 ]; // RGB with alpha
                    this.color3 = { h: 350, s: 0.9, v: 0.3 }; // Hue, saturation, value
                };
                var options = new Options();
                var gui = new DAT.GUI();
                gui.addColor(options, 'color0');
                gui.addColor(options, 'color1');
                gui.addColor(options, 'color2');
                gui.addColor(options, 'color3');
            },
            initStats(){
                let old_stats = document.getElementById('threejs_stats')
                if (old_stats !== null) {
                    document.body.removeChild(old_stats);
                }
                this.threejs_dev.stats = new Stats()
                this.threejs_dev.stats.setMode(0);
                this.threejs_dev.stats.domElement.id = 'threejs_stats'
                this.threejs_dev.stats.domElement.style.position = 'fixed';
                this.threejs_dev.stats.domElement.style.left = this.screenWidth - 100 + 'px';
                this.threejs_dev.stats.domElement.style.top = this.screenHeight-100+'px';
//                this.threejs_dev.stats.domElement.style.width = '300px';
//                this.threejs_dev.stats.domElement.style.height = '100px';
                document.body.appendChild(this.threejs_dev.stats.domElement);
            },
            initTween(){
                var vm = this
                var update	= function(){
                    vm.threejs_dev.meshs['move_cube'].position.x = current.x;
                }
                var current	= { x: -vm.threejs_dev.tween.opts.range };
                TWEEN.removeAll();
                var easing	= TWEEN.Easing[vm.threejs_dev.tween.opts.easing.split('.')[0]][vm.threejs_dev.tween.opts.easing.split('.')[1]];
                var tweenHead	= new TWEEN.Tween(current)
                    .to({x: +vm.threejs_dev.tween.opts.range}, vm.threejs_dev.tween.opts.duration)
                    .delay(vm.threejs_dev.tween.opts.delay)
                    .easing(easing)
                    .onUpdate(update);
                var tweenBack	= new TWEEN.Tween(current)
                    .to({x: -vm.threejs_dev.tween.opts.range}, vm.threejs_dev.tween.opts.duration)
                    .delay(vm.threejs_dev.tween.opts.delay)
                    .easing(easing)
                    .onUpdate(update);
                tweenHead.chain(tweenBack);
                tweenBack.chain(tweenHead);
                tweenHead.start();
            },
            do_change_render(){
//                this.threejs_dev.renderer.setSize(500,500);


            },
            init_renderer(){
                this.threejs_dev.renderer = new THREE.CanvasRenderer();
                this.threejs_dev.renderer.setClearColor(0xffffff, 1);
                this.threejs_dev.renderer.setPixelRatio(window.devicePixelRatio);
                this.threejs_dev.renderer.setSize(this.screenWidth, this.screenHeight);

            },
            init_container(){
                var vm = this
                this.threejs_dev.container = document.createElement('div');
//                this.threejs_dev.container.style.width = this.screenWidth+'px'
//                this.threejs_dev.container.style.height = this.screenHeight+'px'
                document.getElementById("threejs_dev").appendChild(this.threejs_dev.container);
                this.threejs_dev.container.appendChild(this.threejs_dev.renderer.domElement);
            },
            init_scene(){
                this.threejs_dev.scene = new THREE.Scene();
//                this.threejs_dev.scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
            },
            init_camera(){
                this.threejs_dev.camera = new THREE.PerspectiveCamera(55, this.screenWidth / this.screenHeight, 1, 10000);
                this.threejs_dev.camera.position.z = 1000;
            },
            init_helper(){
                var vm = this
                var separation = 50;
                var amountx = 10;
                var amounty = 10;
                var PI2 = Math.PI * 2;
                var material = new THREE.SpriteCanvasMaterial({

//                    color: 0x000000,
                    color: 0xE72D2D,
                    program: function (context) {

                        context.beginPath();
                        context.arc(0, 0, 1, 0, PI2, true);
                        context.fill();

                    }

                });
                for (var ix = 0; ix < amountx; ix++) {

                    for (var iy = 0; iy < amounty; iy++) {

                        var particle = new THREE.Sprite(material);
                        particle.position.x = ix * separation - ( ( amountx * separation ) / 2 );
                        particle.position.y = -153;
                        particle.position.z = iy * separation - ( ( amounty * separation ) / 2 );
                        particle.scale.x = particle.scale.y = 6;
                        vm.threejs_dev.scene.add(particle);

                    }

                }




            },
            init_controls(){
                // this.threejs_dev.controls = new THREE.TrackballControls(this.threejs_dev.camera, this.threejs_dev.renderer.domElement);
                // this.threejs_dev.controls.rotateSpeed = 1;
                // this.threejs_dev.controls.minDistance = 500;
                // this.threejs_dev.controls.maxDistance = 6000;
                // this.threejs_dev.controls.addEventListener('change', this.do_render);


//                this.threejs_dev.controls = new THREE.TrackballControls(this.threejs_dev.camera);
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
            init_objects(){
                var vm = this
                this.threejs_dev.video = document.getElementById('video');

                //

                this.threejs_dev.image = document.createElement('canvas');
                this.threejs_dev.image.width = 480;
                this.threejs_dev.image.height = 204;

                this.threejs_dev.imageContext = this.threejs_dev.image.getContext('2d');
                this.threejs_dev.imageContext.fillStyle = '#000000';
                this.threejs_dev.imageContext.fillRect(0, 0, 480, 204);
                this.threejs_dev.texture = new THREE.Texture(this.threejs_dev.image);

                var material = new THREE.MeshBasicMaterial({map: this.threejs_dev.texture, overdraw: 0.5});


                var plane = new THREE.CubeGeometry(480, 204, 0);


                var width_num = this.screenWidth / 480 + 1
                var height_num = this.screenHeight / 204 + 1
                var amount = width_num * height_num
//                for(let i=0; i< width_num; i++){
//                    for(let j = 0; j<height_num; j++){
//                        let mesh  = new THREE.Mesh( plane, material );
//                        mesh.position.set(-this.screenWidth/2+38 + i* 480,this.screenHeight/2  -j*204,1)
//                        this.threejs_dev.scene.add(mesh);
//                    }
//                }

                let base_mesh = new THREE.Mesh(plane, material);
                base_mesh.position.set(-30, 0, 10)
                base_mesh.scale.x = base_mesh.scale.y = base_mesh.scale.z = 1.5;
                this.addMeshToScene('base_mesh', base_mesh);


                var cube = new THREE.Mesh(new THREE.CubeGeometry(200, 200, 200), new THREE.MeshNormalMaterial());
                cube.position.x = -530;
                cube.position.y = 0;
                cube.position.z = 0;
                this.addMeshToScene('cube', cube);


                var img = require('../../../static/img/flag_of_china.png')
                var imgTexture = THREE.ImageUtils.loadTexture(img);
//                var imgTexture = THREE.TextureLoader(img,{}, function() { this.threejs_dev.renderer.render(this.threejs_dev.scene, this.threejs_dev.camera);});
                var imgMaterial = new THREE.MeshLambertMaterial({map: imgTexture});
                var imgMesh = new THREE.Mesh(new THREE.CubeGeometry(200, 200, 200), imgMaterial);
                imgMesh.position.x = 550;
                imgMesh.position.y = 0;
                imgMesh.position.z = 0;
                this.addMeshToScene('imgMesh', imgMesh);


                var urlPrefix1 = require("../../../static/sky/posx.jpg");
                var urlPrefix2 = require("../../../static/sky/negx.jpg");
                var urlPrefix3 = require("../../../static/sky/posy.jpg");
                var urlPrefix4 = require("../../../static/sky/negy.jpg");
                var urlPrefix5 = require("../../../static/sky/posz.jpg");
                var urlPrefix6 = require("../../../static/sky/negz.jpg");

                var urls = [urlPrefix1, urlPrefix2, urlPrefix3, urlPrefix4, urlPrefix5, urlPrefix6];
                var materials = [];
                for (var i = 0; i < urls.length; i++) {
                    console.log(i)
                    materials.push(new THREE.MeshBasicMaterial({
                            map: THREE.ImageUtils.loadTexture(urls[i])
                        })
                    )
                }
                var textureCubeFace = new THREE.MeshFaceMaterial(materials);
                var skyboxMeshFace = new THREE.Mesh(new THREE.CubeGeometry(200, 200, 200), textureCubeFace);
                skyboxMeshFace.position.x = 0;
                skyboxMeshFace.position.y = 330;
                skyboxMeshFace.position.z = 0;
                this.addMeshToScene('skyboxMeshFace', skyboxMeshFace);


                var cube_move = new THREE.Mesh(new THREE.SphereGeometry(80, 48, 32), new THREE.MeshNormalMaterial());
                cube_move.position.x = -530;
                cube_move.position.y = 330;
                cube_move.position.z = 0;
                this.addMeshToScene('cube_move', cube_move);

            },
            init_resize(){
                var vm = this

                this.threejs_dev.camera.aspect = this.screenWidth / this.screenHeight
                this.threejs_dev.camera.updateProjectionMatrix();

                this.threejs_dev.renderer.setSize(this.screenWidth, this.screenHeight);


            },
            init_mouse_move(event){
                this.mouse_move.mouseX = ( event.clientX - this.screenWidth / 2 );
                this.mouse_move.mouseY = ( event.clientY - this.screenHeight / 2 ) * 1;


            },
            do_render(){


                if (this.threejs_dev.video.readyState === this.threejs_dev.video.HAVE_ENOUGH_DATA) {

                    this.threejs_dev.imageContext.drawImage(this.threejs_dev.video, 0, 0);

                    if (this.threejs_dev.texture) this.threejs_dev.texture.needsUpdate = true;
//                    if ( this.threejs_dev.textureReflection ) this.threejs_dev.textureReflection.needsUpdate = true;
//
//                    this.threejs_dev.imageReflectionContext.drawImage( this.threejs_dev.image, 0, 0 );
//                    this.threejs_dev.imageReflectionContext.fillStyle = this.threejs_dev.imageReflectionGradient;
//                    this.threejs_dev.imageReflectionContext.fillRect( 0, 0, 480, 204 );

                }
                this.threejs_dev.renderer.render(this.threejs_dev.scene, this.threejs_dev.camera);

            },
            do_animate() {
                requestAnimationFrame(this.do_animate);
                this.threejs_dev.controls.update();
                this.threejs_dev.stats.update()
                this.do_render();


            },

            /*###### 扩展方法  #############*/
            addMeshToScene(name, mesh){
                this.threejs_dev.meshs[name] = mesh
                this.threejs_dev.scene.add(mesh)
            }


        }
    }
</script>
<style>
    #threejs_dev, #threejs_dev div {
        font-size: 0;
    }

    #video_div {
        font-family: Monospace;
        background-color: #f0f0f0 !important;
        margin: 0px !important;
        overflow: visible;
    }
</style>
