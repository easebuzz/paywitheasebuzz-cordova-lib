# paywitheasebuzz-cordova-lib
paywitheasebuzz-cordova-lib

## Integration Steps

#### Dependencies
1. cordova plugin add cordova-plugin-inappbrowser

#### Steps to run example
1. Provide key and salt in index.js 
2. Remove android and install your preferred platform
3. Run the project

#### Steps to integrate
1. Meta tag Content-Security-Policy add "connect-src *;".
2. Add jquery-1.11.1.min.js,sha512.js,payEasebuzz.js from Library folder and import it before index.js.
3. call easebuzz.easebuzzCheckout(params) function to start a payment.
param Example:
```javascript
params = {
    "firstname": "John",
    "amount": "1",
    "email": "john@hgh.com",
    "phone": "9158520755",
    "productinfo": "test product",
    "udf1": "xyz",
    "udf2": "xyz",
    "udf3": "xyz",
    "udf4": "xyz",
    "udf5": "xyz",
    "udf6": "",
    "udf7": "",
    "udf8": "",
    "udf9": "",
    "udf10": "",
    "surl": "https://pay.easebuzz.in/",
    "furl": "https://pay.easebuzz.in/",
    "txnid": "123456789",
    "key": "XXXXXXXXX",
    "salt": "XXXXXXXXX",
}
``` 
