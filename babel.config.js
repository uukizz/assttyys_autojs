module.exports = {
  "presets": ["@babel/preset-env"],
  "plugins": [
    ["import", {
      "libraryName": "vant",
      "libraryDirectory": "es",
      "style": true
    }],
    ["@babel/plugin-transform-runtime"],
    ["@babel/plugin-transform-modules-commonjs"]
  ]
}