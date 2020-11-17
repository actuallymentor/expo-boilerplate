import * as ExpoSentry from 'sentry-expo'
import { isWeb } from './platform'
import { SENTRY_DSN } from '@env'

export const SentryInit = f => {
	if( SENTRY_DSN ) ExpoSentry.init( {
	  dsn: SENTRY_DSN
	  // enableInExpoDevelopment: true
	} )
}

export const Sentry = isWeb ? ExpoSentry.Browser : ExpoSentry.Native