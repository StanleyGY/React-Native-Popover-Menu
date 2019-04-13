import {TouchableOpacity, View, StyleSheet, Text, Dimensions} from "react-native"
import React, {Component} from "react";

export default class Proto1 extends Component {

   render() {
      return (
         <View style={styles.container}>
            <TouchableOpacity style={[styles.firstCtr]}>
               <Text style={styles.textCenter}>
                  Will respond.
               </Text>
            </TouchableOpacity>

            <View style={[styles.secondCtr]}>
               <View style={[styles.thirdCtr]}>
                  <TouchableOpacity style={{
                     borderWidth: 2,
                     justifyContent: 'center',
                     position: 'absolute',
                     top: 80,
                  }}>
                     <Text style={styles.textCenter}>
                        Will respond outside the cyan area
                     </Text>
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: 'red',
      flex: 1
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
      height: 280,
      width: 200,

      backgroundColor: 'yellow',

      flexDirection: 'row',
      justifyContent:'center',
      alignItems: 'stretch'
   },
   thirdCtr: {
      height: 200,
      width: 100,
      backgroundColor: 'cyan'
   },

   textCenter: {
      alignSelf: 'center',
      fontSize: 22,
   }
});
