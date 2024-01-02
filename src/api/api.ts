import { request } from './axios'

/**
 * @description -封装User类型的接口方法
 */
export const BookStatus = new Map<number, string>();
BookStatus.set(1, '已结清');
BookStatus.set(2, '未结清');

export const EnableStatus = new Map<number, string>();
EnableStatus.set(0, '禁用');
EnableStatus.set(1, '启用');

export const BookTypeInCome = new Map<number, string>();
BookTypeInCome.set(1, '批发');
BookTypeInCome.set(2, '零售');


/** 编辑新增通用 */
export interface AccountEditKey {
    id?: number | null,
    incomeOrderId?:number | null,
    userManagerId?: number,
    role?: string,
    op: string
}
// 账单列表类型声明
export interface AccountBook {
    incomeOrderId: number | null,
    type: number | null,
    typeDesc: string,
    userId: number | null,
    username: string,
    mobile: string,
    totalMoney: string,
    status: number | null,
    paidMoney: string,
    unpaidMoney: string,
    day: string,
    remark: string,
    createDate: string,
    address: string,
    details: Vegetables[]
}
interface Vegetables {
    productTypeId: number | null,
    productTypeName: string,
    weight: number | string,
    money: number | string
}

interface PageParams {
    pageNum: number,
    pageSize: number,
    orderType: number | null,
    name: string,
    status?: number,
    startTime?: string,
    endTime?: string,
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
    userManagerId: number | null,
    name: string,
    phone: string,
    address: string,
    remark: string,
    enabled: number | null,
    type: number | null,
    createTime: string
}

export class UserManageService {     // 账单用户接口
    // 用户登录
    static async login(params: object) {   // 接口三
        return request('/login', params, 'post')
    }
    // 用户查询
    static async list(params: object) {
        return request('/api/accountbooks/userManage/page', params, 'post')
    }
     // 用户查询
     static async getListByType(params: object) {
        return request('/api/accountbooks/userManage/getListByType', params, 'post')
    }
    // 用户新增
    static async add(params: object) {
        return request('/api/accountbooks/userManage/add', params, 'post')
    }
    // 用户修改
    static async edit(params: object) {
        return request('/api/accountbooks/userManage/edit', params, 'post')
    }
    // 用户删除
    static async delete(params: object) {
        return request('/api/accountbooks/userManage/delete', params, 'get')
    }
    // 用户详情
    static async detail(params: object) {
        return request('/api/accountbooks/userManage/detail', params, 'post')
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

    static async detail(params: object) {
        return request('/api/accountbooks/member/detail', params, 'post');
    }

    // 头像上传
    static async upload(params: object) {
        return request('/api/accountbooks/member/upload', params, 'post');
    }

    // 用户编辑
    static async edit(params: object) {
        return request('/api/accountbooks/member/edit', params, 'post');
    }
}


export class IncomeOrderService {       // 收入账单接口
    // 账单查询
    static async list(params: PageParams) {
        return request('/api/accountbooks/incomeOrder/page', params, 'post')
    }
    // 账单新增
    static async add(params: object) {
        return request('/api/accountbooks/incomeOrder/add', params, 'post')
    }
    // 账单修改
    static async edit(params: object) {
        return request('/api/accountbooks/incomeOrder/update', params, 'post')
    }
    // 账单删除
    static async delete(params: object) {
        return request('/api/accountbooks/incomeOrder/delete', params, 'post')
    }
    // 账单详情
    static async detail(params: object) {
        return request('/api/accountbooks/incomeOrder/detail', params, 'post')
    }
}

export interface BookType {
    productTypeId: number | null,
    type: string,
    serialNum: number
}

export class BookTypeService {       // 商品条目
    // 商品查询
    static async list(params: object) {
        return request('/api/accountbooks/productType/list', params, 'post')
    }
    // 商品新增
    static async add(params: object) {
        return request('/api/accountbooks/productType/add', params, 'post')
    }
    // 商品修改
    static async edit(params: object) {
        return request('/api/accountbooks/productType/edit', params, 'post')
    }
    // 商品删除
    static async delete(params: object) {
        return request('/api/accountbooks/productType/remove', params, 'post')
    }
}