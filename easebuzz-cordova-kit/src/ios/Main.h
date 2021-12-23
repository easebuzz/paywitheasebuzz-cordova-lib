#import <Cordova/CDV.h>
#import <Easebuzz/Easebuzz.h>

@interface Main : CDVPlugin

@property NSString *callbackId;

- (void)paywitheasebuzz:(CDVInvokedUrlCommand *)command;

@end
