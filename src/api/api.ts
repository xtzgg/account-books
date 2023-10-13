import { request } from './axios'

/**
 * @description -封装User类型的接口方法
 */


// 账单列表类型声明
export interface AccountBook {
    id: number | null,
    userId: number | null,
    username: string,
    mobile: string,
    area: string,
    areaCode: string,
    areaDetail: string,
    remark: string,
    endDate: string,
    accountAmount: string,
    status: number | null,
    createDate: string | null
}
interface PageParams {
    pageNum: number,
    pageSize: number,
    username: string,
    remark: string,
    mobile: string
}
export class AccoutListService {       // 账单接口
    // 账单查询
    static async list(params: PageParams) {
        return request('/api/accountbooks/accountbook/list',params, 'post')
    }
    // 账单新增
    static async add(params: object) {
        return request('/api/accountbooks/accountbook/add',params, 'post')
    }
    // 账单修改
    static async edit(params: object) {
        return request('/api/accountbooks/accountbook/edit',params, 'post')
    }
    // 账单删除
    static async delete(params: object) {
        return request('/api/accountbooks/accountbook/delete',params, 'post')
    }
    // 账单详情
    static async detail(params: object) {
        return request('/api/accountbooks/accountbook/detail',params, 'get')
    }
}


export interface AccountUser {
    userId: number,
    username: string,
    mobile: string,
    area: string,
    areaCode: string,
    areaDetail: string,
    remark: string | null,
    status: string,
    createDate: string
}

export class AccountUserService {     // 账单用户接口
    // 用户登录
    static async login(params: object) {   // 接口三
        return request('/login',params, 'post')
    }
    // 用户查询
    static async list(params: PageParams) {
        return request('/api/accountbooks/accountuser/list',params, 'post')
    }
    // 用户新增
    static async add(params: object) {
        return request('/api/accountbooks/accountuser/add',params, 'post')
    }
    // 用户修改
    static async edit(params: object) {
        return request('/api/accountbooks/accountuser/edit',params, 'post')
    }
    // 用户删除
    static async delete(params: object) {
        return request('/api/accountbooks/accountuser/delete',params, 'post')
    }
    
}



export class UserService {     // 管理用户接口
    // 用户登录
    static async login(params: object) {
        return request('/api/accountbooks/user/login',params, 'post')
    }
}