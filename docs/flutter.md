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

3. Dio请求报错
```shell
dio Error: FormatException: Unexpected character (at offset 0)Error: FormatException: Unexpected character (at offset 0)
```
A: 接口返回数据不是json格式，但是通过postman看到的都是正常的，可以在post时的options参数里设置为Options(responseType: ResponseType.plain)查看返回结果

4. SmartDialog三方库问题, 不要设置SmartToastType.last, 多个请求报错会导致toast无法消失
更换三方库： flutter_easyloading
```dart
displayType:SmartToastType.last
```

5. `RotatedBox`用于旋转组件
6. 嵌套滑动页面组件`extended_tabs`
7. `animated_text_kit`打印机效果，水波等动效
8. `yield`异步生成器
   

   
9.  



### 开源项目
|  项目   | 介绍  | 演示 |
|  ----  | ----  | ----  |
| [loading_indicator](https://github.com/TinoGuo/loading_indicator)  | - | <img src="https://raw.githubusercontent.com/TinoGuo/loading_indicator/master/gif/demo_2021_07_18_02.gif" width=200 height=200/> |
| [flutter_easyloading](https://github.com/nslogx/flutter_easyloading)  | - | <img src="https://raw.githubusercontent.com/nslogx/flutter_easyloading/master/images/gif01.gif" width=200 height=429/> <img src="https://raw.githubusercontent.com/nslogx/flutter_easyloading/master/images/gif02.gif" width=200 height=429/> <img src="https://raw.githubusercontent.com/nslogx/flutter_easyloading/master/images/gif03.gif" width=200 height=429/> <img src="https://raw.githubusercontent.com/nslogx/flutter_easyloading/master/images/gif04.gif" width=200 height=429/> |
| [smart_select](https://github.com/davigmacode/flutter_smart_select)  | - |  <image alt="Single Choice Modal" src="https://raw.githubusercontent.com/davigmacode/flutter_smart_select/master/demo/screens/single-modal.gif" width=200 height=429/><image alt="Multiple Choice Modal" src="https://raw.githubusercontent.com/davigmacode/flutter_smart_select/master/demo/screens/multiple-modal.gif" width=200 height=429/>      <image alt="Single Choice Chips" src="https://raw.githubusercontent.com/davigmacode/flutter_smart_select/master/demo/screens/single-chips.gif" width=200 height=429/><image alt="Multiple Choice Chips" src="https://raw.githubusercontent.com/davigmacode/flutter_smart_select/master/demo/screens/multiple-chips.gif" width=200 height=429/><image alt="Multiple Choice Switch" src="https://raw.githubusercontent.com/davigmacode/flutter_smart_select/master/demo/screens/multiple-switches.gif" width=200 height=429/><image alt="Customize Tile" src="https://raw.githubusercontent.com/davigmacode/flutter_smart_select/master/demo/screens/custom-tile.gif" width=200 height=429/><image alt="Modal Filter" src="https://raw.githubusercontent.com/davigmacode/flutter_smart_select/master/demo/screens/modal-filter.gif" width=200 height=429/><image alt="Modal Confirm" src="https://raw.githubusercontent.com/davigmacode/flutter_smart_select/master/demo/screens/modal-confirm.gif" width=200 height=429/><image alt="Modal Validation" src="https://raw.githubusercontent.com/davigmacode/flutter_smart_select/master/demo/screens/modal-validation.gif" width=200 height=429/><image alt="Modal Selector" src="https://raw.githubusercontent.com/davigmacode/flutter_smart_select/master/demo/screens/modal-selector.gif" width=200 height=429/><image alt="Modal Shape" src="https://raw.githubusercontent.com/davigmacode/flutter_smart_select/master/demo/screens/modal-shape.gif" width=200 height=429/><image alt="Choice Items" src="https://raw.githubusercontent.com/davigmacode/flutter_smart_select/master/demo/screens/choice-item.gif" width=200 height=429/><image alt="Choice Grouped" src="https://raw.githubusercontent.com/davigmacode/flutter_smart_select/master/demo/screens/choice-grouped.gif" width=200 height=429/><image alt="Choice Builder" src="https://raw.githubusercontent.com/davigmacode/flutter_smart_select/master/demo/screens/choice-builder.gif" width=200 height=429/><a href="https://raw.githubusercontent.com/davigmacode/flutter_smart_select/master/demo/build/SmartSelect.apk"><image alt="Demo App" src="https://raw.githubusercontent.com/davigmacode/flutter_smart_select/master/demo/build/qr-apk.png" width=100 height=100/></a> |
| 啊 | - | 啊 |

### 参考资源