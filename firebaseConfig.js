const firebase = require('firebase/app');
require('firebase/firestore');
const { firebaseKey } = require("./config.json");

const config = {
    apiKey: firebaseKey,
    authDomain: "cassy-kaff.firebaseapp.com",
    databaseURL: "https://cassy-kaff.firebaseio.com",
    projectId: "cassy-kaff",
    storageBucket: "cassy-kaff.appspot.com",
    messagingSenderId: "485392117574"
};
firebase.initializeApp(config);

const db = firebase.firestore();

// date issue fix according to firebase
db.settings({ timestampsInSnapshots: true });

// firebase collections
const meetingTopics = db.collection('meeting-topics');
const progressReports = db.collection('progress-reports');
const admins = db.collection('admins');
const customReponses = db.collection('custom-reponses');

module.exports = {
    meetingTopics,
    progressReports,
    admins,
    customReponses
}