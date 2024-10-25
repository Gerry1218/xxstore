## Flutter

1. Apple芯片电脑，需安装Rosetta 2
```
sudo softwareupdate --install-rosetta --agree-to-license
```
*报错处理：*
```
Installing Rosetta 2 on this system is not supported.
```
***请进入mac系统的终端安装，不要用三方的终端***

- [Rosetta 2安装报错](https://machow2.com/rosetta-mac/)



### 问题
1. 编译报错
```shell
flutter build apk --release --dart-define-from-file=.env/prod.json

Font asset "MaterialIcons-Regular.otf" was tree-shaken, reducing it from 1645184 to 5180 bytes (99.7% reduction). Tree-shaking can be disabled by providing the --no-tree-shake-icons flag when building your app.
/Users/gerry/code/ronggao/shengyuapp/android/app/src/main/java/io/flutter/plugins/GeneratedPluginRegistrant.java:19: 错误: 程序包io.github.v7lin.y_kit不存在
      flutterEngine.getPlugins().add(new io.github.v7lin.alipay_kit.AlipayKitPlugin());
                                                                   ^
/Users/gerry/code/ronggao/shengyuapp/android/app/src/main/java/io/flutter/plugins/GeneratedPluginRegistrant.java:24: 错误: 程序包com.amap.fluttertion不存在
      flutterEngine.getPlugins().add(new com.amap.flutter.location.AMapFlutterLocationPlugin());
                                                                  ^
/Users/gerry/code/ronggao/shengyuapp/android/app/src/main/java/io/flutter/plugins/GeneratedPluginRegistrant.java:29: 错误: 程序包dev.fluttercommuplus.connectivity不存在
      flutterEngine.getPlugins().add(new dev.fluttercommunity.plus.connectivity.ConnectivityPlugin());
                                                                               ^
/Users/gerry/code/ronggao/shengyuapp/android/app/src/main/java/io/flutter/plugins/GeneratedPluginRegistrant.java:34: 错误: 程序包dev.fluttercommuplus.device_info不存在
      flutterEngine.getPlugins().add(new dev.fluttercommunity.plus.device_info.DeviceInfoPlusPlugin());
      ......

                                                                          ^
/Users/gerry/code/ronggao/shengyuapp/android/app/src/main/java/io/flutter/plugins/GeneratedPluginRegistrant.java:129: 错误: 程序包io.github.v7linat_kit不存在
      flutterEngine.getPlugins().add(new io.github.v7lin.wechat_kit.WechatKitPlugin());
                                                                   ^
23 个错误

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:compileReleaseJavaWithJavac'.
> Compilation failed; see the compiler error output for details.

* Try:
> Run with --stacktrace option to get the stack trace.
> Run with --info or --debug option to get more log output.
> Run with --scan to get full insights.

* Get more help at https://help.gradle.org

BUILD FAILED in 48s
Running Gradle task 'assembleRelease'...                           48.6s
Gradle task assembleRelease failed with exit code 1
```
A: pubspec.yaml文件添加了plugin, 删掉即可
```yaml
flutter:
  plugin:
    platforms:
      ios:
        default_package: in_app_purchase_storekit
```

2. Android14的机型安装后进首页闪退
   A: 由于新增权限<uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK" />，新增服务类型microphone|mediaPlayback， 都去掉就行，由于首页初始化了前台服务
   ```xml
   <uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK" />

   ......

   <service
            android:name="com.pravera.flutter_foreground_task.service.ForegroundService"
            android:foregroundServiceType="dataSync|remoteMessaging|microphone|mediaPlayback"
            android:exported="false" />
   ```



### 项目


### 参考资源