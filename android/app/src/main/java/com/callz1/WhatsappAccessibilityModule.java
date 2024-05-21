package com.callz1;

import com.callz1.WhatsappAccessibilityService;
import android.content.Context;
import android.os.Build;
import android.view.accessibility.AccessibilityEvent;
import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import java.util.*;

public class WhatsappAccessibilityModule extends ReactContextBaseJavaModule {
    private static String inputText;
    private static String inputStatus;
    private final ReactApplicationContext reactContext;

    public WhatsappAccessibilityModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "WhatsappAccessibilityModule";
    }

    @ReactMethod
    public void ReceiveText(String text) {
       inputText=text.toString();
       System.out.println("text in module"+text);
    }
    @ReactMethod
    public void ReceiveStatus(String status) {
       inputStatus=status.toString();
       System.out.println("status in module "+inputStatus);
    }
    public static void setInputText(String text) {
        inputText = text;
    }

    public static void setStatus(String status) {
        inputStatus = status;
    }

    public static String getInputText() {
        return inputText;
    }
    public static String getStatus() {
        return inputStatus;
    }

    // Method to trigger auto-click action
    @ReactMethod
    public void triggerAutoClick() {
        WhatsappAccessibilityService service = new WhatsappAccessibilityService();
        AccessibilityEvent event = new AccessibilityEvent(AccessibilityEvent.TYPE_VIEW_CLICKED);
        service.onAccessibilityEvent(event);
    }
}
