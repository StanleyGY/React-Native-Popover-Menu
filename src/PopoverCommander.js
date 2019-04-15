import React, {Component} from "react";
import {Animated, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import * as PropTypes from "prop-types"
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "./Constant";

export default class PopoverCommander extends Component {

   constructor(props) {
     super(props);

      this._scaleAnim = new Animated.Value(0.01);
      this._opacityAnim = new Animated.Value(0.01);

      this.state = {
         showMenu: false,

         // the top/left/bottom/right actually used in stylesheet
         menuStyleTop: null,
         menuStyleBottom: null,
         menuStyleLeft: null,
         menuStyleRight: null,
      };
   }

   _startShowMenuAnimation() {
      Animated.timing(this._scaleAnim, {
         toValue: 1,
         duration: 180,
      }).start();
      Animated.timing(this._opacityAnim, {
         toValue: 1,
         duration: 180
      }).start();
   }

   _startHideMenuAnimation() {
      Animated.timing(this._scaleAnim, {
         toValue: 0.01,
         duration: 180
      }).start(() => {
         // the menu should hide after the animation finishes
         this.setState({
            showMenu: false
         });
      });
      Animated.timing(this._opacityAnim, {
         toValue: 0.01,
         duration: 180
      });
   }

   // noinspection JSMethodCanBeStatic
   _measureButtonDimension(evt, callback) {
      const {width, height} = evt.nativeEvent.layout;

      if (callback) {
         callback({width, height});
      }
   }

   _computeMenuPosition(buttonDimension) {
      /**
       * Compute the position of the menu. Split the screen into four quadrants.
       * If the popover-menu button is in the first quadrant:
       *    the menu shows on the right bottom of the button
       * If the popover-menu button is in the second quadrant:
       *    the menu shows on the left bottom of the button
       * If the popover-menu button is in the third quadrant:
       *    the menu shows on the upper right of the button
       * If the popover-menu button is in the fourth quadrant:
       *    the menu shows on the upper left of the button
       *
       * */
      const buttonWidth = buttonDimension.width;
      const buttonHeight = buttonDimension.height;

      // the coordinate of the button container over entire layer
      // specified by user
      const {buttonPosition} = this.props;

      // determine the quadrant
      const half_screen_width = SCREEN_WIDTH / 2;
      const half_screen_height = SCREEN_HEIGHT / 2;
      let quadrant = 0;

      // the coordinate of the button container over entire layer
      // (no position missing)
      let buttonTop = 0;
      let buttonBottom = 0;
      let buttonLeft = 0;
      let buttonRight = 0;

      // require either of top / bottom and left / right not null
      if (buttonPosition.top) {
         quadrant += (buttonPosition.top < half_screen_height ? 1 : 2);
         buttonTop = buttonPosition.top;
         buttonBottom = buttonPosition.top + buttonHeight;
      } else if (buttonPosition.bottom) {
         quadrant += (buttonPosition.bottom - buttonHeight < half_screen_height ? 1 : 2);
         buttonBottom = SCREEN_HEIGHT - buttonPosition.bottom;
         buttonTop = buttonBottom - buttonHeight;
      }
      if (buttonPosition.left) {
         quadrant += (buttonPosition.left < half_screen_width ? 1 : 2);
         buttonLeft = buttonPosition.left;
         buttonRight = buttonPosition.left + buttonWidth;
      } else if (buttonPosition.right) {
         quadrant += (buttonPosition.right - buttonWidth < half_screen_width ? 1 : 2);
         buttonRight = SCREEN_WIDTH - buttonPosition.right;
         buttonLeft = buttonRight - buttonWidth;
      }

      // the coordinate of the menu container over the entire layer
      let menuTop = null;
      let menuBottom = null;
      let menuLeft = null;
      let menuRight = null;

      if (quadrant === 0) {
         // invalid
      } else if (quadrant === 1) {
         // the menu shows on the bottom right of the button
         menuTop = buttonTop + 10;
         menuLeft = buttonRight + 12;
      } else if (quadrant === 2) {
         menuTop = buttonTop + 10;
         menuRight = buttonLeft - 12;
      } else if (quadrant === 3) {
         menuBottom = buttonBottom - 10;
         menuLeft = buttonRight + 12;
      } else if (quadrant === 4) {
         menuBottom = buttonBottom - 10;
         menuRight = buttonLeft - 12;
      }

      // compute the corresponding left/right/bottom/top in stylesheet
      this.setState({
         menuStyleTop: menuTop,
         menuStyleLeft: menuLeft,
         menuStyleBottom: menuBottom ? SCREEN_HEIGHT - menuBottom : null,
         menuStyleRight: menuRight ? SCREEN_WIDTH - menuRight : null,
      })
   }

   _toggleMenu() {
      if (this.state.showMenu) {
         // start to hide
         this._startHideMenuAnimation();
      } else {
         // start to appear
         // the menu should appear immediately
         this.setState({ showMenu: true });
         this._startShowMenuAnimation();
      }
   }

   _closeMenu() {
      if (this.state.showMenu) {
         this._startHideMenuAnimation();
      }
   }

   _renderMenu() {
      const menuStyle = {
         top: this.state.menuStyleTop,
         left: this.state.menuStyleLeft,
         bottom: this.state.menuStyleBottom,
         right: this.state.menuStyleRight,
         transform: [
            {
               scale: this._scaleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                  extrapolate: 'clamp'
               }),
            }
         ],
         opacity: this._opacityAnim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0.1, 1],
            extrapolate: 'clamp'
         })
      };
      const menuProps = {
         close: () => this._closeMenu()
      };
      return (
         <Animated.View style={[styles.menu, menuStyle]}>
            {this.props.renderMenuItems(menuProps)}
         </Animated.View>
      );
   };

   _addOutsideMenuCloseHOC(children) {
      /**
       * Add a HOC to accept user events outside the menu
       * */

      const willRespondOutsideMenu =
         this.props.closeOnPressOutsideMenuItems && this.state.showMenu;

      return (
         !willRespondOutsideMenu ? children : (
            <TouchableWithoutFeedback onPress={() => this._closeMenu()}>
               {children}
            </TouchableWithoutFeedback>
         )
      );
   }

   _renderDefaultPopoverButton = ({toggle}) => (
      <TouchableOpacity style={{
         width: 30,
         height: 30,
         backgroundColor: 'black',
         borderRadius: 20,
      }} onPress={toggle}/>
   );

   _renderPopoverButton = (props) => (
      this.props.renderButton ? this.props.renderButton(props) :
         this._renderDefaultPopoverButton(props)
   );

   render() {
      /**
       *  Note:
       *  In order for the button container measuring the dimension of the button
       *  correctly, the button should not be absolutely positioned over the container
       * */

      const popoverButtonProps = {
         toggle: () => this._toggleMenu()
      };

      return (
         this._addOutsideMenuCloseHOC((
            <View style={styles.layer1}>
               <View style={{
                     position: 'absolute',
                     left: this.props.buttonPosition.left,
                     top: this.props.buttonPosition.top,
                     right: this.props.buttonPosition.right,
                     bottom: this.props.buttonPosition.bottom,
                  }} onLayout={(evt) =>
                  this._measureButtonDimension(
                     evt, (result) => this._computeMenuPosition(result)
                  )}>
                  {this._renderPopoverButton(popoverButtonProps)}
               </View>
               {this.state.showMenu && this._renderMenu()}
            </View>
         ))
      );
   }
}

PopoverCommander.propTypes = {
   // the top/left/right/button specified in the stylesheet
   buttonPosition: PropTypes.shape({
      left: PropTypes.number,
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
   }).isRequired,

   // function to render a customized button
   renderButton: PropTypes.func,
   renderMenuItems: PropTypes.func.isRequired,

   // whether the menus disappear after pressing a non-menu area
   closeOnPressOutsideMenuItems: PropTypes.bool,
};

PopoverCommander.defaultProps = {
   closeOnPressOutsideMenuItems: true,
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
   }
});
