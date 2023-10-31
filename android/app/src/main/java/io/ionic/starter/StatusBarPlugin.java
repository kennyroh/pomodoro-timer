package io.ionic.starter;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "MyStatusBar")
public class StatusBarPlugin extends Plugin {

    @PluginMethod
    public void getHeight(PluginCall call) {
        final JSObject jsObject = new JSObject();
        jsObject.put("height", 12);
        call.resolve(jsObject);
    }
}
