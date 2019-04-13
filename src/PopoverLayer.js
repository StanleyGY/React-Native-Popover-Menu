import React, {Component} from "react";
import {Dimensions, View, StyleSheet} from "react-native";

const SCREEN_WIDTH = Dimensions.get("screen").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;

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
