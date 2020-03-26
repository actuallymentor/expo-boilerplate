import React from 'react'
import { View, Text } from 'react-native'
import { Card as PaperCard, TextInput, Appbar, withTheme, ActivityIndicator, Title } from 'react-native-paper'

// Expo dependencies
import Constants from 'expo-constants'


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
export const Container = withTheme( ( { style, children, theme } ) => <View style={ {
	flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: theme.colors.background,
	...style
} }>
	{ children }
</View> )

// Generic card
export const Card = ( { containerStyle, style, children } ) => <View style={ containerStyle }>
	<PaperCard elevation={ 2 } style={ { padding: 40, minWidth: 400, maxWidth: '100%', ...style } }>{ children }</PaperCard>
</View>

// Generic text input
export const Input = props => <TextInput mode='flat' dense={ true } { ...props } style={ { marginVertical: 10, backgroundColor: 'none', ...props.style } } />

// Loading screen
export const Loading = ( { message } ) => <Container style={ { justifyContent: 'center' } }>
		<ActivityIndicator size='large' />
		<Title style={ { textAlign: 'center', marginTop: 20 } }>{ message || 'Loading' }</Title>
</Container>