This is the moblie app for the Poverty Stoplight platform. It is a native, not a web, app which requires you to setup your machine for native development.

## Prerequisites

### For OSX
- Install **xcode** from the App Store
- Install **brew** from [here](https://brew.sh)
- Install **node** via Brew (this will also install **npm** which you need to install required packages for the app) - `brew install node`
- Install **react-native command line interface** globally via npm - `npm install -g react-native-cli`
- Get **Watchman** via Brew - `brew install watchman`
- Install [Android Studio](https://developer.android.com/distribute/) (with default settings), which also needs [Java SE Development Kit 8](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
  - [Here](https://stackoverflow.com/a/47699905) is how to install Java with Brew (and manage multiple Java versions)
## To install

1.  `git clone git@github.com:penguin-digital/povertystoplightapp.git` to clone the repo
2.  `cd povertystoplightapp` to go into repo folder
3.  `npm i` from repo folder to install all dependencies

## To run

- `npm run start-ios` for IOS dev mode
- `npm run start-android` for Android dev mode

## Running the simulation on OSX

### iOS

Simulating an iPhone on OSX, **if you have done the prerequisites above**, is as easy as running `npm run start-ios`.

This will open the xcode simulator automatically. It takes some time, first time it runs. It will finish with opening the app itself in the simulator window. It will also open a browser *debugger* window, where you can use the console for errors and log outputs.

#### Some Installation Notes

**XCode Issues**
```
`xcrun: error: unable to find utility "instruments", not a developer tool or in PATH``xcrun: error: unable to find utility "instruments", not a developer tool or in PATH`
```
Then you need to set the Command Line Tools in your XCode Settings like [here](https://drive.google.com/file/d/19ZXdU7TAkDaiFua327ZkiKYV-wYYOotu/view?usp=sharing)

Stackoverflow solution [here](https://stackoverflow.com/questions/39778607/error-running-react-native-app-from-terminal-ios)

**CFBundleIdentifier Does not exist**
`":CFBundleIdentifier", Does Not Exist #7308`

Make sure port 8081 not in use (Metro Bundler is not Running) when compiling/bundling for the first time.

Stackoverflow solution [here](https://github.com/facebook/react-native/issues/7308#issuecomment-216317248)

### Android

Simulating an Android, is more of a hustle than iOs. Make sure **you have done the prerequisites above** and have Android Studio and Watchman. Make sure everyrthing is up to date with:

```
brew update
```

1. You need to set up environment variables in your `~/.bash_profile file`. Open Android Studio, go to *Configure > SDK Manager (Bottom Right)*. You should now see your Android SDK Location (top center, probably `$HOME/Library/Android/sdk`). Copy it and use it in your `~/.bash_profile file` by adding the following lines:

```
export ANDROID_HOME=$HOME</path/to/sdk>
PATH=$PATH:$ANDROID_HOME/emulator
PATH=$PATH:$ANDROID_HOME/tools
PATH=$PATH:$ANDROID_HOME/platform-tools
PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH
```

Save the changes and run `source ~/.bash_profile file` or safer yet, restart all terminal instances, for them to take effect. See if you have the `avdmanager` command in bash.

We can also check if the `sdkmanager` is up to date

```
sdkmanager --update
```

2. Now you need to an android virtual device for the emulator to run. First, you need to download the necessary system image with `sdkmanager "name;of;image"`. The naming convention of the APIs is `system-images;android-<API_VERSION>;google_apis;x86` for x86 emulators, which is what we need. Version number is different depending on which android version you need. So for example, if you want to test *Marshmallow* you run `sdkmanager "system-images;android-23;google_apis;x86"`. If you need to test *KitKat* you run `sdkmanager "system-images;android-19;google_apis;x86"`. After this run `sdkmanager --licenses` and accept all the licences with `y`.

```
sdkmanager "system-images;android-23;google_apis;x86" # for marshmallow
```

3. When you have the image you create the device with `avdmanager create avd -n <name> -k "<system-images;name>"`. So with the Marshmallow image installed above we can do `avdmanager create avd -n test -k "system-images;android-23;google_apis;x86"` and that will create a device named `test` running Android Marshmallow. You can use anything for the name.
```
avdmanager create avd -n test -k "system-images;android-23;google_apis;x86"
```
4. Runing the react-native project for Android doesn't open the emulator automatically like for iOS. You need to run it with `emulator -avd <device_name>`, or with the above setup: `emulator -avd test`

```
emulator -avd test
```

5. Finally, run `npm run start-android`. Again, wait for the emluator to open the app itself.
```
npm run start-android
```

## Running the app on a real device

### Android

1. **Enable Debugging over USB** on your device in order to install your app during development. If you haven't done so for this particular device, you will first need to enable the "Developer options" menu by going to *Settings → About* phone and then tapping the Build number row at the bottom *seven times*. You can then go back to *Settings → Developer* options to enable `USB debugging`.

2. **Plug in your device via USB** to the dev machine. A popup ascing for permission should appear on the device. Accept it. Now check that your device is properly connecting to ADB, the Android Debug Bridge, by running `adb devices` in the terminal. If the list is empty, check the cable. If the device display that it's unauthorized, unplug and plug again until you see the above mentioned popup and accept.

3. Run `npm run start-android`. Since there is no emulator running, the command will try to run the app on the connected device. Like with emulator mode, wait a bit for the app to appear on the device screen.

#### Troubleshooting

In case you see a red screen with `unable to load script from assets index.android.bundle`, try the following:

1. (in project directory) run `mkdir android/app/src/main/assets`
2. run `react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res`
3. Try starting the app again `npm run android-start`
