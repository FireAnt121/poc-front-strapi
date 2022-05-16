'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('docs')
      .service('myService')
      .getWelcomeMessage();
  },
};
