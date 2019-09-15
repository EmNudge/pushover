import firebase from 'firebase/app'
import 'firebase/firestore'
import { firebaseKey } from './config.json'

const config = {
    apiKey: firebaseKey,
    authDomain: "pushover-b5c03.firebaseapp.com",
    databaseURL: "https://pushover-b5c03.firebaseio.com",
    projectId: "pushover-b5c03",
    storageBucket: "",
    messagingSenderId: "89671412960",
    appId: "1:89671412960:web:164eb2d273315cde"
};
firebase.initializeApp(config);

const db = firebase.firestore();

// firebase collections
const meetingTopics = db.collection('meeting-topics');
const progressReports = db.collection('progress-reports');
const admins = db.collection('admins');
const customReponses = db.collection('custom-reponses');

export {
    meetingTopics,
    progressReports,
    admins,
    customReponses
}