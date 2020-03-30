import React from 'react'

// Visual
import { TouchableOpacity, View, Text, Animated, Switch } from 'react-native'
import { Drawer, Portal, Appbar, withTheme, Surface } from 'react-native-paper'
import { PanGestureHandler } from 'react-native-gesture-handler'


// Expo dependencies
import Constants from 'expo-constants'

// ///////////////////////////////
// Navigation
// ///////////////////////////////
export const Header = ( { style, back, title, subtitle, toggle, pan, drawer, drawerWidth, drawerTranslate, toggleDark, children } ) => <View style={ { width: '100%' } }>
	<Appbar.Header style={ { width: '100%', paddingVertical: 30, ...( !back && { paddingLeft: 20 } ), ...style }} statusBarHeight={ Constants.statusBarHeight }>
		{ back && <Appbar.BackAction onPress={ back } /> }
		<Appbar.Content title={ title } subtitle={ subtitle }/>
		{ children }
		<Appbar.Action icon="menu" onPress={ toggle } />
	</Appbar.Header>
	{ drawer && <Menu toggleDark={ toggleDark } translate={ drawerTranslate } width={ drawerWidth } pan={ pan } toggle={ toggle } /> }
</View>

// Sidebar
export const Menu = withTheme( ( { width, children, theme, toggle, pan, translate, toggleDark, ...props } ) => <Portal style={ { alignItems: 'center', justifyContent: 'center' } }>

	<TouchableOpacity activeOpacity={ 1 } onPress={ toggle } style={ { flex: 1 } }>

		<TouchableOpacity activeOpacity={ 1 } style={ { height: '100%', width: width, maxWidth: '100%', alignSelf: 'flex-end' } } onPress={ e => e.preventDefault() }>

			<PanGestureHandler onGestureEvent={ pan }>

				<Animated.View style={ [ translate, { flex: 1 } ] }>

					<Surface style={ { flex: 1 } }>
						<Drawer.Section title='Menu' style={ { height: '100%', marginBottom: 0 } }>
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

					    <View style={ { flexDirection: 'row', paddingHorizontal: 20 } }>
					    	<Text onPress={ toggleDark }>Dark mode</Text>
					    	<Switch thumbColor={ theme.dark ? theme.colors.primary : theme.colors.background } onValueChange={ toggleDark } style={ { marginLeft: 20 } } value={ theme.dark } />
					    </View>

					    </Drawer.Section>
					</Surface>

				</Animated.View>
				
			</PanGestureHandler>

		</TouchableOpacity>
		
	</TouchableOpacity>	
	
</Portal> )
