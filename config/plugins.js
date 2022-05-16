module.exports = {
    // ...
    'wysiwyg': {
      enabled: true,
      resolve: './src/plugins/wysiwyg'
    },
    "content-versioning": {
      enabled:  true,
    },
    'content-hierarchy': {
      enabled: true,
      resolve: './src/plugins/content-hierarchy'
    },  
    'preview-button': {
        enabled: true,
        config: {
          contentTypes: [
            {
              uid: 'api::document.document',
              targetField: 'slug',
              draft: {
                    query: {
                      type: 'post',
                    },
                },
                published: {
                    basePath: 'documentation',
                    query: {
                      slug: 'about',
                    },
                },
            },
            // {
            //   uid: 'api::post.post',
            //   targetField: 'slug',
            // },
          ],
        },
      },
    // ...
  }
  