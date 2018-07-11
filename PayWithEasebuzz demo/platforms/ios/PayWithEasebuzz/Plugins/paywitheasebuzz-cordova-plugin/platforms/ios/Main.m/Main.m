#import "Main.h"
#import <Easebuzz/Easebuzz.h>
#import <UIKit/UIKit.h>

@interface Main () <PayWithEasebuzzCallback> {
     Payment *payment;
}
    
    @end

@implementation Main

- (void)paywitheasebuzz:(CDVInvokedUrlCommand *)command {
    NSDictionary *options = [NSJSONSerialization
                             JSONObjectWithData:[[[command arguments] objectAtIndex:0]
                                                 dataUsingEncoding:NSUTF8StringEncoding]
                             options:0
                             error:nil];
    
    [self initiatePaymentAction:options];
    NSLog(@"call native code Main.m");
    self.callbackId = [command callbackId];
}
    
- (void)initiatePaymentAction:(NSDictionary*)options {
    NSDictionary *orderDetails =
    @{ @"txnid": [NSString stringWithFormat:@"%@",[options valueForKey:@"txnid"]],
       @"amount":[NSString stringWithFormat:@"%@",[options valueForKey:@"amount"]],
       @"productinfo": [NSString stringWithFormat:@"%@",[options valueForKey:@"productinfo"]],
       @"firstname": [NSString stringWithFormat:@"%@",[options valueForKey:@"firstname"]],
       @"email": [NSString stringWithFormat:@"%@",[options valueForKey:@"email"]],
       @"phone": [NSString stringWithFormat:@"%@",[options valueForKey:@"phone"]],
       @"key": [NSString stringWithFormat:@"%@",[options valueForKey:@"key"]],
       @"udf1": [NSString stringWithFormat:@"%@",[options valueForKey:@"udf1"]],
       @"udf2": [NSString stringWithFormat:@"%@",[options valueForKey:@"udf2"]],
       @"udf3": [NSString stringWithFormat:@"%@",[options valueForKey:@"udf3"]],
       @"udf4": [NSString stringWithFormat:@"%@",[options valueForKey:@"udf4"]],
       @"udf5": [NSString stringWithFormat:@"%@",[options valueForKey:@"udf5"]],
       @"address1": [NSString stringWithFormat:@"%@",[options valueForKey:@"address1"]],
       @"address2": [NSString stringWithFormat:@"%@",[options valueForKey:@"address2"]],
       @"city": [NSString stringWithFormat:@"%@",[options valueForKey:@"city"]],
       @"state": [NSString stringWithFormat:@"%@",[options valueForKey:@"state"]],
       @"country": [NSString stringWithFormat:@"%@",[options valueForKey:@"country"]],
       @"zipcode": [NSString stringWithFormat:@"%@",[options valueForKey:@"zipcode"]],
       @"isMobile": [NSString stringWithFormat:@"%@",[options valueForKey:@"isMobile"]],
       @"unique_id":  [NSString stringWithFormat:@"%@",[options valueForKey:@"unique_id"]],
       @"salt": [NSString stringWithFormat:@"%@",[options valueForKey:@"salt"]],
       @"pay_mode":[NSString stringWithFormat:@"%@",[options valueForKey:@"pay_mode"]]
       };
    
    payment = [[Payment alloc]initWithCustomerData:orderDetails];
    
    BOOL paymentValid = payment.isValid;
    if (!paymentValid) {
        NSLog(@"Invalid Pr  int");
    }else{
        [PayWithEasebuzz setUpWithPebCallback:self];
        [PayWithEasebuzz invokePaymentOptionsViewWithPaymentObj:payment isFrom:self];
    }
}
     
- (void)PEBCallbackWithData:(NSDictionary<NSString *,id> * _Nonnull)data {
    
    NSDictionary *responseDict = [data valueForKey:@"payment_response"];
    NSString *resultStr = [data valueForKey:@"result"];
    
    NSLog(@"PEBCallbackWithData = %@",responseDict);
    CDVPluginResult *result =
    [CDVPluginResult resultWithStatus:CDVCommandStatus_OK
                  messageAsDictionary:[NSDictionary dictionaryWithObjectsAndKeys:
                                       responseDict,
                                       @"payment_response",resultStr, @"result", nil]];
    [self.commandDelegate sendPluginResult:result callbackId:self.callbackId];
}
    
    @end
