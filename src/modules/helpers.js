import { Alert as NativeAlert } from 'react-native'

export const Dialogue = ( title, message, options=[ { text: 'ok', onPress: f => Promise.resolve() } ] ) => new Promise( resolve => {

	// Option has text and onpress
	NativeAlert.alert(
		title,
		message,
		options.map( option => ( { ...option, onPress: f => option.onPress && option.onPress().then( res => resolve( res ) ) } ) ),
		{ cancelable: true }
	 )

} )

export const wait = ( time, error=false ) => new Promise( ( res, rej ) => setTimeout( error ? rej : res, time ) )

export const log = msg => {
	if( process.env.NODE_ENV == 'development' ) console.log( msg )
}

export const error = msg => {
	if( process.env.NODE_ENV == 'development' ) {
		console.log( msg )
		console.trace()
	}
}

export const catcher = e => {
	log( e )
	// throw to sentry
	throw e
}

export const capitalize = string => string ? string.charAt(0).toUpperCase() + string.slice(1) : undefined