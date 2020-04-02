export function unregisterListeners( listeners ) {

	for( let key in listeners ) {
		listeners[ key ]()
		delete listeners[ key ]
	}

}

export async function registerListeners( app ) {

	// Register listeners if they do not yet exist
	if( !this.listeners.thing ) this.listeners.thing = this.listenForthing()

}