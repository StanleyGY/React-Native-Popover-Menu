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
               <View style={[styles.btnGroup]}>
                  <PopoverAndroid.Placeholder dimension={{width: 60}}/>
                  <Text style={styles.btnText}>Demo</Text>
                  <PopoverAndroid.Placeholder dimension={{width: 60}}/>
               </View>
            </View>
            <ScrollView>
               <Text>{SHAKESPEAR_TEXT}</Text>
            </ScrollView>
         </View>
         <View style={styles.footer}>
            <View style={[styles.btnGroup]}>
               <PopoverAndroid.Placeholder dimension={{width: 60}}/>
               <Text style={styles.btnText}>Demo</Text>
               <PopoverAndroid.Placeholder dimension={{width: 60}}/>
            </View>
         </View>
         <PopoverAndroid.Commander buttonStylePosition={{left: 30, top: 9}}
                                   renderButton={(props) => this._renderPopoverButton("Open1")(props)}
                                   renderMenuItems={(props) => this._renderPopoverMenuItem(props)}/>
         <PopoverAndroid.Commander buttonStylePosition={{right: 20, top: 9}}
                                   renderButton={(props) => this._renderPopoverButton("Open2")(props)}
                                   renderMenuItems={(props) => this._renderPopoverMenuItem(props)}/>
         <PopoverAndroid.Commander buttonStylePosition={{left: 20, top: 532}}
                                   renderButton={(props) => this._renderPopoverButton("Open3")(props)}
                                   renderMenuItems={(props) => this._renderPopoverMenuItem(props)}/>
         <PopoverAndroid.Commander buttonStylePosition={{right: 20, top: 532}}
                                   renderButton={(props) => this._renderPopoverButton("Open4")(props)}
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
      height: 45,
      backgroundColor: 'rgb(65, 65, 65)',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
   },

   footer: {
      height: 45,
      backgroundColor: 'rgb(65, 65, 65)',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',

      position: 'absolute',
      top: 523,
   },

   btnGroup: {
      width: SCREEN_WIDTH,
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   btnText: {
      color: 'white',
      fontSize: 20,
   },

});
