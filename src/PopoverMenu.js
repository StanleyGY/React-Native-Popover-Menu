import React, {Component} from "react";
import {View, StyleSheet} from "react-native";


export default class PopoverMenu extends Component {

   render() {
      return (
         <View style={styles.container}>
            {this.props.children}
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'column',

      backgroundColor: '#101010',
      minWidth: 100,
   }
});
