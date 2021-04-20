# Expo boilerplate

Boilerplate is compatible with android, ios and web.

## Requirements

- Node.js version 14 (use [nvm](https://github.com/nvm-sh/nvm))
- [Expo client]( https://expo.io/tools )

## Setup

This setup assumes you have 2 firebase projects, one for development and one for production.

- Clone this repo
- Run `npm i `
- Run `create 2 firebase projects`
- Add local secret files (`firebase>project>settings>general>your apps>download`)
    + ./firebase-staging.json
    + ./firebase-production.json
    + google-services.json
    + google-services-development.json
    + GoogleService-Info.plist
    + GoogleService-Info-development.plist
- Configure local `.env` (see environment variables section)
- Configure remote secrets in Github
    + DOTENV_PRODUCTION
    + DOTENV_DEVELOPMENT
    + GOOGLE_SERVICES_JSON
    + GOOGLE_SERVICES_JSON_DEVELOPMENT
    + GOOGLE_SERVICES_PLIST
    + GOOGLE_SERVICES_PLIST_DEVELOPMENT
    + EXPO_USERNAME
    + EXPO_PASSWORD
    + FIREBASE_TOKEN
- Configure firebase projects in `./.firebaserc`
- Create 2 branches (both have GH actions)
    + master
    + development
- ( optional ) edit `app.config.js`
    + Custom icon
    + Custom name/slug
    + Custom splash background color

## Usage

- Install `npm i -g expo-cli`
- Log into expo with `expo login`
- Start with `npm run android/ios/web`

To preview app on phone, use the Expo app.

### Firebase security & indexes

While developing, make sure to update these files so that you don't get "missing permissions" or "missing index" errors:

- `firestore.rules`
- `sturage.rules`
- `firestore.indexes.json`

After that make sure to run `firebase:deploy:development` to sent the rules to remote.

### Testing

Testing: `npm test` based on Jest.

### To implement

Based on your app you will have to edit:

- `modules/push.js` to implement `savePushToken` based on your needs
- Make sure to add firebase configs in app config to enable analytics

### Helpers

- `npm run refresh` to kill expo client through adb on Android
- `npm run publish:development` to deploy to development channel


### Environment variables

Environment variables in `.env` file are mandatory. Empty strings are allowed (and disable the service). You may use a separate `.env.production`. There is an overview of variables in the `.env.example` file.