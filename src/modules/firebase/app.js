// import * as firebase from 'firebase'
import  firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/functions'

// Redux
import { store } from '../../redux/store'
const { dispatch } = store

// Actions
import { setUserAction } from '../../redux/actions/userActions'

// Config
import config from './config'

// Functions
import { listenForUserAndStartListeners, unregisterListeners, registerListeners } from './listeners'
import { listenUserLogin, listenUserChanges, registerUser, loginUser, updateUser, resetPassword, logoutUser, deleteUser } from './user'

// ///////////////////////////////
// Firebase manager class
// ///////////////////////////////
class Firebase {

	// ///////////////////////////////
	// Set up firebase
	// ///////////////////////////////
	fb 			= firebase.initializeApp( config )
	db 			= this.fb.firestore()
	storage 	= this.fb.storage().ref()
	func 		= this.fb.functions()
	auth 		= this.fb.auth()
	listeners 	= {}

	// ///////////////////////////////
	// User actions
	// ///////////////////////////////
	registerUser  = ( name, email, pass ) => registerUser( this, name, email, pass )
	loginUser     = ( email, pass ) => loginUser( this.auth, email, pass )
	updateUser	  = userUpdates => updateUser( this, userUpdates )
	logout		  = f => logoutUser( this.auth )
	deleteUser	  = f => deleteUser( this.auth )
	resetPassword = email => resetPassword( this.auth, email )

	// ///////////////////////////////
	// Initialisation
	// ///////////////////////////////

	// Register user listener, if no user reset the app
	// init = f => listenForUserAndStartListeners( this, dispatch, setUserAction, resetApp )
	init = f => this.listeners.auth = listenUserLogin( this, dispatch, setUserAction, [
		{ name: 'profile', listener: listenUserChanges, action: setUserAction }
	] )

	
	

}

export default new Firebase()