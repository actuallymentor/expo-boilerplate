import React, { useState } from 'react'
import { View } from 'react-native'
import { Container, Main, Card, Input, Button, Divider, Text, Checkbox, Link } from '../common/generic'
import Navigation from '../common/navigation'

// Functionality
import { log } from '../../modules/helpers'
import app from '../../modules/firebase/app'
import { useHistory } from '../../routes/router'



// ///////////////////////////////
// Render component
// ///////////////////////////////
export default function LoginRegistration( ) {

	const history = useHistory()

	// ///////////////////////////////
	// State handling
	// ///////////////////////////////
	const [ loading, setLoading ] = useState( false )

	const [ input, setInput ] = useState( {} )
	const onInput = ( key, value ) => setInput( prev => ( { ...prev, [key]: value } ) )

	const [ action, setAction ] = useState( 'login' )

	// ///////////////////////////////
	// Component functions
	// ///////////////////////////////
	function validate( { email, password, name, toc } ) {

		if( !email ) return 'Please fill in your email address'
		if( action != 'recover' && !password ) return 'Please fill in your password'
		if( action == 'register' && !name ) return 'Please fill in your name'
		if( action == 'register' && !toc ) return 'Please accept the terms and conditions'
		return false
	}

	async function onSubmit( ) {

		// Validate input
		const missing = validate( input )
		if( missing ) return alert( missing )
		const { name, email, password, toc } = input

		try {

			// Take the relevant backend action
			if( action == 'login' ) {
				setLoading( 'Logging you in' )
				await app.loginUser( email.trim(), password )
			}

			if( action == 'register' ) {
				setLoading( 'Registering your account' )
				await app.registerUser( name.trim(), email.trim(), password )
			}
			if( action == 'recover' ) {
				setLoading( 'Recovering your account' )
				await app.resetPassword( email.trim() )
			}

			// On success, redirect user
			return history.push( '/user/settings' )

		} catch( e ) {

			// On error, log it, and display to user
			log( e )
			alert( e )
			setLoading( false )
		}

	}

	// ///////////////////////////////
	// Render component
	// ///////////////////////////////
	return <Container>
		<Navigation />
		<Main.Center>
			<Card>

				{ /* User input */ }
				{ action == 'register' && <Input nativeID='loginreg-name' autoCompleteType='name' onSubmit={ onSubmit } value={ input.name } onChangeText={ t => onInput( 'name', t ) } label='name' /> }
				<Input nativeID='loginreg-email' autoCompleteType='email' autoCapitalize='none' onSubmit={ onSubmit } value={ input.email } onChangeText={ t => onInput( 'email', t ) } label='email' keyboardType='email-address'/>
				{ action != 'recover' && <Input autoCompleteType='password' nativeID='loginreg-password' autoCapitalize='none' onSubmit={ onSubmit } value={ input.password } onChangeText={ t => onInput( 'password', t ) } secureTextEntry={ true } label='password' /> }

				{ action == 'register' && <Checkbox nativeID='loginreg-toc' onPress={ f => onInput( 'tos', !input.tos ) } checked={ input.tos } style={ { marginTop: 10 } }>
					<Text onPress={ f => onInput( 'tos', !tos ) }>I accept the </Text>
					<Link to='https://'>terms of service.</Link>
				</Checkbox> }
				
				{ /* Actions */ }

				<Button loading={ loading } nativeID='loginreg-submit' onPress={ onSubmit } icon='login' mode='contained' style={ { marginTop: 20 } }>
					{ !loading && `${ action } now` }
					{ loading && ( action == 'register' ? 'Registering' : 'Logging in' ) }
				</Button>
				<Button nativeID='loginreg-toggle' onPress={ f => setAction( action == 'login' ? 'register' : 'login' ) } icon={ action == 'login' ? 'account-plus' : 'login' } mode='text' style={ { marginTop: 20 } }>{ action == 'login' ? 'register' : 'login' } instead</Button>
				<Text nativeID='loginreg-forgotpassword' onPress={ f => setAction( 'recover' ) } style={ { textAlign: 'center', marginTop: 20, opacity: .6 } }>Forgot password?</Text>
		</Card>

		</Main.Center>
	</Container>

}