import React, { Component } from "react";
import { Text, AppRegistry, View } from "react-native";

class RNMain extends Component {
  render() {
    var { pageName } = this.props;
    let params = this.props.params;

    return (
      <View>
        <Text>Hello world</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent("RNMain", () => RNMain);
