export function unregisterListeners( listeners ) {

	for( let key in listeners ) {
		listeners[ key ]()
		delete listeners[ key ]
	}

}

export async function registerListeners( listeners ) {

	// Register listeners if they do not yet exist
	// if( !listeners.thing ) listeners.thing = listenForthing()

}