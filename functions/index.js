const functions = require('firebase-functions')

// ///////////////////////////////
// Push notification handling
// ///////////////////////////////
const { retreivePushReceipts } = require( './modules/push' )

// Get receipts
exports.pushReceiptHandler = functions.pubsub.schedule( '0 12,0 * * *' ).onRun( retreivePushReceipts )
