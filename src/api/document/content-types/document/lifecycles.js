module.exports = {
    beforeCreate: async (event) => {

        // console.log(event);
        // console.log(event.model.attributes.Order);
        const { data, where, populate } = event.params;
        // console.log(data.calendar);
          // const entry = await strapi.db.query('api::version.version').findOne({
          //   select: ['id','version'],
          //   orderBy: { createdAt: 'DESC' }
          // });
          // console.log(entry)
          const entry = await strapi.db.query('api::document.document').findOne({
            select: ['Order'],
            orderBy: { Order: 'DESC' }
          });
          //           console.log(entry)
          // const [entries, count] = await strapi.db.query('api::document.document').findWithCount({
          //   select: ['title'],
          //   // where: { version: entry.Version},
          //   // populate: { version: true }
          // });
        event.params.data.Order = entry.Order + 1;
        // event.params.data.version = entry.id;
      },
      afterCreate: async (event) => {

        if(event.params.data.version === null || event.params.data.version === undefined) {
          const { data, where, populate } = event.params;
            const entry = await strapi.db.query('api::version.version').findOne({
              select: ['id','version'],
              orderBy: { createdAt: 'DESC' }
            });
            console.log(entry.id);
            const e = await strapi.db.query('api::document.document').update({
              where: { id: event.result.id },
              data: {
                version: entry.id,
              },
            });
        }
        // console.log(data.calendar);
      },
        // beforeCreate(data) {
        //     alert("Dasda");
        //     console.log("beforeCreate");
        // console.log("event",data);
        // //   event.params.data.price = event.params.data.price * 0.8;
        // },
    
        // afterCreate(result) {
        //     alert("Dsad");
        //     console.log("afterCreate");
        // // do something to the result;
        // },

        // afterUpdate(event) {
        //     console.log(event);
        //     console.log("afterUpdate");

        // },

        // afterUpdate: async (event) => {
        //   console.log("ds");

        //   const [entries, count] = await strapi.db.query('api::document.document').findWithCount({
        //     select: ['title'],
        //     where: { version: event.params.data.version },
        //     populate: { version: true }
        //   });
        //   console.log(count);
        //   event.params.data.Order = count + 1;
        //   console.log(event.params.data.Order);

        //   // const e= await strapi.entityService.update('api::document.document', event.result.id , {
        //   //   data: {
        //   //     Order: count + 1,
        //   //   },
        //   // });
        //   // const entry = await strapi.db.query('api::document.document').update({
        //   //   where: { id: event.result.id },
        //   //   data: {
        //   //     Order: count + 1,
        //   //   },
        //   // });
        // }
  };


