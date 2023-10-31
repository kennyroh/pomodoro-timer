//
//  StatusBarPlugin.swift
//  App
//
//  Created by Kyoung-Min Roh on 10/2/23.
//

import Foundation
import Capacitor

@objc(StatusBarPlugin)
public class StatusBarPlugin: CAPPlugin {
    
    @objc func getHeight(_ call: CAPPluginCall){
        call.resolve([
            "height": 23
        ])
    }
}
