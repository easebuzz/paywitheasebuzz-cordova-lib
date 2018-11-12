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
            "unique_id":"CUSTOMER_UNIQUE_ID" //Pass empty string if you dont want to pass customer unique id.  
            }

                    // Please do not change the key names in the parameters.
        window.plugins.PayWithEasebuzz.EasebuzzPay(params, function(payment_response) {
                        var result = payment_response.result
                        var detail_response = payment_response.response
                        // Do your own code to handle the payment response based on result 
                        // and detail_response.
                        }, function(err) {
                            // Do your own code to handle error.
                        });
        }

``` 

##### For Typescript(Ionic) :

```javascript
        public proceedToPayment() {
            let params = {
                "firstname": "Customer Name",
                "amount": "1.0",
                "email": "customer@email.com",
                "phone": "1234567890",
                "productinfo": "Product Information",
                "udf1": "udf value 1",
                "udf2": "udf value 2",
                "udf3": "udf value 3",
                "udf4": "udf value 4",
                "udf5": "udf value 5",
                "udf6": "",
                "udf7": "",
                "udf8": "",
                "udf9": "",
                "udf10": "",
                "surl": "https://your.successurl.in/",
                "furl": "https://your.failureurl.in/",
                "txnid": "UNIQE_TRANSACTION_ID",
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
                "unique_id":"CUSTOMER_UNIQUE_ID" //Pass empty string if you dont want to pass customer unique id.
            }


        window['plugins'].PayWithEasebuzz.EasebuzzPay(params, function(payment_response) {
            var result = payment_response.result
            var detail_response = payment_response.response
            // Do your own code to handle the payment response based on result 
            // and detail_response.
        }, function(err) {
           // Do your own code to handle error.
        });
  }

``` 



#### Request parameters and Sample payment response/result :

Result : To decide payment transaction is successful or failed.

```javascript
    var result = payment_response.result
```

Value of the result can be :
<br />**“payment_successfull”** : result contains this value, if the payment transaction completed successfully.<br />
<br />**“txn_session_timeout“** :  result contains this value, if the payment transaction failed because of the <br />transaction time out.<br />
<br />**“user_cancelled”** : result contains this value, if the the user pressed the cancel button during the  payment process.<br />
<br />**“error_server_error”** : result contains this value, if the server side error occured during payment process.<br />
<br />**“bank_back_pressed”** :  result contains this value if user press the back button on bank page.<br />
<br />**“invalid_input_data”** :  result contains this value if payment request input parameters are not valid.<br />
<br />**“payment_failed”** :  result contains this value if payment fails from the bank side.<br />
<br />**“error_noretry”** : This result can be considered as failed payment.<br />
<br />**“retry_fail_error”** : This result can be considered as failed payment.<br />
<br />**“trxn_not_allowed”** : This result can be considered as failed payment.<br />


<br />To check request parameters click on below link.
    <br />https://docs.easebuzz.in/mobile-integration-android/handle-response
 
<br />To check sample payment response on below link.
    <br />https://docs.easebuzz.in/mobile-integration-android/request-response-desc
