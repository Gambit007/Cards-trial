(function () {

    module.exports = function (app) {
    	console.log("inside routes")
        var insight = require("../controller/MainController.js");
        app.post('/save-user-data',insight.saveProgress);
        app.post('/get-user-data',insight.getProgress);
        //app.post('/api/upload-files', insight.uploadFile);
       
    }

})();
