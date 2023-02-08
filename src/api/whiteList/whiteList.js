import request from "@/api/origin/request";



//获取名单批次列表 
export const getBatchListAPI = (data) => {
    return request({
        url: '/lib/v3/lrs/rosterBatchList',//接口地址
        method: 'POST',//请求方法
        data//请求接口需要的参数
    })
}

// 添加用户到白名单
export const addBatchListAPI = (data) => {
    return request({
        url: '/lib/v3/lrs/rosterEnter',//接口地址
        method: 'POST',//请求方法
        data//请求接口需要的参数
    })
}



// 删除名单里面的用户
export const deleteBatchListAPI = (data) => {
    return request({
        url: '/lib/v3/lrs/rosterDel',//接口地址
        method: 'POST',//请求方法
        data//请求接口需要的参数
    })
}


