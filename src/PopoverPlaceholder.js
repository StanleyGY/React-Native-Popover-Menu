import React, {Component} from "react";
import {View} from "react-native";
import * as PropTypes from "prop-types"

export default class PopoverPlaceholder extends Component {

   render() {
      return (
         <View style={{
            width: this.props.dimension.width,
            height: this.props.dimension.height,
         }}/>
      )
   }
}

PopoverPlaceholder.propTypes = {
   dimension: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
   }).isRequired,
   backgroundColor: PropTypes.string,
};

PopoverPlaceholder.defaultProps = {
   backgroundColor: 'transparent'
};
