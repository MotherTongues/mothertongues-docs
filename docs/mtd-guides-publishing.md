---
id: mtd-guides-publishing
title: Publishing your dictionary
---

### Publishing your Mother Tongues Dictionary

The simplest way to publish your app is on the web. This guide is for
publishing the more advanced iOS and Android apps, which, honestly, is a
pain. This isn\'t specific to Mother Tongues though - this is just the
normal process for publishing apps.

To get started, you\'ll need to have [prepared](#schema-validation),
[built](#building-a-dictionary) and made any
[adjustments](#adding-a-user-interface) to the UI of your dictionary.

Then, you can add the cordova platforms:

`ionic cordova platform add ios` `ionic cordova platform add android`

Then, move your `icon.png` and `splash.png` files to your
`~/mothertongues-UI/resources` directory.

Then, generate all of the necessary icon and splash image sizes:
`ionic cordova resources`.

Then, edit your [\~/mothertongues-UI/config.xml]{.title-ref} file to
have your App name and version/build version.

### Android 

Build and sign your android app:

`ionic cordova build android --release`

Your app will then be built at
`~/mothertongues-UI/resources/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk`.

Then, sign your app,
`jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore "your.keystore" "~/mothertongues-UI/resources/platforms/android/app/build/outputs/apk/release//app-release-unsigned.apk" alias_name`

Then, zip-align your app,
`zipalign -v 4 "~/mothertongues-UI/resources/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk" "~/mothertongues-UI/resources/platforms/android/app/build/outputs/apk/release/release.apk"`

Then, you can [sign up for a Google Play Developer
Account](https://support.google.com/googleplay/android-developer/answer/6112435?hl=en).

Then, create a new app and upload your
`~/mothertongues-UI/resources/platforms/android/app/build/outputs/apk/release/release.apk`
file.

### iOS

Build your iOS app:

`ionic cordova build ios --release`

Then you can use Xcode to sign and upload your app to the App Store.
Before doing this, you must [sign
up](https://developer.apple.com/programs/enroll/) and create an app in
iTunes Connect, and you must create a Distribution Certificate for your
app.