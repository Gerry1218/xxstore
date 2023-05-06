## Android

- 新工程编译报错，如下
```
Can't determine type for tag '<macro name="m3_comp_assist_chip_container_shape">?attr/shapeAppearanceCornerSmall</macro>'
```
修改app/build.gradle的依赖版本
```
androidx.appcompat:appcompat:1.4.1
implementation 'com.google.android.material:material:1.6.0'
```

- 集成RN流程
    - 项目根目录build.gradle文件
    ```
    allprojects {
        repositories {
            ...
            maven {
                url "$rootDir/../node_modules/react-native/android"
            }
            maven {
                url("$rootDir/../node_modules/jsc-android/dist")
            }
            mavenCentral {
                // We don't want to fetch react-native from Maven Central as there are
                // older versions over there.
                content {
                    excludeGroup "com.facebook.react"
                }
            }
            ...
        }
    }
    ```
    - setting文件最后新增
    ```
    apply from: file("../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesSettingsGradle(settings)

    ```
    - app/build.gradle文件
    ```
    dependencies {
        ...
        implementation "com.facebook.react:react-native:0.63.5" // From node_modules
        implementation "org.webkit:android-jsc:+"
        ...
    }

    // 文件最后新增
    apply from: file("../../node_modules/@react-native-community/cli-platform-android/native_modules.gradle"); applyNativeModulesAppBuildGradle(project)

    ```

- Sync project报错
```
A problem occurred evaluating root project 'xxshop'.
> Build was configured to prefer settings repositories over project repositories but repository 'maven' was added by build file 'build.gradle'
```
setting文件中去掉如下配置
```
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
        jcenter() // Warning: this repository is going to shut down soon
    }
}
```

- 集成RN后，编译报错
```
FAILURE: Build completed with 8 failures.

1: Task failed with an exception.
-----------
* What went wrong:
Execution failed for task ':app:checkDebugAarMetadata'.
> Could not resolve all files for configuration ':app:debugRuntimeClasspath'.
   > Could not find androidx.appcompat:appcompat:1.4.1.
     Searched in the following locations:
       - file:/Users/gerry/study/xxstore/node_modules/react-native/android/androidx/appcompat/appcompat/1.4.1/appcompat-1.4.1.pom
       - file:/Users/gerry/study/xxstore/node_modules/jsc-android/dist/androidx/appcompat/appcompat/1.4.1/appcompat-1.4.1.pom
       - https://repo.maven.apache.org/maven2/androidx/appcompat/appcompat/1.4.1/appcompat-1.4.1.pom
     Required by:
         project :app
   > Could not find com.google.android.material:material:1.6.0.
     Searched in the following locations:
       - file:/Users/gerry/study/xxstore/node_modules/react-native/android/com/google/android/material/material/1.6.0/material-1.6.0.pom
       ...
```
项目根目录的`build.gradle`中添加 **google()** 
```
allprojects {
    repositories {
        ...
        google()
        ...
    }
}
```
- 运行项目报错
```
java.lang.RuntimeException: Unable to start activity ComponentInfo{com.wanris.xxshop/com.wanris.xxshop.MainActivity}: java.lang.IllegalStateException: You need to use a Theme.AppCompat theme (or descendant) with this activity
...
```
报错的Activity基类改下：AppCompatActivity -> Activity

- 添加Application类
新增MainApplication 继承自Application,在app项目中的AndroidManifest.xml中，新增`android:name=".MainApplication"`行
```
 <application
        android:name=".MainApplication"
        ...
</application>

```

- 运行调用rn页面
```
E/ReactNativeJNI: logMarker CREATE_REACT_CONTEXT_END
E/unknown:ReactNative: ReactInstanceManager.createReactContext: mJSIModulePackage null
E/unknown:DisabledDevSupportManager: Caught exception
    java.lang.RuntimeException: Unable to load script. Make sure you're either running a Metro server (run 'react-native start') or that your bundle 'index.android.bundle' is packaged correctly for release.
...
URL: http://localhost:8081/index.bundle?platform=android&dev=true&minify=false
        at com.facebook.react.devsupport.BundleDownloader$1.onFailure(BundleDownloader.java:129)
        at okhttp3.RealCall$AsyncCall.execute(RealCall.java:211)
        at okhttp3.internal.NamedRunnable.run(NamedRunnable.java:32)
        at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1167)
        at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:641)
        at java.lang.Thread.run(Thread.java:923)
     Caused by: java.net.UnknownServiceException: CLEARTEXT communication to localhost not permitted by network security policy
        at okhttp3.internal.connection.RealConnection.connect(RealConnection.java:148)
...
```
在AndroidManifest.xml文件的application中新增
```
<application
android:usesCleartextTraffic="true"
...
/>
```

- 真机运行项目报错
```
Installation did not succeed.
The application could not be installed: INSTALL_FAILED_TEST_ONLY
...
```
项目根目录的gradle.properties里面新增
```
# 真机运行报错fixed： "INSTALL_FAILED_TEST_ONLY"
android.injected.testOnly=false
```