import { catcher, log } from '../helpers'
import { dataFromSnap } from './helpers'
import { resetApp } from '../../redux/actions/settingsActions'
import { unregisterListeners, registerListeners } from './_listeners'


// ///////////////////////////////
// Listeners
// ///////////////////////////////

// Listen to user authentication
export const listenUserLogin = ( app, dispatch, action, listeners ) => new Promise( resolve => {
	// Listen to the user object
	const authListener = app.auth.onAuthStateChanged( async user => {

		try {

			// Register listeners if we are logged in
			if( user ) {
				registerListeners( app, dispatch, listeners )

				const profile = await getUserProfile( app.db, user )
				await dispatch( action( profile ) )
				
			}

			// Unregister listeners and reset app if we are not logged in
			if( !user ) {
				unregisterListeners( app.listeners )
				await dispatch( resetApp( ) )
			}

			// Resolve when done
			resolve( authListener )

		} catch( e ) {
			log( 'Auth listener error', e )
			alert( 'Authentication error' )
		}

	} )
} ) 

// Listen to user changes
export const listenUserChanges = ( app, dispatch, action ) => app.db.collection( 'users' ).doc( app.auth.currentUser.uid ).onSnapshot( doc => {

	return dispatch( action( {
		email: app.auth.currentUser.email,
		...dataFromSnap( doc ) 
	} ) )

} )

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

	let { uid, email, newpassword, currentpassword, newavatar, oldavatar, ...updates } = userUpdates
	const { currentUser } = app.auth
	
	try {

		// If this is a sensitive change, reauthenticate
		if( currentpassword ) {
			const { EmailAuthProvider } = app.Auth
			await currentUser.reauthenticateWithCredential( EmailAuthProvider.credential( currentUser.email, currentpassword ) )
		}

		// If email change was requested, set to firebase auth object
		if( email && currentpassword ) {
			await currentUser.updateEmail( email )
		}
		if( newpassword && currentpassword ) {
			await currentUser.updatePassword( newpassword )
		}

		// If new file was added
		if( newavatar ) {

			// Upload new file
			const { ref } = await app.storage.child( newavatar.path ).put( newavatar.blob )
			const url = await ref.getDownloadURL()
			updates.avatar = {
				uri: url,
				path: newavatar.path
			}
			// Delete old file
			if( oldavatar ) await app.storage.child( oldavatar.path ).delete().catch( e => log( e ) )
		}

		// Set other properties to store
		await app.db.collection( 'users' ).doc( currentUser.uid ).set( {
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

// Recover password
export const resetPassword = ( auth, email ) => auth.sendPasswordResetEmail( email )

// Logout
export const logoutUser = async app => {
	const { auth, listeners } = app
	unregisterListeners( listeners )
	await auth.signOut()
}

// Delete
export const deleteUser = async ( app, password ) => {

	const { auth, db, FieldValue } = app
	const { currentUser } = auth
	const { EmailAuthProvider } = app.Auth

	try {

		await currentUser.reauthenticateWithCredential( EmailAuthProvider.credential( currentUser.email, password ) )

		await Promise.all( [
			db.collection( 'settings' ).doc( currentUser.uid ).delete(),
			db.collection( 'users' ).doc( currentUser.uid ).delete(),
			db.collection( 'userMeta' ).doc( currentUser.uid ).delete(),
			db.collection( 'specialPowers' ).doc( currentUser.uid ).delete(),
		] )

		await auth.currentUser.delete()

	} catch( e ) {
		log( 'Deletion error: ', e )
		throw e.message
	}

} 