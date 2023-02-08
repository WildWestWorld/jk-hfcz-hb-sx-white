import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 用来存储数据
const state = {
    test: "123",
    item_code: 'ABC_2NJD9B',
    // userId: '',
}
// 响应组件中的事件
const actions = {

}
// 操作数据
const mutations = {
    // changeUserIdState (state, payload) {
    //     state.userId = payload;
    // }

}
// 用来将state数据进行加工
const getters = {

}
// 新建并暴露store
export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})
