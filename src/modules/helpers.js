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