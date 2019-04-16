import React, {Component} from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Layer, PopoverAndroid} from "../src";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "./Display";
import {SHAKESPEAR_TEXT} from "../src/Constant";

export default class Demo extends Component {

   _renderPopoverMenuItem = ({close}) => (
      <PopoverAndroid.Menu>
         <PopoverAndroid.Option title={"Item One"} onPress={close}/>
         <PopoverAndroid.Option title={"Item Two"} onPress={close}/>
         <PopoverAndroid.Option title={"Item Three"}/>
      </PopoverAndroid.Menu>
   );

   _renderPopoverButton(title) {
      return ({toggle}) => (
         <TouchableOpacity style={{width: 60}} onPress={toggle}>
            <Text style={styles.btnText}>{title}</Text>
         </TouchableOpacity>
      );
   }

   _renderLayer = () => (
      <Layer>
         <View>
            <View style={[styles.navBar]}>
               <View style={[styles.navBarBtnGroup]}>
                  <PopoverAndroid.Placeholder dimension={{width: 60}}/>
                  <Text style={styles.btnText}>Demo</Text>
                  <PopoverAndroid.Placeholder dimension={{width: 60}}/>
               </View>
            </View>
            <ScrollView>
               <Text>{SHAKESPEAR_TEXT}</Text>
            </ScrollView>
         </View>
         <PopoverAndroid.Commander buttonStylePosition={{left: 30, top: 5}}
                                   renderButton={(props) => this._renderPopoverButton("Back")(props)}
                                   renderMenuItems={(props) => this._renderPopoverMenuItem(props)}/>
         <PopoverAndroid.Commander buttonStylePosition={{right: 20, top: 5}}
                                   renderButton={(props) => this._renderPopoverButton("Open")(props)}
                                   renderMenuItems={(props) => this._renderPopoverMenuItem(props)}/>
      </Layer>
   );

   render() {
      return (
         <View style={styles.container}>
            {this._renderLayer()}
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      height: SCREEN_HEIGHT,
      width: SCREEN_WIDTH,
   },
   navBar: {
      height: 36,
      backgroundColor: 'rgb(65, 65, 65)',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
   },
   navBarBtnGroup: {
      width: SCREEN_WIDTH,
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   btnText: {
      color: 'white',
      fontSize: 20,
   },

});
