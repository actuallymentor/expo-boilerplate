export function unregisterListeners( listeners ) {

	for( let key in listeners ) {
		listeners[ key ]()
		delete listeners[ key ]
	}

}

export async function registerListeners( app ) {

	// Register listeners if they do not yet exist
	// if( !app.listeners.thing ) app.listeners.thing = listenForthing()

}

export const listenForUserAndStartListeners = ( app, dispatch, onLoginAction, onLogoutAction ) => {
	// Listen to the user object
	return app.auth.onAuthStateChanged( user => {

		// Set user to internal property
		app.user = user

		// Register listeners if we are logged in
		if( user ) {
			registerListeners( app )
			return dispatch( onLoginAction( {
				email: user.email,
				name: user.displayName,
				avatar: user.profileUrl
			} ) )
		}

		// Unregister listeners and reset app if we are not logged in
		if( !user ) {
			unregisterListeners( app.listeners )
			return dispatch( onLogoutAction( ) )
		}
	} )
}