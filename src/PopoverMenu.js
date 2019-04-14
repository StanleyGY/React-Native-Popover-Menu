import React, {Component} from "react";
import {View, StyleSheet} from "react-native";
import * as PropTypes from "prop-types"

export default class PopoverMenu extends Component {

   render() {
      return (
         <View style={[styles.container, this.props.style]}>
            {this.props.children}
         </View>
      )
   }
}

PopoverMenu.propTypes = {
   style: PropTypes.object,
};

const styles = StyleSheet.create({
   container: {
      flexDirection: 'column',
      backgroundColor: '#101010',
      minWidth: 80,
   }
});
