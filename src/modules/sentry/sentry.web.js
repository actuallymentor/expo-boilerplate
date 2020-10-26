import * as Sentry from '@sentry/browser'
import { SENTRY_DSN } from '@env'

const SentryInit = f => {
	if( SENTRY_DSN ) Sentry.init( {
	  dsn: SENTRY_DSN
	  // enableInExpoDevelopment: true
	} )
}

export default SentryInit