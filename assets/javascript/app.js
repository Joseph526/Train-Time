$(document).ready(function() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBmHJUTn9e11BGKZeoSvYy12AisLycAZl0",
        authDomain: "train-time-d055e.firebaseapp.com",
        databaseURL: "https://train-time-d055e.firebaseio.com",
        projectId: "train-time-d055e",
        storageBucket: "train-time-d055e.appspot.com",
        messagingSenderId: "704288794030"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    // Declare global variables
    var trainName = "";
    var trainDest = "";
    var trainFirstTime = "";
    var trainFreq = "";


    // Declare functions

    // Database listener for initial records


    // Add record to database



    // Execute functions

    // Populate train schedule table on load



    // Submit button to add new train
    $("#submitButton").on("click", function(event) {
        event.preventDefault();
    })
});