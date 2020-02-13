import { color, fontSize, merge, StyleSheet } from './_helpers'

describe( 'Style helpers and variables', () => {

	it( 'Colors are al set', done => {

		const colors = Object.keys( color )

		expect( colors ).toContain( 'background' )
		expect( colors ).toContain( 'text' )
		expect( colors ).toContain( 'primary' )
		expect( colors ).toContain( 'accent' )
		expect( colors ).toContain( 'divider' )

		done()

	} )

	it( 'Font sizes are all set', done => {

		const sizes = Object.keys( fontSize )

		expect( sizes ).toContain( 'h1' )
		expect( sizes ).toContain( 'h2' )
		expect( sizes ).toContain( 'h3' )
		expect( sizes ).toContain( 'p' )

		done()

	} )

	it( 'Merge function exists', done => {

		expect( typeof merge ).toBe( 'function' )
		
		done()

	} )

	it( 'Style sheet exports', done => {

		const funcs = Object.keys( StyleSheet )

		expect( funcs ).toContain( 'flatten' )
		expect( funcs ).toContain( 'hairlineWidth' )

		done()
	} )

} )