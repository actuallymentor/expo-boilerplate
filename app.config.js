// ///////////////////////////////
// Application config
// ///////////////////////////////
// The google json/plist are for fire base native configs
// you'll also need to set the web.config.firebase

// Vars
const conf = {
  dev: process.env.development,
  bundle: 'com.org.appname', // ⚠️ Reverse DNS, same as android
  version: 1, // ⚠️ Update on build
}

export default {
  "expo": {

    // App meta
    "name": "Expo Boilerplate",
    "slug": "expo-boilerplate",
    "privacy": "public",
    "version": `${conf.version}.0.0`,
    "scheme": "", // ⚠️ appname # Will be used as appname://

    // Cross platform config
    "platforms": [
      "ios",
      "android",
      "web"
    ],
    
    // Visual settings
    "orientation": "default",
    "icon": "./assets/icon.png", // ⚠️ Globally set
    "splash": {
      "image": "./assets/splash.png", // ⚠️ Must be png
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },

    // Expo configs
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "hooks": {
      "postPublish": [
        {
          "file": "sentry-expo/upload-sourcemaps"
        }
      ]
    },

    // ///////////////////////////////
    // IOS settings
    // ///////////////////////////////
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": conf.bundle,
      "buildNumber": `${conf.version}.0.0`,
      // "googleServicesFile": `./GoogleService-Info${ conf.dev ? '-development' : '' }.plist`,
      // infoPlist: {
      //   NSCameraUsageDescription: "Camera permission is used to take a new photo to use as your profile picture.",
      // },
    },

    // ///////////////////////////////
    // Android settings
    // ///////////////////////////////
    "android": {
      "package": conf.bundle,
      "versionCode": conf.version, // ⚠️ Update on build
      "permissions": [],
      // "googleServicesFile": `./google-services${ conf.dev ? '-development' : '' }.json`,
      // adaptiveIcon: {
      //   foregroundImage: "./assets/icon/acorn_transparent_bg_512.png",
      //   backgroundColor: "#808080"
      // },
    },

    // ///////////////////////////////
    // Web settings
    // ///////////////////////////////
    web: {
      config: {
        // firebase: firebaseConfig
      }
    },
    
  }
}
