import * as types from './mutation-types'

const actions = {
    // actions中的函数接受一个与store实例有相同属性和方法的context对像
    // 因此可以调用context中包含的state,getters以及mutations中定义的方法
    // userLogin(context){
    //   context.commit(types.LOGIN);
    // }
    // 使用es6的函数参数结构简化代码，可以直接将context.commit => commit使用
    // 在.vue文件中通过store.dispatch('userLogin') 即可触发状态改变了
    // 这里的data是因为提交mutations时需要获取从/api/login传回的user对象
    updateWebSite({commit}, data) {
        commit(types.WEBSITE, data);
    },
    updateSysInfo({commit}, data) {
        commit(types.SYSINFO, data);
    },
    updateAppRules({commit}, data) {
        commit(types.APPRULES, data);
    },
    updateEventFactory({commit}, data){
        commit(types.EVENTFACTORY, data);
    },
    updateAppShow({commit}, data){
        commit(types.APPSHOW, data);
    },
    updateWechat_marketing_store({commit}, data){
        commit(types.wechat_marketing_store, data);
    },
    updateSocket_server_store({commit}, data){
        commit(types.socket_server_store, data);
    },
    updateSocketInfo({commit}, data){
        commit(types.SOCKETINFO, data);
    },

}

export default actions
