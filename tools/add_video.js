#!/bin/env node

var readline = require("readline");
var mongoose = require("mongoose");
var api = require("../controllers/api.js");

var database = require('../config/db');
mongoose.connect(database.url);

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Read a video ID from stdin
rl.question("Enter a video ID to add: ", (answer) => {
    // Add it to the db
    api.addVideo(answer, function(err, vid) {
        if(err != null) {
            console.error("There was a problem adding the video");
        } else {
            console.info("Video added successfully!")
        }

        // Close stdin
        rl.close();
        process.stdin.destroy();

        // Exit without error
        process.exit(0);
    });
})