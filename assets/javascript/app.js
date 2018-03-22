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
        
        // Database listener for existing records
        dataLoader: function() {
            database.ref().on("child_added", function(childSnapshot) {
                
                // Append records to table
                // Get reference to tbody element, create new row
                var tBody = $("tbody");
                var tRow = $("<tr>");

                // Calculate certain fields using Moment.js
                var trainFirstTimeConverted = moment(childSnapshot.val().trainFirstTime, "HH:mm").subtract(1, "days");
                var diffTime = moment().diff(moment(trainFirstTimeConverted), "minutes");
                var remainder = diffTime % childSnapshot.val().trainFreq;
                var trainAway = childSnapshot.val().trainFreq - remainder;
                var trainNext = moment().add(trainAway, "minutes").format("hh:mm A");

                // Assemble td elements, append to tr, then append tr to tbody
                var trainNameTd = $("<td>").text(childSnapshot.val().trainName);
                var trainDestTd = $("<td>").text(childSnapshot.val().trainDest);
                var trainFreqTd = $("<td>").text(childSnapshot.val().trainFreq);
                var trainNextTd = $("<td>").text(trainNext);
                var trainAwayTd = $("<td>").text(trainAway);
                tRow.append(trainNameTd, trainDestTd, trainFreqTd, trainNextTd, trainAwayTd);
                tBody.append(tRow);
            });
        },

        // Add record to database
        addRecord: function() {
            
            // Capture user input
            trainName = $("#addTrain").val().trim();
            trainDest = $("#addDest").val().trim();
            trainFirstTime = $("#addFirstTime").val().trim();
            trainFreq = parseInt($("#addFreq").val().trim());

            // Clear the input boxes for next input
            $("#addTrain").val("");
            $("#addDest").val("");
            $("#addFirstTime").val("");
            $("#addFreq").val("");
            $("#addTrain").focus();

            // Code for the push
            database.ref().push({
                trainName: trainName,
                trainDest: trainDest,
                trainFirstTime: trainFirstTime,
                trainFreq: trainFreq,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });
        }
    };
    
    // Execute functions

    // Populate train schedule table on load
    trainScheduler.dataLoader();
    $("#addTrain").focus();

    // Submit button to add new train
    $("#submitButton").on("click", function(event) {
        event.preventDefault();
        trainScheduler.addRecord();
    });
});