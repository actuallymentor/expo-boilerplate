// import * as firebase from 'firebase'
import  firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/functions'

// Helpers
import { dev, isWeb } from '../apis/platform'

// Analytics
import * as Analytics from 'expo-firebase-analytics'
// If dev, keep analytics in dev
if( !isWeb && dev ) Analytics.setDebugModeEnabled( true )

// Redux
import { store } from '../../redux/store'
const { dispatch } = store

// Actions
import { setUserAction } from '../../redux/actions/userActions'

// Config
import config from './config'

// Functions
import { unregisterListeners, registerListeners } from './_listeners'
import { listenUserLogin, listenUserChanges, registerUser, loginUser, updateUser, resetPassword, logoutUser, deleteUser } from './_user'

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
	analytics   = Analytics

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

	// Register user listener in a promise wrapper that resolved when initial auth state is received
	init = f => new Promise( resolve => {

		this.listeners.auth = listenUserLogin( this, dispatch, setUserAction, resolve, [
			{ name: 'profile', listener: listenUserChanges, action: setUserAction }
		] )

	} )

	
	

}

export default new Firebase()