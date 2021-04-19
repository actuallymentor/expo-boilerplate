import React, { useState, useEffect } from 'react'

// Visual
import { Avatar } from '../common/generic'
import { TouchableOpacity } from 'react-native'

// Functionality
import { log, catcher, Dialogue } from '../../modules/helpers'
import { isWeb } from '../../modules/apis/platform'
import * as ImgPick from 'expo-image-picker'
import * as Permissions from 'expo-permissions'


// ///////////////////////////////
// Render component
// ///////////////////////////////
export default function ImagePicker( { image, onSelected, style, size } ) {

	// ///////////////////////////////
	// State handling
	// ///////////////////////////////
	const [ source, setSource ] = useState( 'gallery' )
	const [ imageState, setImage ] = useState( image )

	// ///////////////////////////////
	// Permission handling
	// ///////////////////////////////
	const [ cameraPermission, askPermission ] = Permissions.usePermissions( isWeb ? Permissions.CAMERA_ROLL : [ Permissions.CAMERA, Permissions.CAMERA_ROLL ] )

	// ///////////////////////////////
	// Component functions
	// ///////////////////////////////
	async function pickImage() {
		
		// If on mobile, offer to take a picture
		if( isWeb ) {
			await Dialogue( 'Take picture', 'Do you want to take a picture or pick an existing one?', [ {
				text: 'Take picture',
				onPress: f => setSource( 'camera' )
			}, {
				text: 'Use existing picture',
				onPress: f => setSource( 'gallery' )
			} ] )
		}

		// Based on image source open dialog
		let rawImage
		if( source == 'camera' ) {
			// Check current permissions
			if( !cameraPermission ) return Dialogue( `You did not give camera permissions, so we can't take a picture.` ).then( askPermission )
			rawImage = await ImgPick.launchCameraAsync( )
		}
		if( source == 'gallery' ) rawImage = await ImgPick.launchImageLibraryAsync( )

		// Send the image to the callback
		if( rawImage && !rawImage.cancelled ) {
			if( onSelected ) onSelected( rawImage )
			setImage( rawImage )
		}

	}


	// ///////////////////////////////
	// Render component
	// ///////////////////////////////
	return <TouchableOpacity onPress={ pickImage } style={ { alignItems: 'center', justifyContent: 'center', ...style } }>
		{ ( image || imageState ) ? <Avatar.Image size={ size || 100 } source={ image || imageState } /> : <Avatar.Icon size={ size || 100 } icon='camera' /> }
	</TouchableOpacity>

}