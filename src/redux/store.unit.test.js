import { store , persistor } from './store'

describe( 'Store unit test', () => {

	it( 'Store is valid and has persistor keys', done => {

		const emptyStore = store.getState()
		const keys = Object.keys( emptyStore )

		expect( keys ).toContain( 'reducer' )
		expect( keys ).toContain( '_persist' )

		done()

	} )

	it( 'Persistor is valid persistor', done => {

		const keys = Object.keys( persistor )

		expect( keys ).toContain( 'persist' )
		expect( keys ).toContain( 'purge' )

		done()

	} )

} )