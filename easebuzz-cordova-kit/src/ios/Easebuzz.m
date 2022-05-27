#import "Easebuzz.h"
#import <Easebuzz/Easebuzz.h>
#import <UIKit/UIKit.h>

@interface Easebuzz() <PayWithEasebuzzCallback> {
     Payment *payment;
}
    
    @end

@implementation Easebuzz

- (void)paywitheasebuzz:(CDVInvokedUrlCommand *)command {
    NSDictionary *options = [NSJSONSerialization
                             JSONObjectWithData:[[[command arguments] objectAtIndex:0]
                                                 dataUsingEncoding:NSUTF8StringEncoding]
                             options:0
                             error:nil];
    
    [self initiatePaymentAction:options];
    NSLog(@"call native code Easebuzz.m");
    self.callbackId = [command callbackId];
}
    
- (void)initiatePaymentAction:(NSDictionary*)options {
    payment = [[Payment alloc]initWithCustomerData:options];
    
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
                                       @"response",resultStr, @"result", nil]];
    [self.commandDelegate sendPluginResult:result callbackId:self.callbackId];
}
    
    @end
