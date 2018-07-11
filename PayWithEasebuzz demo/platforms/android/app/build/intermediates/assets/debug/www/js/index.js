/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.getElementById("startPayment").addEventListener("click", this.proceedToPayment);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },


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




        window.plugins.PayWithEasebuzz.EasebuzzPay(params, function(payment_response) {
           alert(payment_response.result+''+JSON.stringify(payment_response.response));
        }, function(err) {
           console.log('*************ERROR**************');
           alert(err);
        });
        
    }


};

app.initialize();