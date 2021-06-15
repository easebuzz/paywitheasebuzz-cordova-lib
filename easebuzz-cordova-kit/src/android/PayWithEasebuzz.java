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
import datamodels.PWEStaticDataModel;
import java.util.Iterator;

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
             Iterator<?> keys = options.keys();
             while(keys.hasNext() ) {
                 String value = "";
                 String key = (String) keys.next();
                 value = options.optString(key);
                 intentProceed.putExtra(key,value);
             }
             this.cordova.startActivityForResult((PayWithEasebuzz)this,intentProceed, PWEStaticDataModel.PWE_REQUEST_CODE);
           } catch (Exception e){
             Toast.makeText(this.cordova.getActivity(), e.getMessage(), Toast.LENGTH_LONG).show();
           }
      }

          

     return true;
 }


  @Override
  public void onActivityResult(int requestCode, int resultCode, Intent intent) {
    if(intent != null ) {
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

  }