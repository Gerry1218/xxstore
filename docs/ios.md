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

