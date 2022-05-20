module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/version-documents',
     handler: 'version-documents.findDocuments',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
