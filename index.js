import React, { Component } from "react";
import { Text, AppRegistry } from "react-native";

class RNMain extends Component {
  render() {
    return <Text>Hello world</Text>;
  }
}

AppRegistry.registerComponent("RNMain", () => RNMain);
