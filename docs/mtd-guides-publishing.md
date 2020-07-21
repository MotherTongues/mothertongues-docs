---
id: mtd-guides-publishing
title: Publishing your dictionary
---

*These guides assume you are comfortable with the [Command Line](https://en.wikipedia.org/wiki/Command-line_interface), [Git](https://en.wikipedia.org/wiki/Git), [Python](https://en.wikipedia.org/wiki/Python_(programming_language)) and [NPM](https://en.wikipedia.org/wiki/Npm_(software)). You must have all of these installed on your machine. You are also strongly encouraged to have a [GitHub](https://github.com) account. You are encouraged to fork or clone the [Mother Tongues Dictionary Starter](https://github.com/roedoejet/mtd-starter) and follow along.*

The simplest way to publish your app is on the web. Publishing to the Android and iOS app stores is an involved process. If you're just starting out, it's highly recommended that you start with the web or mobile (GitHub Pages) deployments first before publishing to Android or iOS.

To get started, you'll need to have [prepared](mtd-guides-prepare) and
[built](mtd-guides-ui) your dictionary.

:::note
This process for building apps, and the complexity that comes with it, is just a fact of app-building and would be the same for any other dictionary app you build. Sorry! Don't be mad at Mother Tongues! 😃
:::

## Mobile

Because the [mobile MTD UI](https://github.com/roedoejet/mothertongues-ui) is built with [Ionic](https://ionicframework.com/), the code base stays the same for both Android and iOS builds. Therefore some of the changes only need to be done once.

### File Structure

Note, the following is an *incomplete* look at the file structure of a typical [mobile MTD UI](https://github.com/roedoejet/mothertongues-ui). When you clone/fork it, there will be other files/folders. For the purpose of this guide, these are the ones you will need to know about.

```
📦mothertongues-UI
 ┣ 📂plugins
 ┣ 📂resources
 ┃ ┣ 📜icon.png
 ┃ ┗ 📜splash.png
 ┣ 📂src
 ┣ 📂www
 ┣ 📜config.xml
 ┣ 📜package.json
```

### Cordova Configuration

Information about your app is kept in the `config.xml` file at the root of your [project](#file-structure). The vast majority of this, you will never need to edit, although you can read more about Cordova configuration [here](https://cordova.apache.org/docs/en/latest/config_ref/) if you're curious.

The parts you will need to edit are at the very beginning of the file:

```xml {3-6,9,11-12}
<?xml version='1.0' encoding='utf-8'?>
<widget 
        android-packageName="com.YOUR_ORGANIZATION.YOUR_APP_SLUG" 
        android-versionCode="10000" 
        ios-CFBundleIdentifier="com.YOUR_ORGANIZATION.YOUR_APP_SLUG" 
        version="1.0"
        xmlns="http://www.w3.org/ns/widgets" 
        xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>Ehattesaht</name>
    <description />
    <author email="info@mothertongues.org" 
            href="http://mothertongues.org/">Aidan Pine</author>
    <content src="index.html" />
    ...
```

#### Bundle ID

First, change the [bundle identifiers](https://stackoverflow.com/questions/11347470/what-does-bundle-identifier-mean-in-an-ios-project) for all the platforms you wish to build. For Android change `android-packageName` and for iOS, change `ios-CFBundleIdentifer`. 

:::important
Pay attention to give your bundle ids appropriate names - you cannot change them once you've published the app. I suggest keeping the identifiers the same for both Android and iOS if possible.
:::

#### Version

For iOS, you can set the version by changing `version`, but for Android, you change it by changing `android-versionCode`.

:::note
The `version` attribute accepts decimal values, but the `android-versionCode` requires 5 digit integers.
:::

#### Name

Change your app's name by editing the text inside the `name` element highlighted above.

:::note
You may have trouble uploading your app if you use certain non-ASCII characters. Frustratingly, the full list of accepted characters does not seem to be published.
:::

#### Author

You can change your email, website and name as the author by editing the `author` element highlighted above.

### Resources

Ionic will generate all of the different sizes you need for your App's icon and splash screen, but you need to first provide it with templates.

Your source image for icons should be at least 1024x1024 and your splash screen artwork should be 2732x2732. For more information please see [Ionic's documentation](https://ionicframework.com/docs/cli/commands/cordova-resources).

Once you've moved your `icon.png` and `splash.png` files to your
`~/mothertongues-UI/resources` directory, you can generate all of the necessary icon and splash image sizes:

`ionic cordova resources`

### GitHub Pages

There is a built version of the app in [mothertongues-ui/www](#file-structure) - just replace the `mothertongues-ui/www/assets/js/config.js` and `mothertongues-ui/www/assets/js/dict_cached.js` files with your [exported data](mtd-guides-ui#exporting-your-data), commit and push the changes, and then [turn on GitHub Pages](https://docs.github.com/en/enterprise/2.14/user/articles/configuring-a-publishing-source-for-github-pages#:~:text=On%20GitHub%20Enterprise%2C%20navigate%20to,Click%20Save) and your app will be published online.

### Android

 `ionic cordova platform add android`

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

`ionic cordova platform add ios`

Build your iOS app:

`ionic cordova build ios --release`

Then you can use Xcode to sign and upload your app to the App Store.
Before doing this, you must [sign
up](https://developer.apple.com/programs/enroll/) and create an app in
iTunes Connect, and you must create a Distribution Certificate for your
app.

## Web

Building your web version is much less involved than building an app, so if this is all you need, count yourself lucky!

### GitHub Pages

### Custom hosting