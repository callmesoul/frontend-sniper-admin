let config={
  "service":function () {
    if (process.env.NODE_ENV === 'development') {//测试域名
      return "http://127.0.0.1:7001";
    } else {//正式域名
       return "https://frontend-sniper.callmesoul.cn";
    }
  },
  "tokenName": "token"
};

export default config;
