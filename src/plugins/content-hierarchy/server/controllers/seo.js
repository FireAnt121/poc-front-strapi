'use strict';

// module.exports = {
//   index(ctx) {
//     ctx.body = strapi
//       .plugin('content-hierarchy')
//       .service('myService')
//       .getWelcomeMessage();
//   },
// };
module.exports = {
  findContentTypes(ctx){
    ctx.body = strapi.plugin('content-hierarchy').service('seo').getContentTypes();
  },
  async findDocuments(ctx){
    const arr = ctx.originalUrl.split("?v=");
    ctx.body = await strapi.plugin('content-hierarchy').service('seo').getDocuments(arr[1]);
  },
  async updateDocuments(ctx) {
    console.log("url", ctx.request.body);
    const request = ctx.request.body;
    // const data = arr[1].split("&order=");
    ctx.body = await strapi.plugin('content-hierarchy').service('seo').updateDocument(request);
  },

  async updateManyDocuments(ctx){
    const request = ctx.request.body;
    ctx.body = await strapi.plugin('content-hierarchy').service('seo').updateManyDocuments(request);
  }
  // findDocuments(ctx) {
  //   // const entries = await strapi.db.query('api::document.document').findMany({ select: ['title']});
  //   const entries = strapi.entityService.findMany('api::document.document', {
  //     fields: ['title'],
  //   })
  //   ctx.body = entries;
  // }
  // index(ctx) {
  //   ctx.body = strapi
  //     .plugin('content-hierarchy')
  //     .service('seo')
  //     .findContentTypes(ctx){
  //       ctx.body = strapi.plugin('seo').service('seo').getContentTypes();
  //     };
  // },
};
