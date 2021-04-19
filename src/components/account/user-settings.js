import React, { useState, useEffect } from 'react'

// Visual
import { Container, Main, View, Card, Title, Input, Button, Link } from '../common/generic'
import ImagePicker from '../common/image-picker'
import Navigation from '../common/navigation'
import * as ImageManipulator from "expo-image-manipulator"

// Functionality
import { log, catcher, getuid, Dialogue } from '../../modules/helpers'
import app from '../../modules/firebase/app'
import { useHistory } from '../../routes/router'
import { useSelector } from 'react-redux'


// ///////////////////////////////
// Render component
// ///////////////////////////////
export default function UserSettings( { avatarSize=100 } ) {

	const history = useHistory()
	const user = useSelector( store => store.user || {} )

	// ///////////////////////////////
	// State handling
	// ///////////////////////////////
	const [ passwordRequired, setPasswordRequired ] = useState( false )
	const [ loading, setLoading ] = useState( false )
	const [ userState, setUser ] = useState( user )
	const changeUser = ( key, value ) => {
		setUser( prev => ( { ...prev, [key]: value } ) )
		
	}

	// Update internal state as redux updates
	useEffect( f => setUser( { ...userState, ...user } ), [ user ] )
	// Update password sensitivity on input
	useEffect( f => setSensitiveStatus(), [ userState ] )

	// ///////////////////////////////
	// Comppnent functions
	// ///////////////////////////////
	function setSensitiveStatus() { 

		const oldUser = user

		if( userState.email && ( userState.email != oldUser.email ) || userState.newpassword || userState.deleteAccount ) return setPasswordRequired( true )
		if( passwordRequired ) return setPasswordRequired( false )

	}
	async function saveChanges() {

		const { uid } = userState

		// Avatar processing
		if( userState.newavatar ) {

			// Check if extension is valid
			const dataUriExt = userState.newavatar.uri.match( /(?:image\/)(.*)(?:;)/ )
			const extension = dataUriExt ? dataUriExt[1] : 'jpg'
			if( ![ 'png', 'jpg', 'jpeg' ].includes( extension ) ) return alert( 'Please select a png or jpg image.' )

			// Compress the image
			const resize = [ { resize: { width: 500, height: 500 } } ]
			const options = { compress: .8 }
			userState.newavatar = await ImageManipulator.manipulateAsync( userState.newavatar.uri, resize, options )

			// Create file blob for upload
			const file = await fetch( userState.newavatar.uri )
			userState.newavatar.blob = await file.blob()

			// If extension valid, add path to avatar, extension is always jpg because of the image manipulator's jpeg output
			const path = `avatars/${ uid }-${ await getuid() }.jpg`
			userState.newavatar.path = path
		}

		setLoading( 'Saving...' )

		try {
			await app.updateUser( userState )
		} catch( e ) {
			catcher( e )
		} finally {
			setLoading( false )
			setPasswordRequired( false )
		}

	}
	async function deleteAccount() {

		const deleteAndLogout = async f => {

			if( !userState.currentpassword ) return Dialogue( 'Missing data', 'Please fill in your current password' )

			try {
				await app.deleteUser( userState.currentpassword )
				await Dialogue( 'It was fun having you', 'Your account no longer exists. Goodbye 😢' )
				await app.logout()
			} catch( e ) {
				await Dialogue( 'Something went wrong', e )
				catcher( e )
			}

		}

		try {

			await Dialogue( 'Permanently delete account?', 'This CANNOT BE UNDONE!', [ {
				text: 'Yes, delete my account permanently',
				onPress: deleteAndLogout
			}, {
				text: `Noooo! Don't do it!`,
				onPress: async f => changeUser( 'deleteAccount', false )
			} ] )

		} catch( e ) {
			catcher( e )
			await Dialogue( 'Error: ', e )
		}

	}

	// ///////////////////////////////
	// Render component
	// ///////////////////////////////
	return <Container>
		<Navigation title='User settings' />
		<Main.Center>
			<View style={ { paddingVertical: avatarSize/2 } }>
				<Card nativeID='settings-account' style={ { paddingTop: 0 } } >
					<ImagePicker image={ userState.newavatar || userState.avatar } size={ avatarSize } style={ { marginTop: -avatarSize/2, marginBottom: 20 } } onSelected={ image => changeUser( 'newavatar', image ) } />
					<Title style={ { textAlign: 'center' } }>{ userState.name || userState.email }'s settings</Title>
					<Input label='name' value={ userState.name } onChangeText={ t => changeUser( 'name', t ) } />
					<Input label='email' value={ userState.email } onChangeText={ t => changeUser( 'email', t ) } />
					<Input secureTextEntry label='new password' value={ userState.newpassword || '' } onChangeText={ t => changeUser( 'newpassword', t ) } />
					{ passwordRequired && <React.Fragment>
						<Input nativeID='settings-currentpassword' secureTextEntry label='current password (required)' value={ userState.currentpassword || '' } onChangeText={ t => changeUser( 'currentpassword', t ) } />
					</React.Fragment> }
					<Button onPress={ saveChanges }>{ loading || 'Save changes' }</Button>
					<DeleteAccount confirmIntent={ f => changeUser( 'deleteAccount', true ) } deleteAccount={ deleteAccount } />
				</Card>
			</View>
		</Main.Center>
	</Container>

}

const DeleteAccount = ( { confirmIntent, deleteAccount } ) => {

	const [ iamsure, toggleIamsure ] = useState( false )
	const confirm = f => {
		toggleIamsure( true )
		confirmIntent( )
	}

	if( !iamsure ) return <Link nativeID='settings-triggerdelete' underline={ false } style={ { color: 'red', marginTop: 20, textAlign: 'center' } } onPress={ confirm }>Delete account</Link>
	return <Button nativeID='settings-confirmdelete' onPress={ deleteAccount } icon='alert-outline'>Confirm account deletion</Button>
}
