// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'تاینی اسپرت',
  siteUrl: "localhost",
  templates: {
    Product: '/product/:id',
  },
  // plugins: [
  //   {
  //     use: '@gridsome/plugin-sitemap',
  //     options: {
  //       cacheTime: 600000, // default
  //       // exclude: ['/exclude-me'],
  //       // config: {
  //       //   '/articles/*': {
  //       //     changefreq: 'weekly',
  //       //     priority: 0.5
  //       //   },
  //       //   '/about': {
  //       //     changefreq: 'monthly',
  //       //     priority: 0.7
  //       //   }
  //       // }
  //     }
  //   }
  // ]
}
