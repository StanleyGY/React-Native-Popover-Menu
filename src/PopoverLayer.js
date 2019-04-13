import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "./Constant";

export default class PopoverLayer extends Component {
   render() {
      return (
         <View style={[styles.layer]} pointerEvents="box-none">
            {this.props.children}
         </View>
      )
   }
}

const styles = StyleSheet.create({
   layer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      backgroundColor: 'transparent',
      flexDirection: 'column',
   }
});
