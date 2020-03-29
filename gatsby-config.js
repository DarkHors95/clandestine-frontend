/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  // Add common site data (not required by the theme, but recommended)
  siteMetadata: {
    title: "Clandestine",
    description: "",
    siteUrl: "https://github.com/DarkHors95/clandestine-frontend"
  },
  plugins: [
    {
      resolve: "gatsby-theme-musician",
      // More info about the theme options:
      options: {
        // These are default values that you can override
        // basePath: `/`,
        // content: `content`,
        // pwaName: null
      }
    }
  ]
};
