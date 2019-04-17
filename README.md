# React Native Popover Menu

## Introduction
`React-Native-Popover-Menu` is a very simple component to use without adding any native
dependencies. See more details on the background on *How it works* section.

## Demo

![Example Animation](demo/final.gif)

The code snippets. [More details](https://github.com/Stanley1234/React-Native-Popover-Menu/blob/master/demo/Demo.js)
```
<Layer>
 <View>
    <View style={[styles.navBar]}>
       <View style={[styles.btnGroup]}>
          <Popover.Placeholder dimension={{width: 60}}/>
          <Text style={styles.btnText}>Demo</Text>
          <Popover.Placeholder dimension={{width: 60}}/>
       </View>
    </View>
    <ScrollView>
       <Text>{SHAKESPEAR_TEXT}</Text>
    </ScrollView>
 </View>
 <View style={styles.footer}>
    <View style={[styles.btnGroup]}>
       <Popover.Placeholder dimension={{width: 60}}/>
       <Text style={styles.btnText}>Demo</Text>
       <Popover.Placeholder dimension={{width: 60}}/>
    </View>
 </View>
 <Popover.Commander buttonStylePosition={{left: 30, top: 9}}
                           renderButton={(props) => this._renderPopoverButton("Open1")(props)}
                           renderMenuItems={(props) => this._renderPopoverMenuItem(props)}/>
 <Popover.Commander buttonStylePosition={{right: 20, top: 9}}
                           renderButton={(props) => this._renderPopoverButton("Open2")(props)}
                           renderMenuItems={(props) => this._renderPopoverMenuItem(props)}/>
 <Popover.Commander buttonStylePosition={{left: 20, top: 532}}
                           renderButton={(props) => this._renderPopoverButton("Open3")(props)}
                           renderMenuItems={(props) => this._renderPopoverMenuItem(props)}/>
 <Popover.Commander buttonStylePosition={{right: 20, top: 532}}
                           renderButton={(props) => this._renderPopoverButton("Open4")(props)}
                           renderMenuItems={(props) => this._renderPopoverMenuItem(props)}/>
</Layer>
```

## Usage

#### Installation (Optional)
1. Make sure that you have already followed the steps described
   in the official documentation:
    - Install `npm` and `react-native-cli`
    - Install Android SDK and `adb`-cli
2. Install `jdk-8.0`. Note that the `gradle` is more compatible 
   with JDK 8. 
3. Check that you have `local.properties` under `android` with 
   Android SDK directory in this file. Note that executing `react-native run-android`
   may still ask for `ANDROID_HOME` even when you have exported 
   this environment variable
4. Make sure that the owner and group of this project are not `root`

### Documentation

#### Layer

Creating a screen-sized layer on which popover menus and other components should
reside. It is the best practice to have popover menus residing inside a `Layer`
component to be capable of receiving user inputs. The section *How it works* provides
more details on the necessity of a screen-sized layer.

| Props | Type | Description|
|-------|------|------------|
|children|  | Child components residing inside the layer

#### Popover.Commander

Responsible for the styles and animations of both button and menu container.

| Props | Type | Description| Default | Mandatory|
|-------|------|------------| --------|----------|
|buttonStylePosition| object | Absolute position of the button specified in stylesheet| |true| 
|renderMenuItems| function | Render menu container and menu items | | true |
|renderButton| function | Render customized button | | false |
|computeMenuPosition| function | Compute the absolute position of menu container | | false|
|computeArrowPosition| function | Compute the absolute position of the arrow relative to menu | | false |
|closeOnPressOutsideMenuItems| boolean | Whether the menu is off pressing an area outside the menu container | true | false |
|arrowStyle| object | Style of the arrow itself | | false |
|arrowColor| string | Color of the arrow | #455A64 | false |
|arrowSize| number | Size of the arrow | 10 | false |
|arrowOffset| number | Offset of the arrow relative to the edge of the menu container | 30 | false |

#### Popover.Menu

Responsible for the style of the menu container.

| Props | Type | Description| Default | Mandatory|
|-------|------|------------| --------|----------|
|showMenuItemSplitter| boolean | Whether a line splitter should be shown between two options | true | false |
|lineSplitterColor| string | Color of the line splitter | #90A4AE | false |
|lineSplitterWidth| number | Width of the line splitter | 1 | false |
|style| object | Style of the menu container | | false |

#### Popover.Option

Manage the content of a menu option.

| Props | Type | Description| Default | Mandatory|
|-------|------|------------| --------|----------|
| title | string | Title of the menu option | | true |
| onPress | function | Callback when the menu option is clicked | noop | false |
| style | object | Style of the menu option container | | false | 
|textStyle| object | Style of the menu title | | false |
|touchableOpacityProps| object | TouchableOpacity props | | false|

#### Popover.Placeholder

All popover buttons are absolutely positioned over the placeholder. Originally, we may expect
that the popover button relatively positioned over certain container, for example, to make good
use of flex box layout. Now that the popover button are absolutely positioned, it isn't a member 
of the flex box layout. This significantly adds difficulty to use the flex box layout. With a
placeholder, however, it could be as if the popover button is part of the flex box layout.

| Props | Type | Description| Default | Mandatory|
|-------|------|------------| --------|----------|
|dimension| object | Width and height of the button | | true |
|backgroundColor | string | Background color of the placeholder | transparent | false |

## How it works

Crucially, any area of an interact-able component such as `TouchableOpacity` will only
receive the user events provided that this area is contained in its parent component,
and this area of its parent component is contained in its grandparent's component, and 
the chain goes on. 


