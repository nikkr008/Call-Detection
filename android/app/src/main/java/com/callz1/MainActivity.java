package com.callz1;

import com.callz1.AccessibilityServiceManager;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */

  private AccessibilityServiceManager accessibilityServiceManager;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    accessibilityServiceManager = new AccessibilityServiceManager(this);
    if (!accessibilityServiceManager.hasAccessibilityServicePermission(WhatsappAccessibilityService.class)) {
      accessibilityServiceManager.requestUserForAccessibilityService(this);
    }
  }
  
  @Override
  protected String getMainComponentName() {
    return "CallZ1";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled());
  }
}
