// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");
module.exports = function(api) {
  api.configureWebpack({
    plugins: [new VuetifyLoaderPlugin()]
  });

  // api.chainWebpack(config => {
  //   config.mode('development')
  // })

  const axios = require("axios");
  api.loadSource(async actions => {
    const productsCollection = actions.addCollection({ typeName: "Product" });
    const products = await axios(`http://localhost/laravel/api/products`);
    const data = products.data.data;
    for (const product of data) {
      productsCollection.addNode({
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
        categories: product.categories,
        created_at: product.created_at
      });
    }

    const CategoryCollection = actions.addCollection({ typeName: "Category" });
    const category_list = await axios(`http://localhost/laravel/api/category/list`);
    const cat_data = category_list.data;
    for (const category of cat_data) {
      CategoryCollection.addNode({
        id: category.id,
        name: category.name,
        slug: category.slug,
        parent_id: category.parent_id,
        menu_order: category.menu_order
      });
    }

  });

  api.createPages(async ({ graphql, createPage }) => {
    const { data } = await graphql(`
      {
        allCategory {
          edges {
            node {
              name,
              slug
            }
          }
        }
      }
    `);

    data.allCategory.edges.forEach(({ node }) => {
      createPage({
        path: `/product/category/${node.slug}`,
        component: "./src/templates/Category.vue",
        context: {
          cat: node.name
        }
      })
    })

  });
};
