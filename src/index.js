import PopoverCommander from "./PopoverCommander";
import PopoverOption from "./PopoverOption";
import PopoverPlaceholder from "./PopoverPlaceholder";
import PopoverLayer from "./PopoverLayer";
import PopoverMenu from "./PopoverMenu";

/**
 * Commander:
 *    Responsible for the position, styles, and animations of button,
 *    menu container and arrow.
 * Menu:
 *    Responsible for styles of the menu contents
 * Option:
 *    Control an individual menu item
 *
 *
 * */

export const PopoverAndroid = {
   Commander: PopoverCommander,
   Menu: PopoverMenu,
   Option: PopoverOption,
   Placeholder: PopoverPlaceholder,
};

export const Layer = PopoverLayer;
