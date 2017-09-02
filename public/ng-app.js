var app = angular.module('myApp',['ngDragDrop','ngRoute']);

    app.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'login.html',
                controller  : 'loginController'
            })

            // route for the about page
            .when('/cards', {
                templateUrl : 'cards.html',
                controller  : 'ListController'
            })

            // route for the contact page
            
    });

app.controller('ListController', function ($scope, $http,$q) {
    $scope.suits = ["spade","clubs","hearts","diamonds"];
    $scope.initalCardArray = [];
    $scope.dumpedSuits=[];
    localStorage.userSelect = {}


$scope.beforeDrop = function(e,ui){
    var deferred = $q.defer();
     var draggableId = ui.draggable.attr("id");
     var droppableId = e.target.innerText.trim().toLowerCase();
     console.log($scope.spade)
     if(draggableId.indexOf(droppableId)>0){
        deferred.resolve();
     } else {
        deferred.reject();
     }

     return deferred.promise;

}

$scope.startCallback = function(e,ui,currval,index){
    $scope.currVal = currval;
    $scope.indexData = index;
}
$scope.dropCallback = function(e,ui){
        $scope.dumpedSuits.push({value:$scope.currVal.value, suit:$scope.currVal.suit});
        console.log($scope.dumpedSuits);
        $scope.initalCardArray.splice($scope.indexData,1)
        console.log($scope.initalCardArray.length);
        if($scope.initalCardArray.length == 0){
            alert("you have won the game");
            for(var s = 0 ; s < $scope.suits.length ; s++){
        for(var i = 1 ; i < 14 ; i++) {
            $scope.initalCardArray.push({value:i, suit:$scope.suits[s]})
        }
    }
        }

        //localStorage.userSelect['spadeSelect'] = $scope.spade
}

$scope.logout = function(){
     $http.post("/save-user-data", {userID: "2",savedValues:JSON.stringify($scope.dumpedSuits)}).then(function (response) {
     console.log(response.data);
     });
}

$scope.loadState = function(){
    $http.post("/get-user-data", {userID: "2"}).then(function (response) {
     console.log(response.data);
     $scope.userSaved = JSON.parse(response.data.data[0].savedValues);
    for(var s = 0 ; s < $scope.suits.length ; s++){
        for(var i = 1 ; i < 3 ; i++) {
            $scope.initalCardArray.push({value:i, suit:$scope.suits[s]})
        }
    }
    if($scope.userSaved){
    for (var x = 0; x <$scope.initalCardArray.length; x++){
        for(var y = 0; y<$scope.userSaved.length; y++){
            if($scope.initalCardArray[x].value == $scope.userSaved[y].value && $scope.initalCardArray[x].suit == $scope.userSaved[y].suit){
                $scope.initalCardArray.splice(x,1)
            }
        }
    }
}
 });
}

$scope.loadState()


});
app.controller('loginController', function ($scope, $http,$q,$location) {
    $scope.login = function(){
        $location.path('cards');
    }
});


