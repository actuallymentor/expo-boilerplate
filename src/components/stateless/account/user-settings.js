import React from 'react'
import { Card, Main, Title, Input, Button } from '../common/generic'
import ImagePicker from '../../stateful/common/image-picker'

export const Settings = ( { children, user={}, changeUser, settings, changeSetting, saveChanges, passwordRequired } ) => <Main.Center>
	<Card style={ { paddingTop: 0 } } >
		<ImagePicker image={ user.avatar } size={ 100 } style={ { marginTop: -50, marginBottom: 20 } } onSelect={ image => changeUser( 'avatar', image ) } />
		<Title style={ { textAlign: 'center' } }>{ user.name || user.email }'s settings</Title>
		<Input label='name' value={ user.name } onChangeText={ t => changeUser( 'name', t ) } />
		<Input label='email' value={ user.email } onChangeText={ t => changeUser( 'email', t ) } />
		<Input secureTextEntry label='new password' value={ user.newpassword || '' } onChangeText={ t => changeUser( 'newpassword', t ) } />
		{ passwordRequired && <React.Fragment>
			<Input secureTextEntry label='Current password (required)' value={ user.currentpassword || '' } onChangeText={ t => changeUser( 'currentpassword', t ) } />
		</React.Fragment> }
		<Button onPress={ saveChanges }>Save changes</Button>
	</Card>
</Main.Center>

export const another = true