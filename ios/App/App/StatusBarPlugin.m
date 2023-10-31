//
//  StatusBarPlugin.m
//  App
//
//  Created by Kyoung-Min Roh on 10/2/23.
//

#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

CAP_PLUGIN(StatusBarPlugin, "MyStatusBar",
           CAP_PLUGIN_METHOD(getHeight, CAPPluginReturnPromise);
);

