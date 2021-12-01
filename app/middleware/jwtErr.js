'use strict';
module.exports = options => {
  return async function jwrError(ctx, next) {
    const token = ctx.request.header.authorization;
    let decode;
    if (token != null && token) {
      try {
        decode = ctx.app.jwt.verify(token, options);
        console.log(decode, 'decodedecode');
        await next();
      } catch (error) {
        console.log('error', error);
        ctx.status = 200;
        ctx.body = {
          msg: 'token已过期，请重新登录',
          code: 401,
        };
        return;
      }
    } else {
      ctx.status = 200;
      ctx.body = {
        code: 401,
        msg: 'token不存在',
      };
      return;
    }
  };
};
