/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 * 
 */
let baseUrl = ''; 
let routerMode = 'hash';
let baseImgPath;
// let url = 'http://192.168.3.24:7300/poly-arrears-backend-for-frontends/process-schedule'

let processUrl = process.env.BASE_API

if (process.env.NODE_ENV == 'development') {
	baseUrl = 'http://api-gateway.cba0c8564f4854aee954cc244799b71ab.cn-shenzhen.alicontainer.com/poly-arrears-backend-for-frontends';
    baseImgPath = '/img/';
}else if(process.env.NODE_ENV == 'production'){
	baseUrl = 'https://gateway.shenzhentianding.com/poly-arrears-backend-for-frontends';
    // baseImgPath = '/img/';
}else if(process.env.NODE_ENV == 'testing'){
	baseUrl = 'http://api-gateway.cba0c8564f4854aee954cc244799b71ab.cn-shenzhen.alicontainer.com/poly-arrears-backend-for-frontends';
    // baseImgPath = '/img/';
}else if(process.env.NODE_ENV == 'uat'){
	baseUrl = 'http://api-gateway-uat.cba0c8564f4854aee954cc244799b71ab.cn-shenzhen.alicontainer.com/poly-arrears-backend-for-frontends';
    // baseImgPath = '/img/';
}else if(process.env.NODE_ENV == 'local'){
	baseUrl = 'http://api-gateway.cba0c8564f4854aee954cc244799b71ab.cn-shenzhen.alicontainer.com/poly-arrears-backend-for-frontends';
    // baseImgPath = '/img/';
}

export {
	url,
	baseUrl,
	routerMode,
	baseImgPath,
	processUrl
}