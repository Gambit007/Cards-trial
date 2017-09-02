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
    
    $scope.spade =[];
    $scope.diamonds =[];
    $scope.hearts =[];
    $scope.clubs =[];
    $scope.initalCardArray = [];
    localStorage.userSelect = {}

    for(var s = 0 ; s < $scope.suits.length ; s++){
    for(var i = 1 ; i < 14 ; i++) {
        $scope.initalCardArray.push({value:i, suit:$scope.suits[s]})
    }
}
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

$scope.startCallback = function(e,ui,currval){
    $scope.currVal = currval;
}
$scope.dropCallback = function(e,ui){
    if(e.target.innerText.trim().toLowerCase()== "spade"){
        $scope.spade.push({value:$scope.currVal.value, suit:$scope.currVal.suit})
        console.log($scope.spade);
        localStorage.userSelect['spadeSelect'] = $scope.spade
    } else if(e.target.innerText.trim().toLowerCase()== "hearts"){
        $scope.hearts.push({value:$scope.currVal.value, suit:$scope.currVal.suit})
        console.log($scope.hearts);
        localStorage.userSelect['heartsSelect'] = $scope.hearts
    } else if(e.target.innerText.trim().toLowerCase()== "diamonds"){
        $scope.diamonds.push({value:$scope.currVal.value, suit:$scope.currVal.suit})
        localStorage.userSelect['diamondSelect'] = $scope.diamonds
        console.log($scope.diamonds);
    } else if(e.target.innerText.trim().toLowerCase()== "clubs"){
        $scope.clubs.push({value:$scope.currVal.value, suit:$scope.currVal.suit})
        console.log($scope.clubs);
        localStorage.userSelect['clubSelect'] = $scope.clubs
    }
}

$scope.loadState = function(){
    var spade = JSON.parse(localStorage.getItem("userSelect"));
    if((spade == undefined && hearts == undefined && diamonds == undefined && clubs == undefined)){

    }
    else {
        var arr3 = spade.concat(hearts).concat(diamonds).concat(clubs);
        for(var x = 0 ; x < $scope.initalCardArray.length ; x++){

        }
    }
}

//$scope.loadState()


});
app.controller('loginController', function ($scope, $http,$q,$location) {
    $scope.login = function(){
        $location.path('cards');
    }
});


