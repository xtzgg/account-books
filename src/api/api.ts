import { request } from './axios'

/**
 * @description -封装User类型的接口方法
 */
export const BookStatus = new Map<number, string>();
BookStatus.set(1, '未结清');
BookStatus.set(2, '已结清');

export const EnableStatus = new Map<number, string>();
EnableStatus.set(0, '禁用');
EnableStatus.set(1, '启用');

/** 编辑新增通用 */
export interface AccountEditKey {
    id?: number | null,
    userId?: number,
    role?: string,
    op: string
}
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
    totalAmount: string | number,
    payAmount: string | number,
    status: number | null,
    createDate: string,
    bookType: number | null,
    bookTypeDesc: string,
    details: Vegetables[]
}
interface Vegetables {
    name: string,
    weight: number | string,
    amount: number | string
}

interface PageParams {
    pageNum: number,
    pageSize: number,
    username: string,
    mobile: string,
    status?: number,
    createDate?: string
}
export class AccoutListService {       // 账单接口
    // 账单查询
    static async list(params: PageParams) {
        return request('/api/accountbooks/accountbook/list', params, 'post')
    }
    // 账单新增
    static async add(params: object) {
        return request('/api/accountbooks/accountbook/add', params, 'post')
    }
    // 账单修改
    static async edit(params: object) {
        return request('/api/accountbooks/accountbook/edit', params, 'post')
    }
    // 账单删除
    static async delete(params: object) {
        return request('/api/accountbooks/accountbook/delete', params, 'get')
    }
    // 账单详情
    static async detail(params: object) {
        return request('/api/accountbooks/accountbook/detail', params, 'get')
    }
}

export const accountUserStatusColumns = [
    { text: '启用', value: 1 },
    { text: '禁用', value: 0 }
];
export interface AccountUser {
    userId: number | null,
    username: string,
    mobile: string,
    area: string,
    areaCode: string,
    areaDetail: string,
    status: number | null,
    type: number | null,
    createDate: string
}

export class AccountUserService {     // 账单用户接口
    // 用户登录
    static async login(params: object) {   // 接口三
        return request('/login', params, 'post')
    }
    // 用户查询
    static async list(params: object) {
        return request('/api/accountbooks/accountuser/list', params, 'post')
    }
    // 用户新增
    static async add(params: object) {
        return request('/api/accountbooks/accountuser/add', params, 'post')
    }
    // 用户修改
    static async edit(params: object) {
        return request('/api/accountbooks/accountuser/edit', params, 'post')
    }
    // 用户删除
    static async delete(params: object) {
        return request('/api/accountbooks/accountuser/delete', params, 'get')
    }
    // 用户详情
    static async detail(params: object) {
        return request('/api/accountbooks/accountuser/detail', params, 'get')
    }

}

export interface User {
    userId: number,
    username: string,
    mobile: string,
    nickname: string,
    imageUrl: string,
    createDate: string
}

export class UserService {     // 管理用户接口
    // 用户登录
    static async login(params: object) {
        return request('/api/accountbooks/user/login', params, 'post')
    }

    // 用户详情
    static async detail(params: object) {
        // return request('/api/accountbooks/user/detail', params, 'post')
        return request('/api/accountbooks/accountuser/detail', params, 'post');
    }

    // 用户编辑
    static async edit(params: object) {
        // return request('/api/accountbooks/user/edit', params, 'post');
        return request('/api/accountbooks/accountuser/edit', params, 'post');
    }
    // 头像上传
    // 用户登录
    static async upload(params: object) {
        // return request('/api/accountbooks/user/edit', params, 'post');
        return request('/api/accountbooks/accountuser/upload', params, 'post');
    }
}


export class MemberService {     // 管理会员接口
    // 用户名密码登录
    static async login(params: object) {
        return request('/api/accountbooks/login', params, 'form')
    }

    // 短信验证码登录
    static async loginsms(params: object) {
        return request('/api/accountbooks/login/sms', params, 'form')
    }

    // 获取短信验证码
    static async getSmsCode(params: object) {
        return request('/api/accountbooks/member/getVerifyCode', params, 'post')
    }

    // 图片验证码登录
    static async loginImageCode(params: object) {
        return request('/api/accountbooks/login/image/code', params, 'form')
    }

    // 获取图片验证码
    static async getImageCode(params: object) {
        return request('/api/accountbooks/member/getImageCode', params, 'post')
    }

    // 用户名密码登录
    static async logout(params: object) {
        return request('/api/accountbooks/member/logout', params, 'post')
    }
}