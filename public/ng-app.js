var app = angular.module('myApp', ['ngDragDrop', 'ngRoute']);

app.config(function($routeProvider) {
    $routeProvider

    // route for the home page
        .when('/', {
        templateUrl: 'login.html',
        controller: 'loginController'
    })

    // route for the card page
    .when('/cards', {
        templateUrl: 'cards.html',
        controller: 'ListController'
    })

    .when('/register', {
        templateUrl: 'register.html',
        controller: 'loginController'
    })

});

app.controller('ListController', function($scope, $http, $q, $location) {
    $scope.suits = ["spade", "clubs", "hearts", "diamonds"];
    $scope.fValues = [1,2,3,4,5,6,7,8,9,10,"J","Q","K"];
    $scope.initalCardArray = [];
    $scope.dumpedSuits = [];
    $scope.userData = JSON.parse(localStorage.getItem("userData"))
    localStorage.userSelect = {}


    $scope.beforeDrop = function(e, ui) {
        var deferred = $q.defer();
        var draggableId = ui.draggable.attr("id");
        var droppableId = e.target.innerText.trim().toLowerCase();
        console.log($scope.spade)
        if (draggableId.indexOf(droppableId) > 0) {
            deferred.resolve();
        } else {
            deferred.reject();
        }

        return deferred.promise;

    }

    $scope.startCallback = function(e, ui, currval, index) {
        $scope.currVal = currval;
        $scope.indexData = index;
    }
    $scope.dropCallback = function(e, ui) {
        $scope.dumpedSuits.push({
            value: $scope.currVal.value,
            suit: $scope.currVal.suit
        });
        console.log($scope.dumpedSuits);
        $scope.initalCardArray.splice($scope.indexData, 1)
        console.log($scope.initalCardArray.length);
        if ($scope.initalCardArray.length == 0) {
            alert("you have won the game");
            for (var s = 0; s < $scope.suits.length; s++) {
                for (var i = 1; i < $scope.fValues.length; i++) {
                    $scope.initalCardArray.push({
                        value: $scope.fValues[i],
                        suit: $scope.suits[s]
                    })
                }
            }
        }

        //localStorage.userSelect['spadeSelect'] = $scope.spade
    }

    $scope.logout = function() {
        $http.post("/save-user-data", {
            userID: $scope.userData._id,
            savedValues: JSON.stringify($scope.dumpedSuits)
        }).then(function(response) {
            console.log(response.data);
            $location.path('/');
        });
    }

    $scope.loadState = function() {
        $http.post("/get-user-data", {
            userID: $scope.userData._id
        }).then(function(response) {
            console.log(response.data);
            if (response.data.data[0]) {
                $scope.userSaved = JSON.parse(response.data.data[0].savedValues);
            }
            for (var s = 0; s < $scope.suits.length; s++) {
                for (var i = 0; i < $scope.fValues.length; i++) {
                    $scope.initalCardArray.push({
                        value: $scope.fValues[i],
                        suit: $scope.suits[s]
                    })
                }
            }
            if ($scope.userSaved) {
                for (var x = $scope.initalCardArray.length -1; x >=0; x--) {
                    for (var y = 0; y < $scope.userSaved.length; y++) {
                        if ($scope.initalCardArray[x].value == $scope.userSaved[y].value && $scope.initalCardArray[x].suit == $scope.userSaved[y].suit) {
                            if (x > 0) {
                                $scope.initalCardArray.splice(x--, 1)
                            } else {
                                $scope.initalCardArray.splice(x, 1)
                            }

                        }
                    }
                }
            }
        });
    }

    $scope.loadState()


});
app.controller('loginController', function($scope, $http, $q, $location) {
    $scope.login = function() {
        $http.post("/login", {
            email: $scope.email,
            password: $scope.password
        }).then(function(response) {
            console.log(response.data);
            if (response.data.code == 0) {
                localStorage.userData = JSON.stringify(response.data.data[0]);
                $location.path('cards');
            } else {
                alert(response.data.message);
            }
        });

    }

    $scope.register = function() {
        $http.post("/register", {
            email: $scope.email,
            password: $scope.password,
            phone: $scope.phone
        }).then(function(response) {
            console.log(response.data);
            if (response.data.code == 0) {
                $location.path('/')
            } else {
                alert(response.data.message);
            }
        });

    }
});