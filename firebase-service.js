/**
 * @author Werachon Phunta
 * @email werachonp@gmail.com
 * @create date 2019-08-17 15:02:02
 * @modify date 2019-08-17 15:02:02
 * @desc A class that using for handle message that got from Line Chat.
*/
const firebase = require('firebase-admin');
const serviceAccount = require('../../test-line-api-firebase.json');
var db, ref;

class FirebaseService {
	constructor() {
        firebase.initializeApp({
			credential: firebase.credential.cert(serviceAccount),
			databaseURL: 'https://test-line-api.firebaseio.com'
		});

		db = firebase.database();

		ref = db.ref('hogwarts');
    }

    getHogwartHouses() {
        return new Promise(function (resolve, reject) {
            try {
                return ref.once('value', function(snapshot) {
                    let _hogwarts = snapshot.val();

                    return resolve(JSON.stringify(_hogwarts));
                });
            }
            catch (e) {
                return reject(e);
            }
        });
    }   
}
module.exports = new FirebaseService();