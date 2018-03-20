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
    var trainFreq = 0;


    // Declare functions
    var trainScheduler = {
        
        // Database listener for initial records
        dataLoader: function() {
            database.ref().on("child_added", function(childSnapshot) {
                console.log();
            });
        },

        // Add record to database
        addRecord: function() {
            
            // Capture user input
            trainName = $("#addTrain").val().trim();
            trainDest = $("#addDest").val().trim();
            trainFirstTime = $("#addFirstTime").val().trim();
            trainFreq = $("#addFreq").val().trim();

            // Code for the push
            database.ref().push({
                trainName: trainName,
                trainDest: trainDest,
                trainFirstTime: trainFirstTime,
                trainFreq: trainFreq,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });
        }
    }

    


    



    // Execute functions

    // Populate train schedule table on load



    // Submit button to add new train
    $("#submitButton").on("click", function(event) {
        event.preventDefault();
        trainScheduler.addRecord();
    })
});