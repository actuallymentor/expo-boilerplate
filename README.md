# Expo boilerplate

Boilerplate is compatible with android, ios and web.

Start with `npm run android/ios/web`.

Testing: `npm test` based on Jest.

## To implement

Based on your app you will have to edit:

- `modules/push.js` to implement `savePushToken` based on your needs

## While developing

- `npm run refresh` to kill expo client through adb on Android
- `npm run stage` to deploy to staging channel

## Environment variables

Environment variables in `.env` file are mandatory. Empty strings are allowed (and disable the service). You may use a separate `.env.production`. There is an overview of variables in the `.env.example` file.