// MODULE
var checkersApp = angular.module("checkersApp", []);

// CONTROLLERS
checkersApp.controller("boardController", ["$scope", function($scope) {

  $scope.select = function(index){
    console.log(index);
  }

  $scope.redPieces = document.getElementsByClassName("red-piece");

}]);



var units = 8;

for (var i = 0; i < units; i++) {
  for (var j = 0; j < units; j++) {
    if ((i + j) % 2 === 0) {
      document.getElementsByClassName("board")[0].insertAdjacentHTML("beforeend", "<div class='square-white'></div>");
    } else {
      document.getElementsByClassName("board")[0].insertAdjacentHTML("beforeend", "<div class='square-black'></div>");
    }
  }
  
}

for (var k = 0; k < document.getElementsByClassName("square-black").length; k++) {
  if (k < 12) {  
    document.getElementsByClassName("square-black")[k].insertAdjacentHTML("beforeend", "<div class='red-piece' ng-click='select(redPieces)'></div>");
  }
  if (k > 19) {
    document.getElementsByClassName("square-black")[k].insertAdjacentHTML("beforeend", "<div class='blue-piece' ng-click='select()'></div>");
  }
}  