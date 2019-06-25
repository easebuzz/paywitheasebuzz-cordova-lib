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
    @{ @"txnid": [self isEmpty:[NSString stringWithFormat:@"%@",[options valueForKey:@"txnid"]]],
       @"amount":[self isEmpty:[NSString stringWithFormat:@"%@",[options valueForKey:@"amount"]]],
       @"productinfo": [self isEmpty:[NSString stringWithFormat:@"%@",[options valueForKey:@"productinfo"]]],
       @"firstname": [self isEmpty:[NSString stringWithFormat:@"%@",[options valueForKey:@"firstname"]]],
       @"email": [self isEmpty:[NSString stringWithFormat:@"%@",[options valueForKey:@"email"]]],
       @"phone": [self isEmpty:[NSString stringWithFormat:@"%@",[options valueForKey:@"phone"]]],
       @"key": [self isEmpty:[NSString stringWithFormat:@"%@",[options valueForKey:@"key"]]],
       @"udf1": [self isEmpty:[NSString stringWithFormat:@"%@",[options valueForKey:@"udf1"]]],
       @"udf2": [self isEmpty:[NSString stringWithFormat:@"%@",[options valueForKey:@"udf2"]]],
       @"udf3": [self isEmpty:[NSString stringWithFormat:@"%@",[options valueForKey:@"udf3"]]],
       @"udf4": [self isEmpty:[NSString stringWithFormat:@"%@",[options valueForKey:@"udf4"]]],
       @"udf5": [self isEmpty:[NSString stringWithFormat:@"%@",[options valueForKey:@"udf5"]]],
       @"address1": [self isEmpty:[NSString stringWithFormat:@"%@",[options valueForKey:@"address1"]]],
       @"address2": [self isEmpty:[NSString stringWithFormat:@"%@",[options valueForKey:@"address2"]]],
       @"city": [self isEmpty:[NSString stringWithFormat:@"%@",[options valueForKey:@"city"]]],
       @"state": [self isEmpty:[NSString stringWithFormat:@"%@",[options valueForKey:@"state"]]],
       @"country": [self isEmpty:[NSString stringWithFormat:@"%@",[options valueForKey:@"country"]]],
       @"zipcode": [self isEmpty:[NSString stringWithFormat:@"%@",[options valueForKey:@"zipcode"]]],
       @"isMobile": [self isEmpty:[NSString stringWithFormat:@"%@",[options valueForKey:@"isMobile"]]],
       @"unique_id":  [self isEmpty:[NSString stringWithFormat:@"%@",[options valueForKey:@"unique_id"]]],
       @"hash": [self isEmpty:[NSString stringWithFormat:@"%@",[options valueForKey:@"hash"]]],
       @"pay_mode":[self isEmpty:[NSString stringWithFormat:@"%@",[options valueForKey:@"pay_mode"]]]
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

-(NSString *)isEmpty:(NSString *)str
{
    if(str.length==0 || [str isKindOfClass:[NSNull class]] || [str isEqualToString:@""] || [str isEqualToString:@"(null)"]||str==nil || [str isEqualToString:@"<null>"]){
        return @"";
    }
    return str;
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
