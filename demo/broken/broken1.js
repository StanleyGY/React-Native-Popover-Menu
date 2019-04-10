import {TouchableOpacity, View, StyleSheet, Text} from "react-native"
import React, {Component} from "react";

export default class BrokenDemo1 extends Component {

   pressFirst() {
      console.log("press first");
   };

   pressSecond() {
      console.log("press second");
   };

   render() {
      return (
         <View style={styles.container}>
            <TouchableOpacity style={[styles.firstCtr]}
                              onPress={() => this.pressFirst()}>
               <Text style={styles.textCenter}>
                  Will respond.
               </Text>
            </TouchableOpacity>
            <View style={[styles.secondCtr]}>
               <TouchableOpacity onPress={() => this.pressSecond()}
                                 style={{justifyContent: 'center'}}>
                  <Text style={styles.textCenter}>
                     Will not respond
                  </Text>
               </TouchableOpacity>
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: 'red',
      height: 200,
      width: 300
   },
   firstCtr: {
      position: 'absolute',
      height: 150,
      width: 150,

      backgroundColor: 'green',

      justifyContent: 'center'
   },
   secondCtr: {
      position: 'absolute',
      right: 10,
      top: 150,
      height: 100,
      width: 100,

      backgroundColor: 'yellow',

      flexDirection: 'row',
      justifyContent:'center',
      alignItems: 'stretch'
   },
   textCenter: {
      alignSelf: 'center',
      fontSize: 22,
   }
});
