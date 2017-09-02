(function () {

    module.exports = function (app) {
    	console.log("inside routes")
        var insight = require("../controller/attendanceController.js");

        app.post('/api/get-app-list-details', insight.getAppList);
        app.post('/api/upload-files', insight.uploadFile);
       
    }

})();
