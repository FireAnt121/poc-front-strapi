module.exports = [
  {
    method: "POST",
    path: "/update-document",
    handler: "seo.updateDocuments",
    config: {
      policies: [
        {
          name: 'admin::hasPermissions',
          config: { actions: ['plugin::content-type-builder.read'] },
        },
      ],
    }
  },
  {
    method: "GET",
    path: "/custom-content-types",
    handler: "seo.findContentTypes",
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: "GET",
    path: "/get-document-entries",
    handler: "seo.findDocuments",
    config: {
      auth: false,
      policies: [],
    },
  },

];
