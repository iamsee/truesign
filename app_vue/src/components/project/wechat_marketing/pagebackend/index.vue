<template>
    <div v-if="wechat_marketing_store.last_response.code === 0" class="top_router_view"
         style="background-color: gainsboro;text-align: center;overflow: hidden;">

        <p class="top_router_tip" style="opacity: 0.2">wechat_marketing pagebackend</p>

        <navmenu :logo="logo" :menulist="menulist"
                 :navmenu_theme_color="navmenu_theme_color" :menu_item_color="'#cbcfe4'"
                 :account_info="'/wechat_marketing_backend/accountInfo'"
                 ></navmenu>


        <div style="min-width: 1200px;height:100%;width: 100%;background-color: transparent;margin: 0 auto;padding-top: 65px;">
            <transition name="el-zoom-in-top">
                <router-view></router-view>
            </transition>
        </div>
    </div>
    <div v-else="wechat_marketing_store.last_response.code === 0" class="top_router_view"
         style="background-color: gainsboro;text-align: center;overflow: hidden;padding-top: 10%">
        <p style="display: block;margin:0 auto;font-size: 25px;letter-spacing: 2px" v-if="wechat_marketing_store.last_response.code">【{{ wechat_marketing_store.last_response.code }}】 {{ wechat_marketing_store.last_response.desc }}</p>

    </div>
</template>


<script>
  import navmenu from '../../../common/navmenu.vue'
  import breadcrumb from '../../../common/breadcrumb .vue'
  import { wechat_marketing_apihost } from '../../../../app_config/base_config'
  import { isEmpty } from '../../../../api/lib/helper/dataAnalysis'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data(){
      return {
        logo: 'https://res.wx.qq.com/mpres/htmledition/images/bg/bg_logo318e8e.png',
        menulist: {
          w_m_b_site_ctrl: '站点管理',
          w_m_b_business_client_ctrl: '客户管理',
          w_m_b_weimob_ctrl: '微信公众号管理',
//                    w_m_b_wechat_content_ctrl:'内容管理',
          w_m_b_fun_ctrl: '功能管理',
          w_m_b_agent_ctrl: '代理商管理',
          w_m_b_extend_ctrl: '统计、日志、审核'
        },
        navmenu_theme_color: '#324157',

        token:this.wechat_marketing_store
      }
    },
    props: {},
    components: {
      navmenu,
      breadcrumb

    },
    computed: {
      ...mapGetters([
        'wechat_marketing_store',
      ])

    },
    created(){
//            console.log('wechat_marketing_apihost',wechat_marketing_apihost)
      this.updateWechat_marketing_store({
        apihost: wechat_marketing_apihost
      })
      var source_name = this.$route.params.source_name
//      if (!isEmpty(this.wechat_marketing_store.token) && !isEmpty(this.wechat_marketing_store.userinfo)) {
//        if (this.$route.path === '/wechat_marketing_backend') {
//          this.$router.push('/wechat_marketing_backend/w_m_b_site_ctrl')
//        }
//      }
      this.check_access()

    },
    mounted(){
      var vm = this
      this.$root.eventHub.$on('changeNavMenu', function (data) {
        switch (data) {
          case 0:
            console.log(data)
            break;
          case 1:
            console.log(data)

            break;
          case 2:
            console.log(data)

            break;
          case 3:
            console.log(data)

            break;
          default:
            console.log(data)

        }
      })

    },
    updated(){
        if(this.wechat_marketing_store.last_response.code !== 10000 && this.wechat_marketing_store.last_response.code !== -1){
            if (!isEmpty(this.wechat_marketing_store.token) && !isEmpty(this.wechat_marketing_store.userinfo)) {
                if (this.$route.path === '/wechat_marketing_backend') {
                  this.$router.push('/wechat_marketing_backend/w_m_b_site_ctrl')
                }
            }
        }
    },
    beforeDestroy(){

    },
    methods: {
      ...mapActions([
        'updateWechat_marketing_store',
      ]),
      check_access(){
        this.$http.post(this.wechat_marketing_store.apihost+'/accessCtrl',{},this.$http_config)
          .then((res) => {

          })
      }

    },

  }
</script>
<style>

    .code_matrix_container {
        display: flex;
        flex-wrap: wrap;
        width: 238px;
        margin-top: 10px;
    }

    .code_matrix_item {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 25px;
        height: 25px;
        border: 1px solid #aaa;
        margin-right: -1px;
        margin-bottom: -1px;
    }

    .code_matrix_item:nth-child(3n) {
        margin-right: 0;
    }

    .code_matrix_item:nth-child(27n) {
        margin-bottom: 0;
    }

    .code_matrix_item-move {
        transition: transform 1s;
    }

    #loding_log_show p {
        width: 50%;
        text-align: right;
    }

    .fade-show-enter-active {
        transition: all 1s;
        opacity: 1;

    }

    .fade-show-enter {
        transition: all 1s;

        opacity: 0;

    }

    .fade-show-leave {
        transition: all 1s;

        opacity: 1;
    }

    .fade-show-leave-active {
        transition: all 1s;

        opacity: 0;

    }

    .el-menu li:hover {
        background-color: #9e9e9e !important;
    }

    .el-tabs__item.is-active {
        background-color: #848484 !important;
    }

    #navmenu li.el-menu-item {
        font-size: 16px !important;
    }
</style>
