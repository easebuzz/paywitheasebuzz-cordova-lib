// Empty constructor
function PayWithEasebuzz() {}

// The function that passes work along to native shells
// Message is a string, duration may be 'long' or 'short'

PayWithEasebuzz.prototype.EasebuzzPay = function(options, successCallback, errorCallback) {

	try {
  		  cordova.exec(successCallback, successCallback, 'PayWithEasebuzz', 'paywitheasebuzz', [
          JSON.stringify(options)
        ]);
  		}catch(error) {
			  console.error(error);
			}
}

// Installation constructor that binds ToastyPlugin to window
PayWithEasebuzz.install = function() {
	try {
	  if (!window.plugins) {
	    window.plugins = {};
	  }
	  window.plugins.PayWithEasebuzz = new PayWithEasebuzz();
	  return window.plugins.PayWithEasebuzz;
  }catch(error) {
			  console.error(error);
			  // expected output: ReferenceError: nonExistentFunction is not defined
			  // Note - error messages will vary depending on browser
			}
};
cordova.addConstructor(PayWithEasebuzz.install);