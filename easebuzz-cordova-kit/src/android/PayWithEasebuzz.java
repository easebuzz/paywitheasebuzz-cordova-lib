package com.cordova.easebuzz.plugin;
// The native Toast API
import android.widget.Toast;
// Cordova-required packages
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import com.easebuzz.payment.kit.PWECouponsActivity;
import android.widget.Toast;
import android.os.Bundle;
import android.content.Intent;
import android.app.Activity;
import datamodels.StaticDataModel;

public class PayWithEasebuzz extends CordovaPlugin {

 public CallbackContext cc;
 public String action;

 @Override
 public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
       this.cc = callbackContext;
       this.action = action; 
   
      if (this.action.equals("paywitheasebuzz")) {
         try{
             String opt = args.getString(0);
             JSONObject options = new JSONObject(opt);
             Intent intentProceed = new Intent(this.cordova.getActivity(), PWECouponsActivity.class);
                   intentProceed.putExtra("txnid",options.optString("txnid"));
                   Float amounts = Float.parseFloat(options.optString("amount"));
                   intentProceed.putExtra("amount",amounts);
                   intentProceed.putExtra("productinfo",options.optString("productinfo"));
                   intentProceed.putExtra("firstname",options.optString("firstname"));
                   intentProceed.putExtra("email",options.optString("email"));
                   intentProceed.putExtra("phone",options.optString("phone"));
                   intentProceed.putExtra("key",options.optString("key"));
                   intentProceed.putExtra("udf1",options.optString("udf1"));
                   intentProceed.putExtra("udf2",options.optString("udf2"));
                   intentProceed.putExtra("udf3",options.optString("udf3"));
                   intentProceed.putExtra("udf4",options.optString("udf4"));
                   intentProceed.putExtra("udf5",options.optString("udf5"));
                   intentProceed.putExtra("udf6",options.optString("udf6"));
                   intentProceed.putExtra("udf7",options.optString("udf7"));
                   intentProceed.putExtra("udf8",options.optString("udf8"));
                   intentProceed.putExtra("udf9",options.optString("udf9"));
                   intentProceed.putExtra("udf10",options.optString("udf10"));
                   intentProceed.putExtra("address1",options.optString("address1"));
                   intentProceed.putExtra("address2",options.optString("address2"));
                   intentProceed.putExtra("city",options.optString("city"));
                   intentProceed.putExtra("state",options.optString("state"));
                   intentProceed.putExtra("country",options.optString("country"));
                   intentProceed.putExtra("zipcode",options.optString("zipcode"));
                   intentProceed.putExtra("hash",options.optString("hash"));
                   intentProceed.putExtra("unique_id",options.optString("unique_id"));
                   intentProceed.putExtra("merchant_id","");
                   intentProceed.putExtra("pay_mode",options.optString("pay_mode"));
                   intentProceed.putExtra("sub_merchant_id",options.optString("sub_merchant_id"));
                   if(options.has("split_payments"))
                   {
                      intentProceed.putExtra("split_payments",options.optString("split_payments"));
                   }
                   
                   this.cordova.startActivityForResult((PayWithEasebuzz)this,intentProceed, StaticDataModel.PWE_REQUEST_CODE);
           } catch (Exception e){
             Toast.makeText(this.cordova.getActivity(), e.getMessage(), Toast.LENGTH_LONG).show();
           }
      }

          

     return true;
 }


  @Override
  public void onActivityResult(int requestCode, int resultCode, Intent intent) {
         if (this.action.equalsIgnoreCase("paywitheasebuzz")) {
                try{
                      String result = intent.getStringExtra("result");
                      String payment_response = intent.getStringExtra("payment_response");
                      JSONObject jResponse = new JSONObject();
                      JSONObject pay_resp_Obj = new JSONObject(); 
                      try{
                        pay_resp_Obj = new JSONObject(payment_response);
                      }catch(JSONException jse)
                      {
                        pay_resp_Obj.put("error_msg",payment_response);
                      }
                       
                       jResponse.put("result", result);
                       jResponse.put("response", pay_resp_Obj);
                      cc.success(jResponse);
                  }catch (Exception e)
                  {   
                       cc.error("Exception : = "+e.toString());
                  }
            }else
            {
                cc.error("Invalid Action is passed during initiate payment");
            }  
  }

  }