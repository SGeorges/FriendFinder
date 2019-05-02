// DEPENDENCIES
// ===============================================================================
var path = require("path");
// ===============================================================================

// LOAD DATA
// ===============================================================================
var friendsData = require("../data/friends");
// ===============================================================================

// ROUTING
// ===============================================================================

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function(req, res) {
        var matchability = 999;
        var bestFriend = 0;
        console.log(friendsData);

        for( let i = 0; i < friendsData.length; i++) {
            var currMatchability = 0;
            for( let j = 0; j < friendsData[i].scores.length; j++) {
                currMatchability += Math.abs(parseInt(friendsData[i].scores[j]) - parseInt(req.body.scores[j]));
            };

            console.log(friendsData[i].name + " : " + currMatchability);
            if (currMatchability < matchability){
                matchability = currMatchability;
                bestFriend = i;
            };
        };

        friendsData.push(req.body);
        res.send(friendsData[bestFriend]);
    });
};

// ===============================================================================
