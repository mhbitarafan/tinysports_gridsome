// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
module.exports = function(api) {
  api.configureWebpack({
    plugins: [
      new VuetifyLoaderPlugin()
    ],
  })

  // api.loadSource(async addCollection => {
  //   //http://localhost/laravel/api/orders
  //   const { orders } = await addCollection({
  //     typeName: 'Orders'
  //   })
  //   orders.addNode({
  //     title: 'My first blog post',
  //     date: '2018-11-02',
  //     customField: 'My value'
  //   })
  // });

    const axios = require('axios')
    api.loadSource( async actions => {
      const collection = actions.addCollection({typeName: 'Order'});   
      const orders = await axios('http://localhost/laravel/api/orders');
      const data = orders.data.data;
      for(const order of data){
        collection.addNode({
          id: order.id,
          phone: order.phone
        })
      }
    });

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  });
};
