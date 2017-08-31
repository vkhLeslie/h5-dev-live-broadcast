const apiType = $envType.type; // 0 pc; 1测试; 2生产(webpack)
// TODO 打包应用之前，如测试环境下，请记得修改devOnoff;
const devOnoff = 1; // 1: 测试环境 0: 验证环境
const testConfig = { // 测试环境
  //baseUrl: 'https://jiebaoyun.midea.com', // 公共接口的测试 baseUrl
  baseUrl: 'https://newimtest.midea.com/mas-api/restful/',
  identifier: 'com.midea.msd.IT5000Service', // 应用模块标识
};
const verifyConfig = { // 验证环境
  baseUrl: 'https://newimtest.midea.com/mas-api/restful/bizCar',
  identifier: 'com.midea.msd.IT5000Service' // 应用模块标识
};
const productConfig = {//生产环境
  baseUrl: 'https://mapnew.midea.com/mas-api/restful/bizCar',
  identifier: 'com.midea.msd.IT5000Service' // 应用模块标识
};
const config = function () {
  if(apiType === 0) { // 本地调试环境
      return devOnoff && testConfig || verifyConfig;
  } else if(apiType === 1) { // 测试环境
      return devOnoff && testConfig || verifyConfig;
  } else if(apiType === 2) { // 生产环境
    console.log($envType, productConfig);
      return productConfig;
  }
};
const isPc = apiType === 0 ? true : false;
const configUrl = config();
console.log(configUrl);
console.log(apiType);
const isTest = apiType !== 2 ? true : false;
module.exports = {
  configUrl,
  isPc,
  isTest
};
