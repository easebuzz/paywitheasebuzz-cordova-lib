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
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById("startPayment").addEventListener("click", this.proceedToPayment);
        document.getElementById("backPayment").addEventListener("click", this.showForm);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        //app.receivedEvent('deviceready');
    },
    //Easebuzz Functions
    showForm: function () {
        app.hideLoading();
        document.getElementById('output').style.display = 'none';           // Hide
        document.getElementById('paymentForm').style.display = 'block';          // Show
    },
    showResponse: function () {
        app.hideLoading();
        document.getElementById('output').style.display = 'block';           // Hide
        document.getElementById('paymentForm').style.display = 'none';          // Show
    },
    showLoading : function() {
        document.getElementById('startPayment').style.display = 'none';           // Hide
        document.getElementById('loading').style.display = 'block'; 
    },
    hideLoading : function(){
       document.getElementById('loading').style.display = 'none';           // Hide
        document.getElementById('startPayment').style.display = 'block';  
    },
    proceedToPayment: function () {
        app.showLoading();
        params = {
            "firstname": $("#firstname").val(),
            "amount": $("#amount").val(),
            "email": $("#email").val(),
            "phone": $("#phone").val(),
            "productinfo": $("#productinfo").val(),
            "udf1": $("#udf1").val(),
            "udf2": $("#udf2").val(),
            "udf3": $("#udf3").val(),
            "udf4": $("#udf4").val(),
            "udf5": $("#udf5").val(),
            "udf6": "",
            "udf7": "",
            "udf8": "",
            "udf9": "",
            "udf10": "",
            "surl": "https://pay.easebuzz.in/",
            "furl": "https://pay.easebuzz.in/",
            "txnid": Math.floor(Math.random()*(800000-100000+1)+100000),
            "key": "XXXXXXX",
            "salt": "XXXXXXX",
        }
        console.log(JSON.stringify(params));
        easebuzz.easebuzzCheckout(params);
    }
    
};

app.initialize();