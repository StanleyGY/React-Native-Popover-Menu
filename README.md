## Installation
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

## How it works

Crucially, any area of an interact-able component such as `TouchableOpacity` will only
receive the user events provided that this area is contained in its parent component,
and this area of its parent component is contained in its grandparent's component, and 
the chain goes on. 

TBD:
1. Any area interactable, appearing above another interacable, will receive the 
events first?


## Usage
 
   


