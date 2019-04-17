# React Native Popover Menu




## Introduction
`React-Native-Popover-Menu` is a component offered as a work around
for known issue on Android. Please refer to the `How it works` section
if you expect to have a better understanding of the background. 

## Demo

![Example Animation](demo/final.gif)

The code snippets:
```
<Layer>
 <View>
    <View style={[styles.navBar]}>
       <View style={[styles.btnGroup]}>
          <PopoverAndroid.Placeholder dimension={{width: 60}}/>
          <Text style={styles.btnText}>Demo</Text>
          <PopoverAndroid.Placeholder dimension={{width: 60}}/>
       </View>
    </View>
    <ScrollView>
       <Text>{SHAKESPEAR_TEXT}</Text>
    </ScrollView>
 </View>
 <View style={styles.footer}>
    <View style={[styles.btnGroup]}>
       <PopoverAndroid.Placeholder dimension={{width: 60}}/>
       <Text style={styles.btnText}>Demo</Text>
       <PopoverAndroid.Placeholder dimension={{width: 60}}/>
    </View>
 </View>
 <PopoverAndroid.Commander buttonStylePosition={{left: 30, top: 5}}
                           renderButton={(props) => this._renderPopoverButton("Open1")(props)}
                           renderMenuItems={(props) => this._renderPopoverMenuItem(props)}/>
 <PopoverAndroid.Commander buttonStylePosition={{right: 20, top: 5}}
                           renderButton={(props) => this._renderPopoverButton("Open2")(props)}
                           renderMenuItems={(props) => this._renderPopoverMenuItem(props)}/>
 <PopoverAndroid.Commander buttonStylePosition={{left: 20, top: 532}}
                           renderButton={(props) => this._renderPopoverButton("Open3")(props)}
                           renderMenuItems={(props) => this._renderPopoverMenuItem(props)}/>
 <PopoverAndroid.Commander buttonStylePosition={{right: 20, top: 532}}
                           renderButton={(props) => this._renderPopoverButton("Open4")(props)}
                           renderMenuItems={(props) => this._renderPopoverMenuItem(props)}/>
</Layer>
```





## Usage

#### Installation
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

#### Documentation


## How it works

Crucially, any area of an interact-able component such as `TouchableOpacity` will only
receive the user events provided that this area is contained in its parent component,
and this area of its parent component is contained in its grandparent's component, and 
the chain goes on. 


