## iOS
- 集成React native
在工程的Podfile中新增
```ruby
    # 集成React native配置
    require_relative '../node_modules/react-native/scripts/react_native_pods'
    require_relative '../node_modules/@react-native-community/cli-platform-ios/native_modules'
    ...
    target 'xxshop' do
        # 集成React native配置
        config = use_native_modules!
        use_react_native!(:path => config["reactNativePath"])
        ...
        pod xxxx
        ...
    end
```
- 新建项目pod install报错
```
Analyzing dependencies
/Library/Ruby/Gems/2.6.0/gems/cocoapods-1.11.3/lib/cocoapods/user_interface/error_report.rb:34:in `force_encoding': can't modify frozen String (FrozenError)
	from /Library/Ruby/Gems/2.6.0/gems/cocoapods-1.11.3/lib/cocoapods/user_interface/error_report.rb:34:in `report'
	from /Library/Ruby/Gems/2.6.0/gems/cocoapods-1.11.3/lib/cocoapods/command.rb:66:in `report_error'
```
点击项目 -> General -> 右侧Project Document -> Project Format改为`Xcode 11.0-compatible`再执行

- 当前的rn版本不支持UISceme，如果项目有的话需要去掉UIScene相关代码
[解决方案](https://my.oschina.net/petsatan/blog/5261899)

- 字符串/字典转浮点值精度问题
    - 问题场景
        后台使用BigDecimal类型返回价格字段，客户端通过NSString类型接收兵显示则会发生精度丢失问题，接口返回的NSDictionary为NSNumber类型（float）。
        - 方案1. 使用CGFloat接收该数据
        - 方案2. 使用NSNumber格式化该值，再取stringValue
    - OC字符串转浮点值
        ```objc
        // 问题用法
        NSString *xx = @"69.9";
        NSString *yy = @"584.06";
        NSString *zz = @"71.2";

        float x = xx.floatValue;;
        float y = yy.floatValue;
        float z = zz.floatValue;

        NSLog(@"%f %f %f", x, y, z);
        // 输出: 69.900002 584.059998 71.199997
        ```
        使用时需要用NSNumber格式化下，再取stringValue
        ```objc
        NSNumber *nx = [NSNumber numberWithFloat:x];
        NSNumber *ny = [NSNumber numberWithFloat:y];
        NSNumber *nz = [NSNumber numberWithFloat:z];
        
        NSLog(@"%@, %@, %@", nx.stringValue, ny.stringValue, nz.stringValue);
        // 输出: 69.9, 584.06, 71.2
        ```
    - Swift CGFloat转String
        ```swift
        let price = "\(69.9)"
        // 不能用NSNumber转，会有精度问题
        ```
    
    - 字典中取浮点值
        ```objc
        // 问题用法
        NSDictionary *dict = @{@"v": @(69.9)};        
        NSNumber *n = dict[@"v"];    
        NSLog(@"%@", n.stringValue);
        // 输出: 69.90000000000001
        ```
        浮点值放入字典需要使用NSNumber转化下
        ```objc
        NSNumber *n1 = [NSNumber numberWithFloat:69.9];
        ```
    **建议：**
    **1. 浮点值转NSString时，需要使用NSNumber转化下再取stringValue;**
    **2. 不要使用`@(69.9)`格式化字典中的浮点;**

- XCode加载RN静态资源，rn项目中目录/assets下的图片等静态资源
    - 拷贝rn项目打包/ios目录中的assets文件夹到/RNComponents/bundles文件夹下，必须同index.bundle一样的目录；
    <img src="./images/ios/i3.png">
    - 在XCode中添加该文件夹,选择`Create folder references`,不然图片打包ipa后会放在根目录，无法读取；
    <img src="./images/ios/i1.png" width=500>
    - 文件夹添加后是蓝色的，如下图所示
    <img src="./images/ios/i2.png" width=500>

    
- AFNetworking含UIWebView，审核被拒。
删掉AFNetworking中的`UIWebView+AFNetworking.h`和.m文件，删掉相关import "UIWebView+AFNetworking.h"的地方
- 在WebViewJavascriptBridge含UIWebView的处理。
手动删除文件`WebViewJavascriptBridge.h`和`WebViewJavascriptBridge.m`，在`WebViewJavascriptBridge-umbrella`文件中删掉`import "WebViewJavascriptBridge.h"`

或者在Podfile中新增
```ruby
post_install do |installer|
    dir_web = File.join(installer.sandbox.pod_dir('WebViewJavascriptBridge'), 'WebViewJavascriptBridge')
    Dir.foreach(dir_web) {|x|
      real_path = File.join(dir_web, x)
      if (!File.directory?(real_path) && File.exists?(real_path))
        if(x == 'WebViewJavascriptBridge.h' || x == 'WebViewJavascriptBridge.m')
          File.delete(real_path)
        end
      end
    }
    
    dir_web = File.join(installer.sandbox.pod_dir('AFNetworking'), 'UIKit+AFNetworking')
    Dir.foreach(dir_web) {|x|
      real_path = File.join(dir_web, x)
      if (!File.directory?(real_path) && File.exists?(real_path))
        if(x == 'UIWebView+AFNetworking.h' || x == 'UIWebView+AFNetworking.m' || x == 'UIKit+AFNetworking.h')
          File.delete(real_path)
        end
      end
    }
    
end
```

- `react-native-viewpager`链接失败，在`Pods` -> `react-native-viewpager` -> `Build Phases` -> `Link Binary With Libraries` 新增`React-Core`库再编译。

- XCode14.2中**SVGAPlayer**库编译报错。
错误提示如下
```
~/ios/Pods/SVGAPlayer/Source/pbobjc/Svga.pbobjc.m:605:14: error: implicit declaration of function 'OSAtomicCompareAndSwapPtrBarrier' is invalid in C99 [-Werror,-Wimplicit-function-declaration]
        if (!OSAtomicCompareAndSwapPtrBarrier(nil, worker, (void * volatile *)&descriptor)) {
             ^
~/ios/Pods/SVGAPlayer/Source/pbobjc/Svga.pbobjc.m:605:14: error: declaration of 'OSAtomicCompareAndSwapPtrBarrier' must be imported from module 'Darwin.libkern.OSAtomic' before it is required
...
```

在Svga.pbobjc.h文件中新增如下：
```objc
#include <libkern/OSAtomic.h>
```
[解决方案参考](https://stackoverflow.com/questions/76230814/xcode-firebase-message-error-osatomiccompareandswapptrbarrier)


- iOS共享文件夹([UTIs类型说明](https://developer.apple.com/library/archive/documentation/Miscellaneous/Reference/UTIRef/Articles/System-DeclaredUniformTypeIdentifiers.html#//apple_ref/doc/uid/TP40009259-SW1))
  - UIFileSharingEnabled - 可以从iTunes中导入文件到Documents文件夹中
  - LSSupportsOpeningDocumentsInPlace - 确保local file provider可以访问你的Documents文件夹（UIDocumentPickerViewController打开可访问）
  ```objc
  NSArray *types = @[
          @"public.data",
          @"com.microsoft.powerpoint.ppt",
          @"com.microsoft.word.doc",
          @"com.microsoft.excel.xls",
          @"com.microsoft.powerpoint.pptx",
          @"com.microsoft.word.docx",
          @"com.microsoft.excel.xlsx",
          @"public.avi",
          @"public.3gpp",
          @"public.mpeg-4",
          @"com.compuserve.gif",
          @"public.jpeg",
          @"public.png",
          @"public.plain-text",
          @"com.adobe.pdf"
      ];
  ```

---
## 证书相关
-  Provisioning Profiles文件位置，用户删除更新该文件
`~/Library/MobileDevice/Provisioning Profiles`



----
## 破解
- 环境
  - iPhone7手机一部， iOS15.0.1
  - mac os11.6
  
- 工具
  - frida 16.0.19
  - mac爱思助手

- 教程
  - [越狱教程](https://www.i4.cn/news_detail_51164.html)
  
  
    You may jailbreak any A8-A11 device on iOS 15.0-16.4 using macOS or Linux. There is no Windows support and we do not know if palera1n will ever have it.



- 参考
  - [paler1n官网](https://palera.in/)
    https://ios.cfw.guide/installing-palera1n/#installing-the-jailbreak

  - 砸壳工具

  - https://crifan.github.io/ios_re_crack_shell_ipa/website/crack_tools/
  
安装frida,砸壳步骤
https://blog.csdn.net/boildoctor/article/details/122769942

https://bbs.kanxue.com/thread-275623.htm



sudo pip3 install frida安装后，找不到frida
执行下面脚本
python3 -m pip install frida-tools
frida路径：/Users/gerry/Library/Python/3.9/bin

https://cloud.tencent.com/developer/article/1897106
https://blog.51cto.com/u_15162069/2868199
https://www.cxyzjd.com/article/feifeiwuxian/81666852

cydia添加源https://build.frida.re

**注意事项：**
**1. 一定要重装**
进入“设置”>“通用”>“传输或重置 iPhone”>“抹掉所有内容和设置”；
**2. 线很重要**
如果使用 USB-C 转闪电数据线，可能需要使用 USB-C 转 USB-A 适配器和 USB-A 转闪电数据线，因为某些 USB-C 转 Lightning 线可能不允许您将 iPhone 进入到 DFU 模式。

- 如果在palera1n中下载 downloading xxx卡住，重新打开该app

使用爱思助手打开SSH通道，执行
scp -P 2222 ./Clutch-2.0.4 root@127.0.0.1:/var/root/Clutch
alpine


砸壳参考
https://github.com/we11cheng/WCStudy/blob/master/frida-ios-dump.md
https://cloud.tencent.com/developer/article/1897106
安装frida, 版本16.0.19
https://blog.51cto.com/u_15162069/2868199




- 手机越狱
- 手机安装frida
- mac安装frida
  通过sudo pip3 install frida
  报错
  ```
  Building wheels for collected packages: frida
  Building wheel for frida (PEP 517) ... error
  ERROR: Command errored out with exit status 1:
   command: /Applications/Xcode.app/Contents/Developer/usr/bin/python3 /Applications/Xcode.app/Contents/Developer/Library/Frameworks/Python3.framework/Versions/3.8/lib/python3.8/site-packages/pip/_vendor/pep517/_in_process.py build_wheel /tmp/tmpdkwip544
       cwd: /private/tmp/pip-install-doep827d/frida
  ```
  解决：https://blog.csdn.net/song_lee/article/details/105102108


- MonkeyDev使用
https://crifan.github.io/ios_re_monkeydev_debug/website/env_setup/init_monkeydev.html


问题
- 编译报错
```
error: Build input file cannot be found: '/Users/gerry/Downloads/DKWechatHelper-master2/dkhelper/dkhelper/Info.plist'. Did you forget to declare this file as an output of a script phase or custom build rule which produces it? (in target 'dkhelper' from project 'dkhelper')
...
```
Build Settings -> Info.plist File删掉 dkhelper/Info.plist
Generate Info.plist File 设为 YES


### 参考
  - [MimeTypes类型](https://www.iana.org/assignments/media-types/media-types.xhtml)