
/**
 * @description:路由配置
 * @author：xingwu.chen@partner.midea.com
 * @update:2017-08-08
 * @version
 */ 


const index = resolve => require(['../components/Home'], resolve);




 const routes = [
   {
     name: 'index',
     path: '/',
     component: index
   },
 ];


 export default routes;
