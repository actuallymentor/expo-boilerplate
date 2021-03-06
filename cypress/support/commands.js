// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import { find, fill, click, wait, scroll, exclude } from '../fixtures/_helpers'

// ///////////////////////////////

// ///////////////////////////////
// Authentication
// ///////////////////////////////
Cypress.Commands.add( 'register', user => {

	// Switch to registration view
	click( '#loginreg-toggle', 'register' )

	// Input the relevant data
	fill( 'input#loginreg-name', user.name )
	fill( 'input#loginreg-email', user.email )
	fill( 'input#loginreg-password', user.password )
	click( '#loginreg-tos', 'accept' )

	// Trigger registration
	click( '#loginreg-submit', 'register' )

} )

Cypress.Commands.add( 'login', ( user, shouldsucceed=true ) => {

	// Input the relevant data
	fill( 'input#loginreg-email', user.email )
	fill( 'input#loginreg-password', user.password )

	// Trigger registration
	click( '#loginreg-submit', 'login' )
	exclude( '#loginreg-submit', 'logging in' )
	wait( 2000 )

} )

Cypress.Commands.add( 'logout', user => {

	click( '#navigation-toggle' )
	click( '#navigation-surface *', 'Logout' )
	cy.get( 'input#loginreg-email' ).should( 'be.visible' )
	cy.get( 'input#loginreg-password' ).should( 'be.visible' )

} )

// ///////////////////////////////
// Navigation
// ///////////////////////////////
Cypress.Commands.add( 'openSettings', user => {

	click( '#navigation-toggle' )
	click( '#navigation-surface *', 'Settings' )
	cy.get( '#settings-user' ).should( 'be.visible' )
	cy.get( '#settings-contact' ).should( 'be.visible' )
	cy.get( '#settings-account' ).should( 'be.visible' )

} )

Cypress.Commands.add( 'openMyProfile', user => {

	click( '#navigation-toggle' )
	click( '#navigation-surface *', 'Your profile' )
	cy.get( '#user-profile-self' ).should( 'be.visible' )

} )


Cypress.Commands.add( 'goHome', user => {

	click( '#navigation-home' )

} )
