This is the moblie app for the Poverty Stoplight platform. It is a native, not a web, app which requires you to setup your machine for native development.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Instalation](#to-install)
- [Running](#to-run)
- [Simulation on OSX](#running-the-simulation-on-osx)
- [Running on actual device](#running-the-app-on-a-real-device)
- [Debugging](#debugging)
- [Deploying on Play Store](#deploying)


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

## Debugging

To see the console log you need to enable Remote Debugging. You can use the `⌘D` keyboard shortcut when your app is running in the iOS Simulator, or `⌘M` when running in an Android emulator on Mac OS. That opens the dev menu where you can select Enable Remote Debugging. You can also enable Hot Reload from there.

When running the app on an android device you can use the adb shell on your dev machine terminal to give it commands.

To open the dev tools on a device: `adb shell input keyevent 82`
To refresh an android device used for testing run: `adb shell input text "RR"`

In case you get an `failed to connect to dev server` error, most probably your dev machine is either on a different network, or has switched it's IP since your last session. To fix that:

1. Open dev tools on the device, shaking it or using the command above.
2. Open Dev Settings
3. In there tap Debug server host & port for device
4. Enter your IP, including the `:8081` port otherwise it's likely not to work.

To find your IP address on a Mac, open Settings > Network > Advanced (while your active connection is selected) > TCP/IP tab. Your local IP should be next to IPv4 Address.

## Deploying

To deploy the app on the Play Store, you need access to it on the Google Play Console. If you don't have access ask the product owner. If you have access follow these steps:

1. Open `/android/app/build.gradle`, find the lines with `versionCode` ane `versionName` and bump up both versions with one. For example:
```
versionCode 3 // becomes versionCode 4
versionName "3.0" // becomes versionName "4.0"
```
2. Open Android Studio on your dev machine.
3. Open the MentorApp project in it. If this is the first time you are opening this project in Android Studio you will have to select `Open existing project` and then browse to `project_folder/android` and selecting it.
4. From the top menu select `Build > Generate Signed Bundle / APK`. If it's greyed out, checkout the bottom status bar. Are there any processes runing or is Android Studio indexing? Wait for these to finish.
5. Select APK in the next screen. Click Next.
6. In the following screen enter the full path to the `mentorapp.keystore`. It is located in the repo folder, should be in `/android/app/mentorapp.keystore`. Below that enter your credentials for all 3 fields. If you don't have credentials ask the dev team. Click Next.
7. In the next screen make sure you take a not of the destination folder, which should be `/android/app` in most cases. The build will generate in a `release` folder in the above directory. Check both checkboxes at the bottom of this screen. Click Finish.
8. Wait for the build to finish and then check the contents of the destination folder from the previous step. If there were no errors there should be a `app-release.apk` file in the release folder. We will try to add any possible build errors to this file as we encounter them.
9. Go to [Google Play Console](https://play.google.com/apps/publish/).
10. Select Poverty Stoplight Mentor App.
11. Select Release Management > App Releases.
12. Scroll down to Internal Test Track and click Manage on the right.
13. Click Create Release at the top (it may be displayed as Edit Release).
14. In the next screen click Browse Files and navigate to the `app-release.apk` file in the release folder you saw at step 8.
15. After the file is selected on the same screen make sure that in the section at the bottom labeled `What's new in this release?` you change up the text a bit. You can do any small change. Aslo check if the `Release name` is the version you put in step 1.
16. Finaly, hit Review.
