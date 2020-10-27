// This file governs the ncu utility that does auto upgrades
{
  "upgrade": true,
  "reject": [
    "react-native-dotenv" // Version 0.2.0 is fine, anything above that changes structure and does not work with expo web
  ]
}