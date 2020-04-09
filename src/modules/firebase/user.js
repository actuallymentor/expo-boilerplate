import { catcher } from '../helpers'
import { dataFromSnap } from './helpers'
import { resetApp } from '../../redux/actions/settingsActions'
import { unregisterListeners, registerListeners } from './listeners'


// ///////////////////////////////
// Listeners
// ///////////////////////////////

// Listen to user authentication
export const listenUserLogin = ( app, dispatch, action, listeners ) => {
	// Listen to the user object
	return app.auth.onAuthStateChanged( async user => {

		// Register listeners if we are logged in
		if( user ) {
			registerListeners( app, dispatch, listeners )
			return dispatch( action( await getUserProfile( app.db, user ) ) )
		}

		// Unregister listeners and reset app if we are not logged in
		if( !user ) {
			unregisterListeners( app.listeners )
			return dispatch( resetApp( ) )
		}

	} )
}

// Listen to user changes
export const listenUserChanges = ( app, dispatch, action ) => {

	app.db.collection( 'users' ).doc( app.auth.currentUser.uid ).onSnapshot( doc => {

		return dispatch( action( {
			email: app.auth.currentUser.email,
			...dataFromSnap( doc ) 
		} ) )

	} )

}

// ///////////////////////////////
// User actions
// ///////////////////////////////

// Register a new user by email and password
export const registerUser = async ( app, name, email, password ) => {

	try {
		// Create account
		await app.auth.createUserWithEmailAndPassword( email, password )

		// Update profile to include name, this also triggers redux
		await app.updateUser( {
			name: name
		} )
	} catch( e ) {
		catcher( e )
	}

}

// Log in the user, this will trigger the user object listener
export const loginUser = async ( auth, email, password ) => auth.signInWithEmailAndPassword( email, password )

// Update the user profile and return the new user object to store
export const updateUser = async ( app, userUpdates ) => {

	let { uid, email, newpassword, currentpassword, newavatar, avatar, ...updates } = userUpdates

	try {

		// If email change was requested, set to firebase auth object
		if( email && currentpassword ) {
			await app.loginUser( app.auth.currentUser.email, currentpassword )
			await app.auth.currentUser.updateEmail( email )
		}
		if( newpassword && currentpassword ) {
			await app.loginUser( app.auth.currentUser.email, currentpassword )
			await app.auth.currentUser.updatePassword( newpassword )
		}

		// If new file was added
		if( newavatar ) {

			// Upload new file
			const { ref } = await app.storage.child( newavatar.path ).putString( newavatar.uri, 'data_url' )
			const url = await ref.getDownloadURL()
			updates.avatar = {
				url: url,
				path: newavatar.path
			}
			// Delete old file
			if( avatar ) await app.storage.child( avatar.path ).delete()
		}

		// Set other properties to store
		await app.db.collection( 'users' ).doc( app.auth.currentUser.uid ).set( {
			...updates,
			updated: Date.now()
		}, { merge: true } )


	} catch( e ) {
		throw e
	}

}

// Get user profile
export const getUserProfile = async ( db, user ) => ( {
	uid: user.uid,
	email: user.email,
	...( await db.collection( 'users' ).doc( user.uid ).get().then( doc => doc.data() ).catch( f => ( { } ) ) )
} )

// Logout
export const logoutUser = auth => auth.signOut()

// Delete
export const deleteUser = auth => auth.currentUser.delete()