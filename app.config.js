// ///////////////////////////////
// Application config
// ///////////////////////////////
// The google json/plist are for fireebase native configs
require('dotenv').config()


// Firebase config
const { FIREBASE_apiKey, FIREBASE_authDomain, FIREBASE_databaseURL, FIREBASE_projectId, FIREBASE_storageBucket, FIREBASE_messagingSenderId, FIREBASE_appId, FIREBASE_measurementId } = process.env
const firebaseConfig = {
  apiKey: FIREBASE_apiKey,
  authDomain: FIREBASE_authDomain,
  databaseURL: FIREBASE_databaseURL,
  projectId: FIREBASE_projectId,
  storageBucket: FIREBASE_storageBucket,
  messagingSenderId: FIREBASE_messagingSenderId,
  appId: FIREBASE_appId,
  measurementId: FIREBASE_measurementId
}

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
    description: "A boilerplate for cross platform expo apps",
    "slug": "expo-boilerplate",
    "privacy": "public",
    "version": `${conf.version}.0.0`,
    "scheme": conf.bundle, // ⚠️ appname # Will be used as appname://

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
      "googleServicesFile": `./GoogleService-Info${ conf.dev ? '-development' : '' }.plist`,
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
      "googleServicesFile": `./google-services${ conf.dev ? '-development' : '' }.json`,
      // adaptiveIcon: {
        // Both layers must be sized at 108 x 108 dp.
        // The inner 72 x 72 dp of the icon appears within the masked viewport.
      //   foregroundImage: "./assets/icon/acorn_transparent_bg_512.png",
      //   backgroundColor: "#808080"
      // },
    },

    // ///////////////////////////////
    // Web settings
    // ///////////////////////////////
    web: {
      config: {
        firebase: firebaseConfig
      }
    },

    //////////////////
    // Sentry config
    //////////////////
    "hooks": {
      "postPublish": [
        {
          "file": "sentry-expo/upload-sourcemaps"
        }
      ]
    },

    // Metro config
    "packagerOpts": {
      "config": "metro.config.js",
      "sourceExts": [
        "expo.ts",
        "expo.tsx",
        "expo.js",
        "expo.jsx",
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "wasm",
        "svg"
      ]
    }
    
  }
}
