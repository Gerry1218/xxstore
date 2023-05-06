## iOS
- 集成React native
在工程的Podfile中新增
```
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
[参考操作](https://my.oschina.net/petsatan/blog/5261899)