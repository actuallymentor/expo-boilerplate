import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { Drawer, Portal, Appbar, withTheme, Surface } from 'react-native-paper'

// Expo dependencies
import Constants from 'expo-constants'

// ///////////////////////////////
// Navigation
// ///////////////////////////////
export const Header = ( { style, back, title, subtitle, toggle, drawer, children } ) => <View style={ { width: '100%' } }>
	<Appbar.Header style={ { width: '100%', paddingVertical: 30, ...( !back && { paddingLeft: 20 } ), ...style }} statusBarHeight={ Constants.statusBarHeight }>
		{ back && <Appbar.BackAction onPress={ back } /> }
		<Appbar.Content title={ title } subtitle={ subtitle }/>
		{ children }
		<Appbar.Action icon="menu" onPress={ toggle } />
	</Appbar.Header>
	{ drawer && <Menu toggle={ toggle } /> }
</View>

// Sidebar
export const Menu = withTheme( ( { children, theme, toggle, ...props } ) => <Portal style={ { alignItems: 'center', justifyContent: 'center' } }>

	<TouchableOpacity onPress={ toggle } style={ { flex: 1 } }>

		<TouchableOpacity style={ { height: '100%', width: 500, maxWidth: '100%', alignSelf: 'flex-end' } } onPress={ e => e }>
			<Surface style={ { flex: 1 } }>
				<Drawer.Section title='Menu' style={ { height: '100%' } }>
				<Drawer.Item
			      label="First Item"
			      active={ true }
			      onPress={ f => f }
			    />
			    <Drawer.Item
			      label="Second item"
			      active={ false }
			      onPress={ f => f }
			    />
			    </Drawer.Section>
			</Surface>
		</TouchableOpacity>
		
	</TouchableOpacity>	
	
</Portal> )