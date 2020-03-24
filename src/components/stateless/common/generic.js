import React from 'react'
import { View, Text } from 'react-native'

// Expo dependencies
import Constants from 'expo-constants'

// Visual dependencies
import { Appbar } from 'react-native-paper'

// Optimised react root component
export class Component extends React.Component {

  constructor( props ) {
    super( props )

    // Class-wide functions
    this.promiseState = newState => new Promise( resolve => this.setState( newState, resolve ) )
    this.updateState = updates => this.promiseState( { ...this.state, ...updates } )

  }

}

// ///////////////////////////////
// Application scaffolding
// ///////////////////////////////
export const Header = ( { style, back, title, subtitle, children } ) => <View style={ { width: '100%' } }>
	<Appbar.Header style={ { width: '100%', paddingVertical: 30, ...( !back && { paddingLeft: 20 } ), ...style }} statusBarHeight={ Constants.statusBarHeight }>
		{ back && <Appbar.BackAction onPress={ back } /> }
		<Appbar.Content title={ title } subtitle={ subtitle }/>
		{ children }
	</Appbar.Header>
</View>

// General app container
export const Container = ( { style, children } ) => <View style={ { flex: 1, flexDirection: 'column', alignItems: 'flex-start', ...style } }>{ children }</View>

// Loading screen
export const Loading = ( { message } ) => <Container>
	<Text>
		{ message || 'Loading' }
	</Text>
</Container>