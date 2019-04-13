import React, {Component} from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import * as PropTypes from "prop-types"

export default class PopoverButton extends Component {

   constructor(props) {
     super(props);

      this.state = {
         showMenu: false,
      };
   }

   _renderDefaultPopoverButton = ({toggle}) => (
      <TouchableOpacity style={{
         width: 30,
         height: 30,
         backgroundColor: 'black',
         borderRadius: 20,
         position: 'absolute',
      }} onPress={toggle}/>
   );

   _toggleMenu() {
      this.setState({
         showMenu: !this.state.showMenu
      })
   }

   _renderPopoverButton = (props) => (
      this.props.renderButton ? this.props.renderButton(props) :
         this._renderDefaultPopoverButton(props)
   );

   _renderMenus = () => (
      <View style={[styles.menu]}>
         {this.props.children}
      </View>
   );

   render() {
      const popoverButtonProps = {
         toggle: () => this._toggleMenu()
      };

      return (
         <View style={styles.layer1}>
            <View style={{
               position: 'absolute',
               left: this.props.buttonPosition.left,
               top: this.props.buttonPosition.top,
               right: this.props.buttonPosition.right,
               bottom: this.props.buttonPosition.bottom
            }}>
               {this._renderPopoverButton(popoverButtonProps)}
            </View>
            {this.state.showMenu && this._renderMenus()}
         </View>
      )
   }
}

PopoverButton.propTypes = {
   buttonPosition: PropTypes.shape({
      left: PropTypes.number,
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
   }).isRequired,

   renderButton: PropTypes.func,
};

const styles = StyleSheet.create({
   layer1: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
   },
   menu: {
      position: 'absolute',
      top: 130,
      left: 140,
   }
});
