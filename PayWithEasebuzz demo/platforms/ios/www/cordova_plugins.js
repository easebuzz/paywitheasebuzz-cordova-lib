cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "paywitheasebuzz-cordova-plugin.PayWithEasebuzz",
    "file": "plugins/paywitheasebuzz-cordova-plugin/www/PayWithEasebuzz.js",
    "pluginId": "paywitheasebuzz-cordova-plugin",
    "clobbers": [
      "window.plugins.PayWithEasebuzz"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "paywitheasebuzz-cordova-plugin": "0.0.1"
};
// BOTTOM OF METADATA
});