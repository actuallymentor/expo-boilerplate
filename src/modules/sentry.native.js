import * as Sentry from 'sentry-expo'
import { SENTRY_DSN } from 'react-native-dotenv'

if( SENTRY_DSN && process.env.NODE_ENV != 'development' ) Sentry.init( {
  dsn: SENTRY_DSN
} )