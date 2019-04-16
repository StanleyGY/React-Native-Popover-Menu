import React, {Component} from "react";
import {Animated, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import * as PropTypes from "prop-types"
import {SCREEN_HEIGHT, SCREEN_WIDTH} from "./Constant";

export default class PopoverCommander extends Component {

   constructor(props) {
     super(props);

      this._scaleAnim = new Animated.Value(0.01);
      this._opacityAnim = new Animated.Value(0.01);
      this._translateX = new Animated.Value(0.01);

      this.state = {
         showMenu: false,

         // the top/left/bottom/right actually used in stylesheet
         menuStyleTop: null,
         menuStyleBottom: null,
         menuStyleLeft: null,
         menuStyleRight: null,

         arrowStyleTop: null,
         arrowStyleBottom: null,
         arrowStyleLeft: null,
         arrowStyleRight: null,
      };
   }

   _startShowMenuAnimation() {
      const toValue = 1;
      const duration = 180;
      Animated.timing(this._scaleAnim, {
         toValue: toValue,
         duration: duration,
      }).start();
      Animated.timing(this._opacityAnim, {
         toValue: toValue,
         duration: duration
      }).start();
      Animated.timing(this._translateX, {
         toValue: toValue,
         duration: duration
      }).start();
   }

   _startHideMenuAnimation() {
      const toValue = 0.01;
      const duration = 180;

      Animated.timing(this._scaleAnim, {
         toValue: toValue,
         duration: duration
      }).start(() => {
         // the menu should hide after the animation finishes
         this.setState({
            showMenu: false
         });
      });
      Animated.timing(this._opacityAnim, {
         toValue: toValue,
         duration: duration
      }).start();
      Animated.timing(this._translateX, {
         toValue: toValue,
         duration: duration
      }).start();
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

   // noinspection JSMethodCanBeStatic
   _measureButtonDimension(evt, callback) {
      const {width, height} = evt.nativeEvent.layout;

      if (callback) {
         callback({width, height});
      }
   }

   // noinspection JSMethodCanBeStatic
   _coordinateToStyleSheetPosition(coord) {
      const {
         top: topCoord,
         left: leftCoord,
         right: rightCoord,
         bottom: bottomCoord
      } = coord;

      return {
         top: topCoord,
         left: leftCoord,
         right: !rightCoord ? null : SCREEN_WIDTH - rightCoord,
         bottom: !bottomCoord ? null : SCREEN_HEIGHT - bottomCoord,
      }
   }

   // noinspection JSMethodCanBeStatic
   _computeButtonPositionRelToScreen(buttonStylePosition, buttonDimension) {
      const buttonWidth = buttonDimension.width;
      const buttonHeight = buttonDimension.height;

      // determine the quadrant
      const half_screen_width = SCREEN_WIDTH / 2;
      const half_screen_height = SCREEN_HEIGHT / 2;
      let quadrant = 0;

      // compute the coordinate of the button container over entire layer
      // (no position missing)
      let buttonTop = 0;
      let buttonBottom = 0;
      let buttonLeft = 0;
      let buttonRight = 0;

      // require either of top / bottom and left / right not null
      if (buttonStylePosition.top) {
         quadrant += (buttonStylePosition.top < half_screen_height ? 1 : 2);
         buttonTop = buttonStylePosition.top;
         buttonBottom = buttonStylePosition.top + buttonHeight;
      } else if (buttonStylePosition.bottom) {
         quadrant += (buttonStylePosition.bottom - buttonHeight < half_screen_height ? 1 : 2);
         buttonBottom = SCREEN_HEIGHT - buttonStylePosition.bottom;
         buttonTop = buttonBottom - buttonHeight;
      }

      if (buttonStylePosition.left) {
         quadrant += (buttonStylePosition.left < half_screen_width ? 1 : 2);
         buttonLeft = buttonStylePosition.left;
         buttonRight = buttonStylePosition.left + buttonWidth;
      } else if (buttonStylePosition.right) {
         quadrant += (buttonStylePosition.right - buttonWidth < half_screen_width ? 1 : 2);
         buttonRight = SCREEN_WIDTH - buttonStylePosition.right;
         buttonLeft = buttonRight - buttonWidth;
      }

      return {
         buttonTop,
         buttonLeft,
         buttonBottom,
         buttonRight,
         quadrant
      };
   }

   // noinspection JSMethodCanBeStatic
   _computeMenuPositionRelToScreen(buttonPositionInfo) {
      const {
         buttonTop,
         buttonLeft,
         buttonBottom,
         buttonRight,
         quadrant
      } = buttonPositionInfo;

      // the coordinate of the menu container over the entire layer
      let menuTop = null;
      let menuBottom = null;
      let menuLeft = null;
      let menuRight = null;

      if (quadrant === 0) {
         // invalid
      } else if (quadrant === 1) {
         // the menu shows on the bottom right of the button
         menuTop = buttonBottom + 15;
         menuLeft = buttonLeft - 5;
      } else if (quadrant === 2) {
         menuTop = buttonBottom + 15;
         menuRight = buttonRight + 5;
      } else if (quadrant === 3) {
         menuBottom = buttonTop - 15;
         menuLeft = buttonLeft - 5;
      } else if (quadrant === 4) {
         menuBottom = buttonTop - 15;
         menuRight = buttonRight + 5;
      }

      return {
         menuTop,
         menuBottom,
         menuLeft,
         menuRight
      };
   }

   // noinspection JSMethodCanBeStatic
   __computeArrowStylePositionRelToMenu(buttonPositionInfo, arrowInfo) {
      const {
         quadrant
      } = buttonPositionInfo;

      const {
         arrowSize,
         arrowOffset,
      } = arrowInfo;

      let arrowStyleTop = null;
      let arrowStyleLeft = null;
      let arrowStyleBottom = null;
      let arrowStyleRight = null;

      if (quadrant === 1) {
         arrowStyleTop = -arrowSize * 0.5;
         arrowStyleLeft = arrowOffset;
      } else if (quadrant === 2) {
         arrowStyleTop = -arrowSize * 0.5;
         arrowStyleRight = arrowOffset;
      } else if (quadrant === 3) {
         arrowStyleBottom = arrowSize * 0.5;
         arrowStyleLeft = arrowOffset;
      } else if (quadrant === 4) {
         arrowStyleBottom = arrowSize * 0.5;
         arrowStyleRight = arrowOffset;
      }

      return {
         arrowStyleLeft,
         arrowStyleTop,
         arrowStyleBottom,
         arrowStyleRight,
      };
   }

   _computeMenuStyle(buttonDimension) {
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
      const buttonPositionInfo = this._computeButtonPositionRelToScreen(
         this.props.buttonStylePosition, buttonDimension
      );

      const menuPositionInfo = this.props.computeMenuPosition ?
         this.props.computeMenuPosition(buttonPositionInfo) :
         this._computeMenuPositionRelToScreen(buttonPositionInfo);

      const arrowInfo = {
         arrowSize: this.props.arrowSize,
         arrowOffset: this.props.arrowOffset,
      };

      const {arrowStyleTop, arrowStyleLeft, arrowStyleBottom, arrowStyleRight} =
         this.props.computeArrowPosition ?
         this.props.computeArrowPosition(buttonPositionInfo, arrowInfo) :
         this.__computeArrowStylePositionRelToMenu(buttonPositionInfo, arrowInfo);

      // convert from coordinate to stylesheet position
      const {
         top: menuStyleTop,
         left: menuStyleLeft,
         bottom: menuStyleBottom,
         right: menuStyleRight
      } = this._coordinateToStyleSheetPosition({
         top: menuPositionInfo.menuTop,
         left: menuPositionInfo.menuLeft,
         bottom: menuPositionInfo.menuBottom,
         right: menuPositionInfo.menuRight
      });

      // compute the corresponding left/right/bottom/top in stylesheet
      this.setState({
         menuStyleTop,
         menuStyleLeft,
         menuStyleBottom,
         menuStyleRight,
         arrowStyleTop,
         arrowStyleLeft,
         arrowStyleBottom,
         arrowStyleRight,
      });
   }

   _renderArrow() {
      const arrowStyle = {
         position: 'absolute',
         left: this.state.arrowStyleLeft,
         top: this.state.arrowStyleTop,
         right: this.state.arrowStyleRight,
         bottom: this.state.arrowStyleBottom,
         backgroundColor: this.props.arrowColor,
         width: this.props.arrowSize,
         height: this.props.arrowSize,
         transform: [
            {
               rotateZ:  '45deg'
            }
         ]
      };
      return (
         <View style={[arrowStyle, this.props.arrowStyle]}/>
      );
   }

   _renderMenu() {
      const menuProps = {
         close: () => this._closeMenu()
      };
      return this.props.renderMenuItems(menuProps);
   };

   _renderDefaultPopoverButton = ({toggle}) => (
      <TouchableOpacity style={{
         width: 30,
         height: 30,
         backgroundColor: 'black',
         borderRadius: 20,
      }} onPress={toggle}/>
   );

   _renderPopoverButton() {
      /**
       *  Note:
       *  In order for the button container measuring the dimension of the button
       *  correctly, the button should not be absolutely positioned over the container
       * */

      const popoverButtonProps = {
         toggle: () => this._toggleMenu()
      };

      return (
         <View style={{
            position: 'absolute',
            left: this.props.buttonStylePosition.left,
            top: this.props.buttonStylePosition.top,
            right: this.props.buttonStylePosition.right,
            bottom: this.props.buttonStylePosition.bottom,
         }} onLayout={(evt) => this._measureButtonDimension(
            evt, (result) => this._computeMenuStyle(result)
         )}>
            {this.props.renderButton ? this.props.renderButton(popoverButtonProps) :
               this._renderDefaultPopoverButton(popoverButtonProps)}
         </View>
      );

   }

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

   _addAnimationHOC(children) {
      /**
       * Wrap the menu container into an animation HOC
       * */
      const animationStyle = {
         transform: [
            {
               scale: this._scaleAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                  extrapolate: 'clamp'
               })
            },
            {
               translateX: this._translateX.interpolate({
                  inputRange: [0, 1],
                  outputRange: [9, 0],
                  extrapolate: 'clamp'
               })
            }
         ],
         opacity: this._opacityAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp'
         }),
         position: 'absolute',
         left: this.state.menuStyleLeft,
         top: this.state.menuStyleTop,
         right: this.state.menuStyleRight,
         bottom: this.state.menuStyleBottom,
      };

      return (
         <Animated.View style={animationStyle}>
            {children}
         </Animated.View>
      )
   }

   render() {
      return (
         this._addOutsideMenuCloseHOC((
            <View style={styles.layer1}>
               {this._renderPopoverButton()}
               {this.state.showMenu && this._addAnimationHOC((
                  <View>
                     {this._renderMenu()}
                     {this._renderArrow()}

                  </View>
               ))}
            </View>
         ))
      );
   }
}

PopoverCommander.propTypes = {
   // the top/left/right/button specified in the stylesheet
   buttonStylePosition: PropTypes.shape({
      left: PropTypes.number,
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
   }).isRequired,

   // function to render a customized button
   renderButton: PropTypes.func,
   renderMenuItems: PropTypes.func.isRequired,

   computeMenuPosition: PropTypes.func,
   computeArrowPosition: PropTypes.func,

   // whether the menus disappear after pressing a non-menu area
   closeOnPressOutsideMenuItems: PropTypes.bool,

   arrowStyle: PropTypes.object,
   arrowColor: PropTypes.string,
   arrowSize: PropTypes.number,
   arrowOffset: PropTypes.number,
};

PopoverCommander.defaultProps = {
   closeOnPressOutsideMenuItems: true,
   arrowColor: '#455A64',
   arrowSize: 10,
   arrowOffset: 30,
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
   },
});
