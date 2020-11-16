// This file governs the ncu utility that does auto upgrades
module.exports = {
  // "upgrade": false,
  "reject": [
    "react-native-dotenv", // Version 0.2.0 is fine, anything above that changes structure and does not work with expo web
    "history", // History of router v5 is nto yet compatible with history v5
    "react",
    "react-native", // Managed by expo
    "react-native-web", // managed by expo
  ]
}