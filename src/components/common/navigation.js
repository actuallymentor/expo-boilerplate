import React, { useState, useEffect, useRef } from 'react'
import { Animated } from 'react-native'

// Visual
import { Component, Appbar } from './generic'
import { Header, Menu } from './navigation-views'
import { Share } from 'react-native'

// Data & routing
import { useSelector } from 'react-redux'
import { useHistory } from '../../routes/router'
import app from '../../modules/firebase/app'

// Helpers
import { capitalize, log, Dialogue } from '../../modules/helpers'
import { sendEmail } from '../../modules/apis/messaging'
import { version, OS } from '../../modules/apis/platform'

export default function Navigation( { title } ) {

	const drawerWidth = 300
	const drawerSpeed = 500
	const history = useHistory()
	const user = useSelector( store => store.user )

	// ///////////////////////////////
	// State management
	// ///////////////////////////////
	const [ links, setLinks ] = useState( [] )

	// Link management
	useEffect( () => {

		if( !user ) return

		// Add links relevant to the user
		setLinks( prev => [ ...prev, {
			label: 'Account management',
			links: [
				{ label: 'Settings', to: '/user/settings' },
				{ label: 'Logout', onPress: app.logout }
			]
		} ] )

		// Add bug/feedback links
		setLinks( prev => [ ...prev, {
			label: 'Help & support',
			links: [
				{ label: '🎉 Invite a friend', onPress: inviteFriend },
				{ label: 'Report a problem', onPress: mailBugreport },
				{ label: 'Request a feature', onPress: mailFeaturerequest },
			]
		} ] )


	}, [] )

	// Drawer animation
	const [ drawer, setDrawer ] = useState( false )
	const pan = useRef( new Animated.ValueXY( { x: drawerWidth, y: 0 } ) ).current
	const handleDrag = Animated.event(
		[ { translationX: pan.x } ],
		// Do not enable native driver, the PanGestureHandler can't handle native
		{ useNativeDriver: false }
	)
	function panDrawer( { nativeEvent } ) {

		const { translationX, velocityX, state, oldState } = nativeEvent

		// If drag is not on x axis or is to the left of base position ignore
		if( !translationX || translationX < 0 ) return

		// Animate if state is pulling
		if( state == 4 ) return handleDrag( nativeEvent )

		// If we let go, either reset or hide
		if( state == 5 && ( translationX > drawerWidth / 5 || velocityX > 2 ) ) return toggleDrawer()
		else return toggleDrawer( 'force' )

	}

	async function mailBugreport() {

		const { name, handle } = user
		const n = ( isWeb && '\n' ) || ( isIos && '<br>' ) || ( isAndroid && '<br><br>' )

		await Dialogue( '💌 Your email client will open', `Your input is super appreciated ${ handle }.\n\nWe have pre-composed an email for you, please edit the relevant parts with your input.` )

		const message = `Hello team!
			${ n }My name is ${ name }, my handle is ${ handle }.
			${ n }I encountered a problem:
			${ n }1. I was trying to ✏️ insert_what_you_were_doing
			${ n }2. I expected the app to ✏️ insert_what_you_expeted_to_happen
			${ n }3. Instead, the app ✏️ insert_what_happened
			${ n }I am using app version "${ version }" on ${ OS }.
			${ n }Thanks for taking a look at it!
			${ n }Sincerely,${ n }${ name }
		`

		return sendEmail( 'bugs@app.domain', '🐞 Bug report', message )

	}

	async function mailFeaturerequest( ) {

		const { name, handle } = user
		const n = ( isWeb && '\n' ) || ( isIos && '<br>' ) || ( isAndroid && '<br><br>' )

		await Dialogue( '💌 Your email client will open', `Your input is super appreciated ${ handle }.\n\nWe have pre-composed an email for you, please edit the relevant parts with your input.` )

		const message = `Hello team!
			${ n }My name is ${ name }, my handle is ${ handle }.
			${ n }I would like to suggest a feature, it would be great if:
			${ n }✏️ Insert_your_feature_idea.
			${ n }I am using app version "${ version }" on ${ OS }.
			${ n }Thanks for taking a look at it!
			${ n }Sincerely,${ n }${ name }
		`

		return sendEmail( 'features@app.domain', '✨ Feature request', message )

	}

	// Sharing
	function inviteFriend( ) {
		Share.share( {
			message: `I found an app I think you might like!\n\nI\n\nYou can find it here: https://`,
			url: `https://`
		} )
	}

	// ///////////////////////////////
	// Component functions
	// ///////////////////////////////
	async function toggleDrawer( config ) {

		const force = config == 'force'

		// If the drawer is open, move it to closed position
		if( drawer && !force ) Animated.timing( pan, { toValue: { x: drawerWidth, y: 0 }, duration: drawerSpeed, useNativeDriver: false } ).start( f => setDrawer( !drawer ) )
		
		// If drawer is closed, first mount, then animate open
		else if( !drawer || force ) {
			if( !force ) setDrawer( !drawer )
			Animated.timing( pan, { toValue: { x: 0, y: 0 }, duration: drawerSpeed, useNativeDriver: false } ).start()
		}
	}

	return <Header
			drawerTranslate={ { transform: pan.getTranslateTransform() } }
			drawerWidth={ drawerWidth }
			pan={ panDrawer }
			toggle={ toggleDrawer } 
			title={ capitalize( title ) }
			drawer={ drawer }
			links={ links } >
				{ user && <Appbar.Action nativeID='navigation-home' icon='home' onPress={ f => history.push( `/` ) } /> }
		</Header>


}
