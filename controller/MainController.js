
var mongoose = require('mongoose');
//var appList = mongoose.model("tbl_applists");
var userData = mongoose.model("tbl_user_data");

var cardsApp = {
 saveProgress: function (req, res) {
    console.log("inside save progress change");
    var changeData = {
        userID: req.body.userID,
        savedValues: req.body.savedValues,
    }
    userData.find({
        userID: changeData.userID
    }).exec().then(function (object) {
        if (object.length > 0) {
            console.log("inside obj length")
            object.savedValues = changeData.savedValues;
            console.log(object[0].id)
            console.log(object.savedValues)
            userData.update({_id: object[0].id}, {$set: {savedValues:changeData.savedValues}}).exec().then(function (data) {
                console.log(data)
                var response = ({
                    code: 0,
                    message: "",
                    data: data
                });
                res.send(response);
            });
        }
        else {
            console.log("no obj length")
            var attUpdates = new userData(changeData);
            attUpdates.save(function (err, doc) {
                if (err) return console.error({
                    code: 0,
                    message: "error",
                    data: {error: err}
                });
                    var response = ({
                        code: 1,
                        message: "success",
                        data: {}
                    });
                    res.json(response);
                });
        }
    })


},
getProgress: function(req,res){
     var changeData = {
        userID: req.body.userID,
    }
    userData.find({
        userID: changeData.userID
    }).exec().then(function (object) {
        if (object.length > 0) {
                var response = ({
                    code: 0,
                    message: "success",
                    data: object
                });
                res.send(response);
            } else {
                var response = ({
                    code: 0,
                    message: "no data exists",
                    data: object
                });
                res.send(response);
            }
        });
}

};
module.exports = cardsApp;
