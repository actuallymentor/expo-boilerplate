import { user, settings } from '../src/modules/dummy-data'
class Firebase {

	// Helpers
	isOnline = async f => true

	// ///////////////////////////////
	// User actions
	// ///////////////////////////////
	registerUser  = async f => user
	loginUser     = async f => user
	updateUser	  = async f => user
	logout		  = async f => user
	deleteUser	  = async f => user
	resetPassword = async f => user

	// ///////////////////////////////
	// Settings
	// ///////////////////////////////
	updateSettings = async f => settings

	// ///////////////////////////////
	// friends
	// ///////////////////////////////
	getRandomPeople = async f => [ user ]
	followPerson 	= async f => user
	unfollowPerson 	= async f => user
	findPerson      = async f => user
	getPerson 		= async f => user
	blockPerson 	= async f => user
	unblockPerson 	= async f => user
	
	// ///////////////////////////////
	// Initialisation
	// ///////////////////////////////

	// Register user listener in a promise wrapper that resolved when initial auth state is received
	init = async history => {

		// Keep a reference to the history object
		if( history ) this.history = { push: f => f }
	
	}
}

const mocked = new Firebase()

jest.mock( `${__dirname}/../src/modules/firebase/app`, ( ) => ( {
	__esModule: true,
	default: mocked
} ) )