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
  public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) {
        this.cc = callbackContext;
        this.action = action; 
          
     if (this.action.equals("paywitheasebuzz")) {
          try{
              String opt = args.getString(0);
              JSONObject options = new JSONObject(opt);
              Intent intentProceed = new Intent(this.cordova.getActivity(), PWECouponsActivity.class);
                    intentProceed.putExtra("trxn_id",options.getString("txnid"));
                    Float amounts = Float.parseFloat(options.getString("amount"));
                    intentProceed.putExtra("trxn_amount",amounts);
                    intentProceed.putExtra("trxn_prod_info",options.getString("productinfo"));
                    intentProceed.putExtra("trxn_firstname",options.getString("firstname"));
                    intentProceed.putExtra("trxn_email_id",options.getString("email"));
                    intentProceed.putExtra("trxn_phone",options.getString("phone"));
                    intentProceed.putExtra("trxn_s_url",options.getString("surl"));
                    intentProceed.putExtra("trxn_f_url",options.getString("furl"));
                    intentProceed.putExtra("trxn_key",options.getString("key"));
                    intentProceed.putExtra("trxn_udf1",options.getString("udf1"));
                    intentProceed.putExtra("trxn_udf2",options.getString("udf2"));
                    intentProceed.putExtra("trxn_udf3",options.getString("udf3"));
                    intentProceed.putExtra("trxn_udf4",options.getString("udf4"));
                    intentProceed.putExtra("trxn_udf5",options.getString("udf5"));
                    intentProceed.putExtra("trxn_udf6",options.getString("udf6"));
                    intentProceed.putExtra("trxn_udf7",options.getString("udf7"));
                    intentProceed.putExtra("trxn_udf8",options.getString("udf8"));
                    intentProceed.putExtra("trxn_udf9",options.getString("udf9"));
                    intentProceed.putExtra("trxn_udf10",options.getString("udf10"));
                    intentProceed.putExtra("trxn_address1",options.getString("address1"));
                    intentProceed.putExtra("trxn_address2",options.getString("address2"));
                    intentProceed.putExtra("trxn_city",options.getString("city"));
                    intentProceed.putExtra("trxn_state",options.getString("state"));
                    intentProceed.putExtra("trxn_country",options.getString("country"));
                    intentProceed.putExtra("trxn_zipcode",options.getString("zipcode"));
                    intentProceed.putExtra("trxn_is_coupon_enabled",options.getString("is_coupon_enabled"));
                    intentProceed.putExtra("trxn_salt",options.getString("salt"));
                    intentProceed.putExtra("unique_id",options.getString("unique_id"));
                    intentProceed.putExtra("merchant_id","");
                    intentProceed.putExtra("pay_mode",options.getString("pay_mode"));
                    intentProceed.putExtra("sub_merchant_id","");
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