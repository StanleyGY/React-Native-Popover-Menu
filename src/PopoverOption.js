import React, {Component} from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import * as PropTypes from "prop-types"
import {NOOP} from "./Constant";

export default class PopoverOption extends Component {
   render() {
      const {
         title,
         onPress,
         ...touchableOpacityProps
      } = this.props;

      return (
         <TouchableOpacity onPress={onPress} style={[styles.container]} {...touchableOpacityProps}>
            <Text style={styles.text}>{title}</Text>
         </TouchableOpacity>
      );
   }
}

PopoverOption.propTypes = {
   title: PropTypes.string.isRequired,
   onPress: PropTypes.func,
};

PopoverOption.defaultProps = {
   onPress: NOOP
};

const styles = StyleSheet.create({
   container: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 5,
      marginRight: 5,
   },
   text: {
      fontSize: 18,
      color: 'white'
   }
});

