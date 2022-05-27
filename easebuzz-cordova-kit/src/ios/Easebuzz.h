#import <Cordova/CDV.h>
#import <Easebuzz/Easebuzz.h>

@interface Easebuzz : CDVPlugin

@property NSString *callbackId;

- (void)paywitheasebuzz:(CDVInvokedUrlCommand *)command;

@end
