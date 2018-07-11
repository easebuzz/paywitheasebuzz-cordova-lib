# Cordova/Phonegap/Ionic plugin for PayWithEasebuzz Mobile SDK.


## Supported platforms

#### Dependencies
Android
<br />iOS

#### Usage:
1.Install the plugin
<br />2.Commands
<br />    cd your-project-folder
<br />    $ cordova platform add ios
<br />    $ cordova platform add android 
<br />    $ cordova plugin add /path/to/easebuzz-cordova-kit

#### Note :For iOS
    Note: This release is meant for Xcode 9.4 and above as it uses a framework compiled in Swift 4.1.This will not work in Xcode 9.2 as  you will get a "dlyd error : framework not found error".
    Note: The iOS framework is shipped with simulator architectures , you have to remove them before you archive.

<br />3. Add below meta tag
   ```javascript
      <meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *; img-src 'self' data: content:;">
    ```  
4. Add jquery-1.11.1.min.js and import it before index.js.

#### Integration code :

```javascript
proceedToPayment: function () {
        params = {
            "firstname": $("#firstname").val().trim(),
            "amount": $("#amount").val().trim(),
            "email": $("#email").val().trim(),
            "phone": $("#phone").val().trim(),
            "productinfo": $("#productinfo").val().trim(),
            "udf1": $("#udf1").val().trim(),
            "udf2": $("#udf2").val().trim(),
            "udf3": $("#udf3").val().trim(),
            "udf4": $("#udf4").val().trim(),
            "udf5": $("#udf5").val().trim(),
            "udf6": "",
            "udf7": "",
            "udf8": "",
            "udf9": "",
            "udf10": "",
            "surl": "https://your.successurl.in/",
            "furl": "https://your.failureurl.in/",
            "txnid": Math.floor(Math.random()*(800000-100000+1)+100000),
            "key": "YOUR_OWN_MERCHANT_KEY",
            "salt": "YOUR_OWN_MERCHANT_SALT",
            "address1": "address one",
            "address2": "address two",
            "city": "",
            "state": "",
            "country": "",
            "zipcode": "",
            "is_coupon_enabled": "0",
            "pay_mode": "production",
                }

                    // Please do not change the key names in the parameters.
        window.plugins.PayWithEasebuzz.EasebuzzPay(params, function(payment_response) {
                        var result = payment_response.result
                        var detail_response = payment_response.response
                        // Do your own code to handle the payment response based on result 
                        // and detail_response.
                        }, function(err) {
                            // Do your own code to handle response.
                        });
        }

``` 

#### Request parameters and Sample payment response/result :

Result : To decide payment transaction is successful or failed.

```javascript
    var result = payment_response.result
```

Value of the result can be :
“payment_successfull” : result contains this value, if the payment transaction completed successfully.
“txn_session_timeout “ :  result contains this value, if the payment transaction failed because of the transaction time out.
“user_cancelled” : result contains this value, if the the user pressed the cancel button during the  payment process.
“error_server_error” : result contains this value, if the server side error occured during payment process.
“bank_back_pressed” :  result contains this value if user press the back button on bank page.
“invalid_input_data” :  result contains this value if payment request input parameters are not valid.
“payment_failed” :  result contains this value if payment fails from the bank side.
“error_noretry” : This result can be considered as failed payment.
“retry_fail_error” : This result can be considered as failed payment.
“trxn_not_allowed” : This result can be considered as failed payment.


To check request parameters click on below link.
    https://docs.easebuzz.in/mobile-integration-android/handle-response
 
To check sample payment response on below link.
    https://docs.easebuzz.in/mobile-integration-android/request-response-desc
