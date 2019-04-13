import React, {Component} from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Layer, PopoverAndroid} from "../src";
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "./Display";

export default class Demo extends Component {

   _renderPopoverMenuItem = ({close}) => (
      <PopoverAndroid.Menu>
         <PopoverAndroid.Option title={"Item One"} onPress={close}/>
         <PopoverAndroid.Option title={"Item Two"} onPress={close}/>
         <PopoverAndroid.Option title={"Item Three"}/>
      </PopoverAndroid.Menu>
   );

   _renderPopoverButton = ({toggle}) => (
      <TouchableOpacity style={{width: 60}} onPress={toggle}>
         <Text style={styles.btnText}>Open</Text>
      </TouchableOpacity>
   );

   _renderNavBarLayer = () => (
      <Layer>
         <View style={[styles.navBar]}>
            <View style={[styles.navBarBtnGroup]}>
               <TouchableOpacity style={{marginLeft: 30}}>
                  <Text style={styles.btnText}>Back</Text>
               </TouchableOpacity>
               <Text style={styles.btnText}>Demo</Text>
               <PopoverAndroid.Placeholder dimension={{width: 60}}/>
            </View>
         </View>
         <PopoverAndroid.Commander buttonPosition={{right: 20, top: 5}}
                                   renderButton={(props) => this._renderPopoverButton(props)}
                                   renderMenuItems={(props) => this._renderPopoverMenuItem(props)}/>
      </Layer>
   );

   _renderMainContentLayer = () => (
      <ScrollView>
         <Text>
            Though yet of Hamlet our dear brother's death {"\n"}
            The memory be green, and that it us befitted {"\n"}
            To bear our hearts in grief and our whole kingdom {"\n"}
            To be contracted in one brow of woe, {"\n"}
            Yet so far hath discretion fought with nature {"\n"}
            That we with wisest sorrow think on him, {"\n"}
            Together with remembrance of ourselves. {"\n"}
            Therefore our sometime sister, now our queen, {"\n"}
            The imperial jointress to this warlike state, {"\n"}
            Have we, as 'twere with a defeated joy, {"\n"}
            With an auspicious and a dropping eye, {"\n"}
            With mirth in funeral and with dirge in marriage, {"\n"}
            In equal scale weighing delight and dole, {"\n"}
            Taken to wife: nor have we herein barr'd {"\n"}
            Your better wisdoms, which have freely gone {"\n"}
            With this affair along. For all, our thanks.{"\n"}
            Now follows, that you know, young Fortinbras,{"\n"}
            Holding a weak supposal of our worth,{"\n"}
            Or thinking by our late dear brother's death{"\n"}
            Our state to be disjoint and out of frame,{"\n"}
            Colleagued with the dream of his advantage,{"\n"}
            He hath not fail'd to pester us with message,{"\n"}
            Importing the surrender of those lands{"\n"}
            Lost by his father, with all bonds of law,{"\n"}
            To our most valiant brother. So much for him.{"\n"}
            Now for ourself and for this time of meeting:{"\n"}
            Thus much the business is: we have here writ{"\n"}
            To Norway, uncle of young Fortinbras,{"\n"}
            Who, impotent and bed-rid, scarcely hears{"\n"}
            Of this his nephew's purpose,--to suppress{"\n"}
            His further gait herein; in that the levies,{"\n"}
            The lists and full proportions, are all made{"\n"}
            Out of his subject: and we here dispatch{"\n"}
            You, good Cornelius, and you, Voltimand,{"\n"}
            For bearers of this greeting to old Norway;{"\n"}
            Giving to you no further personal power{"\n"}
            To business with the king, more than the scope{"\n"}
            Of these delated articles allow.{"\n"}
            Farewell, and let your haste commend your duty.{"\n"}
            VOLTIMAND and Cornelius	In that and all things will we show our duty.	40
            KING CLAUDIUS	We doubt it nothing: heartily farewell.{"\n"}
            [Exeunt VOLTIMAND and CORNELIUS]{"\n"}
            And now, Laertes, what's the news with you?{"\n"}
            You told us of some suit; what is't, Laertes?{"\n"}
            You cannot speak of reason to the Dane,{"\n"}
            And lose your voice: what wouldst thou beg, Laertes,{"\n"}
            That shall not be my offer, not thy asking?{"\n"}
            The head is not more native to the heart,{"\n"}
            The hand more instrumental to the mouth,{"\n"}
            Than is the throne of Denmark to thy father.{"\n"}
            What wouldst thou have, Laertes?	50{"\n"}
            LAERTES	My dread lord,{"\n"}
            Your leave and favour to return to France;{"\n"}
            From whence though willingly I came to Denmark,{"\n"}
            To show my duty in your coronation,{"\n"}
            Yet now, I must confess, that duty done,{"\n"}
            My thoughts and wishes bend again toward France{"\n"}
            And bow them to your gracious leave and pardon.{"\n"}
            KING CLAUDIUS	Have you your father's leave? What says Polonius?{"\n"}
            LORD POLONIUS	He hath, my lord, wrung from me my slow leave{"\n"}
            By laboursome petition, and at last	60{"\n"}
            Upon his will I seal'd my hard consent:{"\n"}
            I do beseech you, give him leave to go.{"\n"}
            KING CLAUDIUS	Take thy fair hour, Laertes; time be thine,{"\n"}
            And thy best graces spend it at thy will!{"\n"}
            But now, my cousin Hamlet, and my son{"\n"}
         </Text>
      </ScrollView>
   );

   render() {
      return (
         <View style={styles.container}>
            {this._renderMainContentLayer()}
            {this._renderNavBarLayer()}
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
