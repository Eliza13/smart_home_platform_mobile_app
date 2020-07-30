package com.mobile_app;

import com.facebook.react.ReactActivity;

// added for splash screen
import org.devio.rn.splashscreen.SplashScreen;
import android.os.Bundle;

public class MainActivity extends ReactActivity {

    /* Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.*/

    // added for splash screen
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
    }

    @Override
    protected String getMainComponentName() {
        return "mobile_app";
    }
}
