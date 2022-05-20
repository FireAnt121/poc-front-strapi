'use strict';

/**
 * A set of functions called "actions" for `version-documents`
 */

module.exports = {
  findDocuments: async (ctx, next) => {
    try {
      const arr = ctx.originalUrl.split("?v=");
      console.log(arr)
      return await strapi.service('api::version-documents.version-documents').versionDocuments(arr[1]);
    } catch (err) {
      ctx.body = err;
    }
  }
};
