import React, {Component} from "react";
import {View, StyleSheet} from "react-native";
import * as PropTypes from "prop-types"

export default class PopoverMenu extends Component {

   _addMenuItemSplitter(children) {
      let updatedChildren = [];
      children.forEach((child, index) => {
         if (index === children.length - 1) {
            updatedChildren.push(child);
         } else {
            updatedChildren.push(
               <View style={{borderColor: '#90A4AE', borderBottomWidth: 1}} key={`${index}`}>
                  {child}
               </View>
            );
         }
      });
      return updatedChildren;
   }

   render() {
      let updatedChildren = this.props.children;
      if (this.props.showMenuItemSplitter) {
         updatedChildren = this._addMenuItemSplitter(updatedChildren);
      }

      return (
         <View style={[styles.container, this.props.style]}>
            {updatedChildren}
         </View>
      )
   }
}

PopoverMenu.propTypes = {
   style: PropTypes.object,

   showMenuItemSplitter: PropTypes.bool,
   lineSplitterColor: PropTypes.string,
   lineSplitterWidth: PropTypes.number,
};

PopoverMenu.defaultProps = {
   showMenuItemSplitter: true,
   lineSplitterColor: '#90A4AE',
   lineSplitterWidth: 1,
};

const styles = StyleSheet.create({
   container: {
      flexDirection: 'column',
      backgroundColor: '#455A64',
      minWidth: 80,
   }
});
