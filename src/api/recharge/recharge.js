import request from "@/api/origin/request";

// 获取道具列表
export const getPropListAPI = (data) => {
    return request({
        url: '/lib/v3/lp/userPropList',//接口地址
        method: 'POST',//请求方法
        data//请求接口需要的参数
    })
}

//兑换道具
export const exchangePropAPI = (data) => {
    return request({
        url: '/lib/v3/le/exChange',//接口地址
        method: 'POST',//请求方法
        data//请求接口需要的参数
    })
}

//充值
export const rechargeOrderAPI = (data) => {
    return request({
        url: '/lib/v3/lo/accnoSave',//接口地址
        method: 'POST',//请求方法
        data//请求接口需要的参数
    })
}