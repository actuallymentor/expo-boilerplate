import React from 'react'
import { connect } from 'react-redux'
// Image specific
import * as ImgPick from 'expo-image-picker'
import { checkCameraPermissions, confirmOrAskCameraPermissions } from '../../../modules/permissions'
import { Asset } from 'expo-asset'
import { Dialogue } from '../../../modules/helpers'

// Visual
import { TouchableOpacity, Image, Text, Platform } from 'react-native'
import { Component, Avatar } from '../../stateless/common/generic'

class ShowOrPickImage extends Component {

	state = {
		imgSource: 'gallery',
		image: this.props.image
	}


	pickImage =  async f => {
		
		// If on mobile, offer to take a picture
		if( Platform.OS != 'web' ) {
			await Dialogue( 'Take picture', 'Do you want to take a picture or pick an existing one?', [ {
				text: 'Take picture',
				onPress: f => this.updateState( { imgSource: 'camera' } )
			}, {
				text: 'Use existing picture',
				onPress: f => this.updateState( { imgSource: 'gallery' } )
			} ] )
		}

		// Based on image source open dialog
		const { imgSource } = this.state
		let image
		if( imgSource == 'camera' ) {
			// Check current permissions
			const cameraPermission = await confirmOrAskCameraPermissions()
			if( !cameraPermission ) return Dialogue( `You did not give camera permissions, so we can't take a picture.` )
			image = await ImgPick.launchCameraAsync( )
		}
		if( imgSource == 'gallery' ) image = await ImgPick.launchImageLibraryAsync( )

		// Send the image to the callback
		const { onSelected } = this.props
		if( image && !image.cancelled ) {
			if( onSelected ) onSelected( image )
			await this.updateState( { image: image } )
		}

	}

	render( ) {

		const { image } = this.state
		const { style, theme, size } = this.props

		return <TouchableOpacity onPress={ this.pickImage } style={ { alignItems: 'center', justifyContent: 'center', ...style } }>
			{ image ? <Avatar.Image size={ size || 100 } source={ image } /> : <Avatar.Icon size={ size || 100 } icon='camera' /> }
		</TouchableOpacity>

	}



}

export default connect( store => ( {
	theme: store.settings.theme
} ) )( ShowOrPickImage )