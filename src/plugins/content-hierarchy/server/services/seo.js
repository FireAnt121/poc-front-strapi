'use strict';

module.exports = ({ strapi }) => ({
  getContentTypes() {
    const contentTypes = strapi.contentTypes;
    const keys = Object.keys(contentTypes);
    let collectionTypes = [];
    let singleTypes = [];

    keys.forEach((name) => {
      if (name.includes('api::')) {
        const object = {
          uid: contentTypes[name].uid,
          kind: contentTypes[name].kind,
          globalId: contentTypes[name].globalId,
          attributes: contentTypes[name].attributes,
          data: contentTypes[name].data
        };
        contentTypes[name].kind === 'collectionType'
          ? collectionTypes.push(object)
          : singleTypes.push(object);
      }
    });

    return { collectionTypes, singleTypes } || null;
  },

  async getDocuments(version) {
    // const entries = await strapi.db.query('api::document.document').findMany({ select: ['title']});
    console.log("version" + version);
    try {
      const entries = await strapi.entityService.findMany('api::version.version', {
        fields: ['version'],
        filters: { 'version': version},
        populate: [ 'documents' ]
        // populate: [{
        //   'version',
        //   filters: {'id': 1 } }]
      })
      return { entries }
    } catch(e) {
      return e
    }
    // console.log(entries);
    // return entries || null;
  },

  async updateDocument(datas) {
    console.log(datas);
    try{
      const entry = await strapi.entityService.update('api::document.document', datas.id, {
        data: datas.body
      })
      console.log("entry", entry);
      return entry;
    }catch(e){
      return e;
    }
  }
});