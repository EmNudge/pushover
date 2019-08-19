"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var app_1 = __importDefault(require("firebase/app"));
require("firebase/firestore");
var config_json_1 = require("./config.json");
var config = {
    apiKey: config_json_1.firebaseKey,
    authDomain: "pushover-b5c03.firebaseapp.com",
    databaseURL: "https://pushover-b5c03.firebaseio.com",
    projectId: "pushover-b5c03",
    storageBucket: "",
    messagingSenderId: "89671412960",
    appId: "1:89671412960:web:164eb2d273315cde"
};
app_1["default"].initializeApp(config);
var db = app_1["default"].firestore();
// firebase collections
var meetingTopics = db.collection('meeting-topics');
exports.meetingTopics = meetingTopics;
var progressReports = db.collection('progress-reports');
exports.progressReports = progressReports;
var admins = db.collection('admins');
exports.admins = admins;
var customReponses = db.collection('custom-reponses');
exports.customReponses = customReponses;
