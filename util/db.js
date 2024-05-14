const firebase = require("firebase-admin");
const serviceAccount = require("../credentials.json");
const app = firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
});
const db = app.firestore();
module.exports = { db };
