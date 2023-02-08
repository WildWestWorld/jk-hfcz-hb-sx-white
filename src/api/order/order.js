import request from "@/api/origin/request";



//获取订单列表
export const getOrderListAPI = (data) => {
    return request({
        url: '/lib/v3/lrs/rosterEnterList',//接口地址
        method: 'POST',//请求方法
        data//请求接口需要的参数
    })
}

