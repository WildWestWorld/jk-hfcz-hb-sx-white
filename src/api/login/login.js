import request from "@/api/origin/request";


//获取验证码的图（该图用于发送手机号）
export const getVerificationCodeImgAPI = (data) => {
    return request({
        url: '/computationalVerification.php',//接口地址
        method: 'GET',//请求方法
        data,//请求接口需要的参数
        // 用于解决后端传过来的图形乱码
        responseType: 'arraybuffer'
    })
}

// 发送手机验证码
export const sendPhoneVerificationCodeAPI = (data) => {
    return request({
        url: '/lib/v3/lrs/codeSend',//接口地址
        method: 'POST',//请求方法
        data//请求接口需要的参数
    })
}

// 工作人员登录
export const loginAPI = (data) => {
    return request({
        url: '/lib/v3/lrs/staffLogin',//接口地址
        method: 'POST',//请求方法
        data//请求接口需要的参数
    })
}

//自动登录
export const autoLoginAPI = (data) => {
    return request({
        url: '/lib/v3/lrs/staffAutoLogin',//接口地址
        method: 'POST',//请求方法
        data//请求接口需要的参数
    })
}




//微信登录
export const wxLoginAPI = (data) => {
    return request({
        url: '/lib/v3/lu/userWxLogin',//接口地址
        method: 'POST',//请求方法
        data//请求接口需要的参数
    })
}










