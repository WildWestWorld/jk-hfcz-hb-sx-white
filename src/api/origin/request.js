import axios from 'axios'

import router from '@/router/index'

const request = axios.create({
    baseURL: '',  // 注意！！ 这里是全局统一加上了 '/api' 前缀，也就是说所有接口都会加上'/api'前缀在，页面里面写接口的时候就不要加 '/api'了，否则会出现2个'/api'，类似 '/api/api/user'这样的报错，切记！！！
    timeout: 60000
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    //设置请求头前缀，我们获得的请求头，还没有前缀，所以要加上去
    // const tokenPrefix ='Bearer '
    // 设置请求头


    if (sessionStorage.getItem("token") && sessionStorage.getItem("token").length > 0) {
        config.headers['Authorization'] = sessionStorage.getItem("token");
        // console.log(sessionStorage.getItem("token"))

        config.headers['token'] = sessionStorage.getItem("token");  // 设置请求头
    }

    // if (store.state.user.token){
    //     config.headers['Authorization'] =tokenPrefix+store.state.user.token;
    // }
    // config.headers['token'] = user.token;  // 设置请求头
    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {

        //设置res默认为data
        let res = response;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }

        if (res.data.code == 10001) {
            router.replace({ path: "/login" })
        }

        // if (res.data.code == 10002) {
        //     router.replace({ path: "/middle" })
        // }

        // if (res.data.code == 10003) {
        //     router.replace({ path: "/register" })
        // }

        // if (res.data.code == 10005) {
        //     sessionStorage.setItem('isLogin', true);

        //     sessionStorage.setItem('isNotWhite', true);

        //     // setTimeout(() => {
        //     //     router.replace({ path: "/middle" })
        //     // }, 500)
        // }


        // if (res.data.code == 10006) {
        //     router.replace({ path: "/index" })
        // }


        return res.data;
    },
    error => {
        // if(!error.response){
        //     notify.error("请求错误，请联系后台管理员")
        // }
        //自定义的函数,就在下面，根据状态码 处理不同的错误
        //  handleErrorResponse(error.response)

        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
);
// const handleErrorResponse = (response)=>{

//     if(response.status ===406||response.status ===403){
//         store.dispatch('logout').then(()=>{
//             window.location.reload()
//         });
//     }
//     if (response.data instanceof Array){
//         response.data.forEach(item=>{
//             Notify.create({
//                 type:'negative',
//                 message:item.message,
//                 position:'top'
//             })
//         })
//     }else {
//         Notify.create({
//             type:'negative',
//             message:response.data.message,
//             position:'top'
//         })
//     }

// };

export default request