exports.dataFromSnap = ( snapOfDocOrDocs, withDocId=true ) => {

	// If these are multiple docs
	if( snapOfDocOrDocs.docs ) return snapOfDocOrDocs.docs.map( doc => ( { uid: doc.id, ...doc.data( ) } ) )

	// If this is a single document
	return { ...snapOfDocOrDocs.data(), ...( withDocId && { uid: snapOfDocOrDocs.id } ) }

}

// Errors do not behave like objects, so let's make them
const handleErrorType = content => {

	// It this is not an object just let it through
	if( typeof content != 'object' ) return content

	// Create placeholder
	const obj = {}

	// For each property, append to object
	Object.getOwnPropertyNames( content ).map( key => {

		// If the sub property is also an object, recurse so we destructure it too
		if( typeof content[key] == 'object' ) obj[key] = handleErrorType( content[key] )
		else return obj[key] = content[key]
	} )

	return obj
}

exports.log = ( title, content ) => {
	if( !process.env.development ) return
	console.log( title, content ? JSON.stringify( handleErrorType( content ), null, process.env.development ? 2 : null ) : '' )
}

exports.error = ( title, content ) => {
	console.log( title, content ? JSON.stringify( handleErrorType( content ), null, process.env.development ? 2 : null ) : '' )
}

// ///////////////////////////////
// Dates
// ///////////////////////////////

// Baselines
const msInADay = 86400000
const today = new Date()

// profiling the 1st of jan
const oneJan = new Date( today.getFullYear(), 0, 1 )
const oneJanDayType = oneJan.getDay()

exports.timestampToHuman = ms => new Date( ms ).toString().match( /([a-zA-Z]* )([a-zA-Z]* )(\d+)/ )[0]

// Weeks are defined by the number of 7 day increments that have elapsed
exports.weekNumber = f => {

    const daysPassedSinceOneJan = Math.floor( ( today.getTime() - oneJan.getTime() ) / msInADay )

    // Compose week number
    const weekNumber = Math.ceil( ( daysPassedSinceOneJan + oneJanDayType ) / 7 )

    return weekNumber
}
