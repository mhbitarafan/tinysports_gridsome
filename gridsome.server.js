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

    const axios = require('axios')
    api.loadSource( async actions => {
      const collection = actions.addCollection({typeName: 'Products'});   
      const products = await axios(`http://localhost/laravel/api/products`);
      const data = products.data.data;
      for(const product of data){
        collection.addNode({
          id: product.id,
          name: product.name,
          second_name: product.second_name,
          short_description: product.short_description,
          description: product.description,
          price: product.price,
          discount_price: product.discount_price,
          image: product.image,
          stock_status: product.stock_status,
          attributes: product.attributes,
          created_at: product.created_at
        })
      }
    });

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  });
};
