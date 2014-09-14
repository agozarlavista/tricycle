package com.red_folder.phonegap.plugin.backgroundservice.sample;
import java.lang.Override;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;

import android.app.Activity;
import android.app.ActivityManager;
import android.app.ActivityManager.RunningTaskInfo;
import android.content.pm.PackageManager;
import android.content.pm.ApplicationInfo;
import android.view.View;
import android.view.Window;
import android.content.ComponentName;
import android.content.pm.PackageInfo;
import com.red_folder.phonegap.plugin.backgroundservice.BackgroundService;
import android.content.Intent;
import android.content.ContextWrapper;
import android.content.Context;
import android.net.Uri;

public class MyService extends BackgroundService {
	
	private final static String TAG = MyService.class.getSimpleName();
	
	private String mHelloTo = "World";
	public String getTopActivityStackName()
    {
        ActivityManager mActivityManager = (ActivityManager) getSystemService(Activity.ACTIVITY_SERVICE);
        PackageManager mPackageManager = getPackageManager();
        //Activity current_act = mActivityManager.getRunningTasks(1).get(0).topActivity();
        String packageName = mActivityManager.getRunningTasks(1).get(0).topActivity.getPackageName();
        ApplicationInfo mApplicationInfo;
        try 
        {
            mApplicationInfo = mPackageManager.getApplicationInfo( packageName, 0);
        } catch (PackageManager.NameNotFoundException e) {
            mApplicationInfo = null;
        }
       String appName = (String) (mApplicationInfo != null ? 
               mPackageManager.getApplicationLabel(mApplicationInfo) : "(unknown)");

        return appName;
    }

    protected void LaunchAPP() {
        Intent intent = new Intent("android.intent.category.LAUNCHER");
        intent.setClassName("com.tricycle.safems", "com.tricycle.safems.SafeMS");
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(intent);
    }

    protected void backsms() {
    	/*
        ActivityManager mActivityManager = (ActivityManager) getSystemService(Activity.ACTIVITY_SERVICE);
        PackageManager mPackageManager = getPackageManager();
        Activity acti = mActivityManager.getRunningTasks(1).get(0).topActivity();

        Intent intent = new Intent("android.intent.category.LAUNCHER");
        intent.setClassName(acti.getPackageName(), acti.getPackageName() + '.' + acti.getClassName());
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(intent);
        */
        Intent intent = new Intent("android.intent.action.VIEW");
 
                /** creates an sms uri */
                Uri data = Uri.parse("sms:");
 
                /** Setting sms uri to the intent */
                intent.setData(data);
 
                /** Initiates the SMS compose screen, because the activity contain ACTION_VIEW and sms uri */
                startActivity(intent);
    }

	@Override
	protected JSONObject doWork() {
		JSONObject result = new JSONObject();
		
		try {
			/*
			SimpleDateFormat df = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss"); 
			String now = df.format(new Date(System.currentTimeMillis()));
        	
        	ActivityManager mActivityManager = (ActivityManager) getSystemService(Activity.ACTIVITY_SERVICE);
			ComponentName pkgname = mActivityManager.getRunningTasks(1).get(0).topActivity.getPackageName();
			PackageManager pm = AppService.this.getPackageManager();
			PackageInfo pkginfo = pm.getPackageInfo(pkgname, 0);
			// View fenetre = current_act.getWindow().getDecorView();
			// String msg = "Hello " +  getTopActivityStackName() + " - its currently " + now;
            //ComposeMessageActivity plopeur = current_act.clone(); */
			String msg = getTopActivityStackName();
			result.put("Message", msg);

		} catch (JSONException e) {
		}

        return result;
    }

	@Override
	protected JSONObject getConfig() {
		JSONObject result = new JSONObject();
		
		try {
			result.put("HelloTo", this.mHelloTo);
		} catch (JSONException e) {
		}
		
		return result;
	}

	@Override
	protected void setConfig(JSONObject config) {
		try {
			if (config.has("HelloTo"))
				this.mHelloTo = config.getString("HelloTo");
			if (config.has("LaunchAPP"))
				this.LaunchAPP();
			if (config.has("backSMS"))
				this.backsms();
		} catch (JSONException e) {
		}
		
	}     

	@Override
	protected JSONObject initialiseLatestResult() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	protected void onTimerEnabled() {
		// TODO Auto-generated method stub
		
	}

	@Override
	protected void onTimerDisabled() {
		// TODO Auto-generated method stub
		
	}


}
