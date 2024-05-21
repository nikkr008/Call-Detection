package com.callz1;

import android.accessibilityservice.AccessibilityService;
import android.view.accessibility.AccessibilityEvent;
import android.accessibilityservice.AccessibilityServiceInfo;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.PowerManager;
import android.util.Log;
import android.view.accessibility.AccessibilityNodeInfo;
import com.facebook.react.bridge.ReactApplicationContext;
import androidx.core.view.accessibility.AccessibilityNodeInfoCompat;
import java.util.List;
import java.util.*;

public class WhatsappAccessibilityService extends AccessibilityService  {

    private static final String TAG = "WhatsappAccessibilityService";
    @Override
    public void onAccessibilityEvent(AccessibilityEvent event) {
        AccessibilityNodeInfoCompat source = AccessibilityNodeInfoCompat.wrap(event.getSource());
        if (source == null) {
            return;
        }
        String packageName = event.getPackageName().toString();
//        System.out.println(packageName);
        if (packageName.equals("com.whatsapp") || packageName.equals("com.whatsapp.w4b")) {
            //PackageManager packageManager = this.getPackageManager();
            PackageManager packageManager = getApplicationContext().getPackageManager();
//            System.out.println(packageManager);
            try {
                ApplicationInfo info = packageManager.getApplicationInfo(packageName, 0);
//                List<AccessibilityNodeInfoCompat> sendMessageNodeList = Collections.emptyList();
                List<AccessibilityNodeInfo> sendMessageNodeList = new ArrayList<>();
                String name = packageManager.getApplicationLabel(info).toString();
                try {
                    AccessibilityNodeInfoCompat rootNodeInfo = AccessibilityNodeInfoCompat.wrap(getRootInActiveWindow());
                    AccessibilityNodeInfo nodeInfo = event.getSource();
                    if (rootNodeInfo == null) {
                        return; // or handle the case appropriately
                    }
                    if (packageName.equals("com.whatsapp")) {
//                        sendMessageNodeList = nodeInfo.findAccessibilityNodeInfosByViewId("com.whatsapp:id/send");
                        sendMessageNodeList = nodeInfo.findAccessibilityNodeInfosByViewId("com.whatsapp:id/send");
                    } else if (packageName.equals("com.whatsapp.w4b")) {
//                        sendMessageNodeList = nodeInfo.findAccessibilityNodeInfosByViewId("com.whatsapp.w4b:id/send");
                        sendMessageNodeList = nodeInfo.findAccessibilityNodeInfosByViewId("com.whatsapp.w4b:id/send");
                    }
                    if (sendMessageNodeList == null || sendMessageNodeList.isEmpty()) {
                        return;
                    }

                    // CHANGED: use AccessibilityNodeInfoCompat instead of AccessibilityNodeInfo
                    for (AccessibilityNodeInfo node : sendMessageNodeList) {
                        String str1 = WhatsappAccessibilityModule.getInputText();
                        System.out.println("str1" + str1);
                        String str2 = WhatsappAccessibilityModule.getStatus();
                        System.out.println("str2" + str2);
                        String str3 = str1.concat(str2);
                        System.out.println("String" + str3);
                        if (str3.contains("automatic")) {
                            System.out.println("String new" + str3);
                            System.out.println("ACC onAccessibilityEvent send_button=" + node);
                            node.performAction(AccessibilityNodeInfo.ACTION_CLICK);
                            WhatsappAccessibilityModule.setInputText("");
                            WhatsappAccessibilityModule.setStatus("");
                        } else {
                            return;
                        }
                    }
                    try {
                        Thread.sleep(2000);
                        performGlobalAction(GLOBAL_ACTION_BACK);
                        //add below line, if u want to close whatsApp;
                        performGlobalAction(GLOBAL_ACTION_BACK);
                        Thread.sleep(2000);
                    } catch (Exception e) {
                        Log.d("onAccessibilityEvent", "onAccessibilityEvent: ", e);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
                Log.e(TAG, "onAccessibilityEvent: " + name);
            } catch (PackageManager.NameNotFoundException e) {
                e.printStackTrace();
            }
        }
    }
    @Override
    public void onInterrupt () {

    }
    @Override
    protected void onServiceConnected () {
        super.onServiceConnected();
        AccessibilityServiceInfo info = new AccessibilityServiceInfo();
        info.eventTypes =  AccessibilityEvent.TYPES_ALL_MASK;
        info.packageNames = new String[]{"com.whatsapp", "com.whatsapp.w4b"};
        info.feedbackType = AccessibilityServiceInfo.FEEDBACK_SPOKEN;
        this.setServiceInfo(info);
        Log.d(TAG, "Accessibility service connected");
    }
}