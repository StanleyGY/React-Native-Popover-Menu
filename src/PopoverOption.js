import React, {Component} from "react";
import {TouchableOpacity, StyleSheet, Text} from "react-native";
import * as PropTypes from "prop-types"

export default class PopoverOption extends Component {
   render() {
      return (
         <TouchableOpacity onPress={() => this.props.onPress()} style={[styles.container]}>
            <Text style={styles.text}>{this.props.title}</Text>
         </TouchableOpacity>
      );
   }
}

PopoverOption.propTypes = {
   title: PropTypes.string.isRequired,
   onPress: PropTypes.func,
};

PopoverOption.defaultProps = {
   onPress: () => {}
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

