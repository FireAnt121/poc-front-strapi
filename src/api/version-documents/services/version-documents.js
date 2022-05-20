'use strict';

/**
 * version-documents service.
 */

module.exports = {
  versionDocuments: async (version) => {
    try {
      console.log(version)
      const entries = await strapi.entityService.findOne('api::version.version', version, {
        fields: ['version'],
        populate: {
          documents: {
            sort: 'Order:asc',
            filters:{
              published_at: {
                  $ne : null,
              }
            },
            fields: ['title', 'parent_id', 'order']
          }
        }
      })

      // reducing the data to a simple array
      const documents = entries.documents;
      const rootNodes = [];
      const allChildren = [];
      const secondLevelChildren = [];
      documents.forEach(document => {
        if (document.Parent_ID === null) {
          rootNodes.push({...document, children: []})
        } else
          allChildren.push(document)
      })
      allChildren.forEach(child => {
        if (rootNodes.map(({id}) => id).includes(child.Parent_ID)) {
          let rootIndex = rootNodes.findIndex(d => {
            return d.id === child.Parent_ID;
          })
          rootNodes[rootIndex].children.push({...child, children: []});
        } else
          secondLevelChildren.push(child)
      })
      rootNodes.forEach(root => {
        root.children.forEach(first => {
          secondLevelChildren.forEach(second => {
            if (second.Parent_ID === first.id)
              first.children.push(second)
          })
        })
      })

      return rootNodes
    } catch (err) {
      return err;
    }
  }
}


