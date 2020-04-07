import React from 'react'
import { View } from 'react-native'
import { Card, Input, Button, Divider } from '../common/generic'

export const Login = ( { toggle, proceed, onInput, action='login', name, email, password } ) => <Card>
		{ action == 'register' && <Input value={ name } onChangeText={ t => onInput( 'name', t ) } label='name' /> }
		<Input value={ email } onChangeText={ t => onInput( 'email', t ) } label='email' />
		<Input value={ password } onChangeText={ t => onInput( 'password', t ) } secureTextEntry={ true } label='password' />
		<Button onPress={ proceed } icon='login' mode='contained' style={ { marginTop: 20 } }>{ action } now</Button>
		<Divider />
		<Button onPress={ toggle } icon={ action == 'login' ? 'account-plus' : 'login' } mode='text' style={ { marginTop: 20 } }>{ action == 'login' ? 'register' : 'login' } instead</Button>
</Card>

export const another = true