// Register a new user by email and password
export const registerUser = async ( app, name, email, password ) => {

	try {
		// Create account
		await app.auth.createUserWithEmailAndPassword( email, password )
		// Get current user
		const user = app.auth.currentUser
		// Update profile to include name
		await user.updateProfile( {
			displayName: name
		} )
		// Set user to app licat prop
		app.user = app.auth.currentUser
	} catch( e ) {
		throw e
	}

}

// Log in the user, this will trigger the user object listener
export const loginUser = async ( auth, email, password ) => auth.signInWithEmailAndPassword( email, password )

// Update the user profile and return the new user object to store
export const updateUser = async ( auth, displayName, photoURL, dispatch, action ) => ( displayName || photoURL ) && auth.currentUser.updateProfile( {
	...( displayName && { displayName: displayName } ),
	...( photoURL && { photoURL: photoURL } )
} ).then( f => dispatch( action( auth.currentUser ) ) )

// Get tehe current user
export const getUser = app => app.user

// Logout
export const logoutUser = auth => auth.signOut()

// Delete
export const deleteUser = auth => auth.currentUser.delete()