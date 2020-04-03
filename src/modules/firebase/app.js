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
import { resetApp } from '../../redux/actions/settingsActions'
import { setUserAction } from '../../redux/actions/userActions'

// Config
import config from './config'

// Functions
import { listenForUserAndStartListeners, unregisterListeners, addListener } from './listeners'
import { registerUser, loginUser, getUser, updateUser, logoutUser, deleteUser } from './user'

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
	getUser		  = f => getUser( this )
	registerUser  = ( name, email, pass ) => registerUser( this, name, email, pass )
	loginUser     = ( email, pass ) => loginUser( this.auth, email, pass )
	updateUser	  = ( name, photoUrl ) => updateUser( this.auth, name, photoUrl, dispatch, setUserAction )
	logout		  = f => logoutUser( this.auth )
	deleteUser	  = f => deleteUser( this.auth )

	// ///////////////////////////////
	// Initialisation
	// ///////////////////////////////

	// Register user listener, if no user reset the app
	init = f => listenForUserAndStartListeners( this, dispatch, setUserAction, resetApp )

	
	

}

export default new Firebase()