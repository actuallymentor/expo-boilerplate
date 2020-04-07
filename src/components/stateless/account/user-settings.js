import React from 'react'
import { Card, Main, Title, Input, Button } from '../common/generic'

export const Settings = ( { children, user, changeUser, settings, changeSettings, saveChanges } ) => <Main.Center>
	<Card>
		<Title style={ { textAlign: 'center' } }>{ user.name || user.email }'s settings</Title>
		<Input label='name' value={ user.name } onChangeText={ t => changeUser( 'name', t ) } />
		<Input label='email' value={ user.email } onChangeText={ t => changeUser( 'email', t ) } />
		<Button onPress={ saveChanges }>Save changes</Button>
	</Card>
</Main.Center>

export const another = true