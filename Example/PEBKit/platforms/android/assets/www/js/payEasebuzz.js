var easebuzz = {
    easebuzzCheckout: function (params) {
        baseUrl = "https://paydev.easebuzz.in/";
        console.log("In calling " + baseUrl + "cordova/initiateLink");
        str = "key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10"
        var hashparam = str.split("|");
        var hashstr = "";
        for (i = 0; i < hashparam.length; i++) {
            hashstr += params[hashparam[i]] + "|";
        }
        hashstr += params["salt"] + "|" + params["key"]
        var shaObj = new jsSHA("SHA-512", "TEXT");
        shaObj.update(hashstr);
        var paymenthash = shaObj.getHash("HEX");
        
        var request = $.ajax({
            url: baseUrl + "cordova/initiateLink", 
            method: "POST",
            data: {
                amount: params.amount,
                email: params.email,
                phone: params.phone,
                firstname: params.firstname,
                surl: params.surl,
                furl: params.furl,
                txnid: params.txnid,
                productinfo: params.productinfo,
                key: params.key,
                hash: paymenthash, //"b08081d78fd353b45eca991016faf4eca1280ad4bf98c29fca134ffd2aa395b11e99c5116d13e328bb1272aae688f998e450bc8440e0157f4d66770aed7f37c9",
                udf1: params.udf1,
                udf2: params.udf2,
                udf3: params.udf3,
                udf4: params.udf4,
                udf5: params.udf5,
                is_coupon_enabled: 1,
                isMobile: 2,
            }
        });
        request.done(function (response) {
            var EBresponse = "NA"
            var nameInterval;
            console.log("response" + response);
            console.log(JSON.stringify(response, null, "    "));
            var windowUrl = "";
            if (response.status == 1) {
                inappEasebuzz = window.open(baseUrl + 'cordova/pay/' + response.data, '_blank', 'hidden=yes,clearsessioncache=yes,location=no,toolbar=no');
//                                inappEasebuzz = window.open('https://paydev.easebuzz.in/cordova/pay/' + response.data, '_blank','location=yes');
//                                inappEasebuzz = window.open('https://paydev.easebuzz.in/cordova/pay/' + response.data, '_blank','hidden=yes,clearsessioncache=yes,location=no,toolbar=no');
//                                inappEasebuzz = window.open('https://paydev.easebuzz.in/pay/' + response.data, '_blank','location=no,toolbar=no');
//                                inappEasebuzz = window.open('http://192.168.2.119/easepay-client/cordova-test.php', '_blank','location=no,toolbar=no');
                inappEasebuzz.addEventListener("loadstart", function () {
                    console.log("==========================Resetting Value=====================");
                    inappEasebuzz.hide();
                    inappEasebuzz.executeScript({code: "localStorage.setItem('easebuzzResponse', '')"});
                });
                inappEasebuzz.addEventListener("loadstop", function () {
                    inappEasebuzz.show();
                    inappEasebuzz.executeScript({code: "window.location.href"}, function (values) {
                        windowUrl = values[0]
                        EBresponse = "NA";
                        nameInterval = null;
                        if (windowUrl == baseUrl + "cordova/response_url") {
                            nameInterval = setInterval(function () {
                                console.log("==================IN Response==============================")
                                inappEasebuzz.executeScript({code: "localStorage.getItem('easebuzzResponse')"}, function (values) {
                                    console.log("==================Got Local Storage=========================")
                                    EBresponse = values[0];
                                    if (EBresponse != "NA") {
                                        var obj = JSON.parse(EBresponse);
                                        EBresponse = obj;
                                        console.log(EBresponse);
                                        if (obj.hasOwnProperty("flag")) {
                                            console.log("==================Got Response=========================")
                                            console.log("================== CLEAR =========================")
                                            inappEasebuzz.executeScript({code: "localStorage.setItem('easebuzzResponse', '')"});
                                            clearInterval(nameInterval);
                                            inappEasebuzz.close();
                                        }
                                    }
                                });
                            }, 1000);
                        }

                    });
                });
                inappEasebuzz.addEventListener('exit', function () {
                    app.showResponse();
                    if (EBresponse == "NA") {
                        document.getElementById('txnStatus').innerHTML = "Cancelled transaction";
                    }
                    

                    if (EBresponse.hasOwnProperty("flag")) {
                        if (EBresponse['flag'] == 0) {
                            if (EBresponse['status'] == "success") {
                                var str = "status|udf10|udf9|udf8|udf7|udf6|udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid"
                                var hashparam = str.split("|");
                                var hashstr = params["salt"]+"|";
                                for (i = 0; i < hashparam.length; i++) {
                                    hashstr += EBresponse[hashparam[i]] + "|";
                                }
                                hashstr += EBresponse["key"];
                                var shaObj = new jsSHA("SHA-512", "TEXT");
                                shaObj.update(hashstr);
                                var paymenthash = shaObj.getHash("HEX");
                                if(paymenthash==EBresponse['hash']){
                                    document.getElementById('txnStatus').innerHTML = "Successful transaction";
                                }else{
                                    document.getElementById('txnStatus').innerHTML = "Response hash mismatch";
                                }
                            } else {
                                document.getElementById('txnStatus').innerHTML = "Failed transaction";
                            }
                        } else {
                            document.getElementById('txnStatus').innerHTML = EBresponse['error_status'];
                        }
                    } else {
                        document.getElementById('txnStatus').innerHTML = "Cancelled/Error transaction";
                    }
                    document.getElementById('resDiv').innerHTML = JSON.stringify(EBresponse);
                });
            } else {
                app.hideLoading();
                console.log(response.data);
                console.log(response.error_desc);
                alert(response.data+" : "+response.error_desc)
            }
            console.log("It Opened");
        });

        request.fail(function (jqXHR, textStatus) {
            alert("Request failed: " + textStatus);
        });
    }
}