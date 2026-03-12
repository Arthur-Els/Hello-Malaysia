module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy("public");

  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_layouts",
      output: "_site"
    },

    templateFormats: ["njk", "html", "md"]
  };
};