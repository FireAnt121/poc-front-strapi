'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('Avesha Docs')
      .service('myService')
      .getWelcomeMessage();
  },
};
