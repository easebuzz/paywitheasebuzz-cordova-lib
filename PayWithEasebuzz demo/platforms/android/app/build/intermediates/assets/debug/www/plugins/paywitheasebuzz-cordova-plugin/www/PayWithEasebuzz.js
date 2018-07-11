cordova.define("paywitheasebuzz-cordova-plugin.PayWithEasebuzz", function(require, exports, module) {
// Empty constructor
function PayWithEasebuzz() {}

// The function that passes work along to native shells
// Message is a string, duration may be 'long' or 'short'

PayWithEasebuzz.prototype.EasebuzzPay = function(options, successCallback, errorCallback) {
  		  cordova.exec(successCallback, errorCallback, 'PayWithEasebuzz', 'paywitheasebuzz', [
          JSON.stringify(options)
        ]);
}

// Installation constructor that binds ToastyPlugin to window
PayWithEasebuzz.install = function() {
  if (!window.plugins) {
    window.plugins = {};
  }
  window.plugins.PayWithEasebuzz = new PayWithEasebuzz();
  return window.plugins.PayWithEasebuzz;
};
cordova.addConstructor(PayWithEasebuzz.install);
});
