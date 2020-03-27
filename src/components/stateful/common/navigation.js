import React from 'react'
import { Component } from '../../stateless/common/generic'
import { Header, Menu } from '../../stateless/common/navigation'
import { connect } from 'react-redux'
import { capitalize } from '../../../modules/helpers'

class Navigation extends Component {

	constructor( props ) {
		super( props )
		this.state = {
			drawer: false
		}

	}

	toggleDrawer = f => this.updateState( { drawer: !this.state.drawer } )

	render( ) {

		const { title } = this.props
		const { drawer } = this.state
		console.log( 'Drawer ', drawer )

		return <Header toggle={ this.toggleDrawer } title={ capitalize( title ) } drawer={ drawer } />
	}

}

export default connect( store => ( {

} ) )( Navigation )