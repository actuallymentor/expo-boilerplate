import React from 'react'

// Visual
import { TouchableOpacity, View, Animated, Switch } from 'react-native'
import { Drawer, Portal, Appbar, withTheme, Surface, Text } from 'react-native-paper'
import { PanGestureHandler } from 'react-native-gesture-handler'


// Expo dependencies
import Constants from 'expo-constants'

// ///////////////////////////////
// Header
// ///////////////////////////////
export const Header = ( { style, back, title, subtitle, toggle, pan, drawer, drawerWidth, drawerTranslate, toggleDark, children, links, go } ) => <View style={ { width: '100%' } }>
	<Appbar.Header style={ { width: '100%', paddingVertical: 30, ...( !back && { paddingLeft: 20 } ), ...style }} statusBarHeight={ Constants.statusBarHeight }>
		{ back && <Appbar.BackAction onPress={ back } /> }
		<Appbar.Content title={ title } subtitle={ subtitle }/>
		{ children }
		<Appbar.Action icon="menu" onPress={ toggle } />
	</Appbar.Header>
	{ drawer && <Menu links={ links } go={ go } toggleDark={ toggleDark } translate={ drawerTranslate } width={ drawerWidth } pan={ pan } toggle={ toggle } /> }
</View>

// ///////////////////////////////
// Sidebar
// ///////////////////////////////
const DarkMode = ( { toggleDark, theme } ) => <View style={ { flexDirection: 'row', marginTop: 'auto', paddingHorizontal: 20, paddingVertical: 20, borderTopWidth: 1, borderTopColor: theme.colors.divider } }>
	<Text style={ { opacity: .7 } } onPress={ toggleDark }>Dark mode</Text>
<Switch thumbColor={ theme.dark ? theme.colors.primary : theme.colors.background } onValueChange={ toggleDark } style={ { marginLeft: 20 } } value={ theme.dark } />
					    </View>
export const Menu = withTheme( ( { width, links, go, theme, toggle, pan, translate, toggleDark, ...props } ) => <Portal style={ { alignItems: 'center', justifyContent: 'center' } }>

	{  /* Touchable backdrop that closes the sidebar */ }
	<TouchableOpacity activeOpacity={ 1 } onPress={ toggle } style={ { flex: 1 } }>

		{ /* The actual sidebar */ }
		<TouchableOpacity activeOpacity={ 1 } style={ { height: '100%', width: width, maxWidth: '100%', alignSelf: 'flex-end' } } onPress={ e => e.preventDefault() }>

			{ /* Animation gesture handler */ }
			<PanGestureHandler onGestureEvent={ pan }>

				<Animated.View style={ [ translate, { flex: 1 } ] }>

					{ /* Visual surface element */ }
					<Surface style={ { flex: 1 } }>

						{ /* Title */ }
						<Drawer.Section title='Menu' style={ { height: '100%', marginBottom: 0 } }>
						
							{ /* Elements included from above */ }
							{ links.map( ( { label, to } ) => <Drawer.Item key={ label+to } label={ label } onPress={ f => go( to ) } /> ) }

							{ /* Darkmode toggle */ }
						    <DarkMode toggleDark={ toggleDark } theme={ theme } />

					    </Drawer.Section>
					</Surface>

				</Animated.View>
				
			</PanGestureHandler>

		</TouchableOpacity>
		
	</TouchableOpacity>	
	
</Portal> )
