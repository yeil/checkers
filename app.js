// MODULE
var checkersApp = angular.module("checkersApp", []);

// CONTROLLERS
checkersApp.controller("boardController", ["$scope", function($scope) {
  
  $scope.squares = [];
  $scope.squareCount = 64;

  for (var i = 0; i < $scope.squareCount; i++) {
    $scope.squares.push("");
  }

  var highlightTracker1, highlightTracker2, chosenPiece, redTurn = true, blueTurn = false;

  $scope.select = function(index){

    if (highlightTracker1 !== undefined) {
        highlightTracker1.classList.remove("highlight");
      }
    if (highlightTracker2 !== undefined) {
      highlightTracker2.classList.remove("highlight");
    }
      
    var selectedPieceSquare = document.getElementsByClassName("square")[index];

    if(selectedPieceSquare.childNodes.length === 2 && selectedPieceSquare.lastChild.classList.contains("red-piece") && document.getElementsByClassName("square")[index - 7].childNodes.length === 1 && document.getElementsByClassName("square")[index - 9].childNodes.length === 1 && redTurn === true) {

        chosenPiece = document.getElementsByClassName("square")[index].querySelector('.square > .red-piece');

        if (!document.getElementsByClassName("square")[index - 7].classList.contains("white")) {
          document.getElementsByClassName("square")[index - 7].className += " highlight";
          highlightTracker1 = document.getElementsByClassName("square")[index - 7];
          highlightTracker1.addEventListener("click", function(){redMove(highlightTracker1)});
        }

        if (!document.getElementsByClassName("square")[index - 9].classList.contains("white")) {
          document.getElementsByClassName("square")[index - 9].className += " highlight";
          highlightTracker2 = document.getElementsByClassName("square")[index - 9];
          highlightTracker2.addEventListener("click", function(){redMove(highlightTracker2)});
        }
    }

    if(selectedPieceSquare.childNodes.length === 2 && selectedPieceSquare.lastChild.classList.contains("blue-piece") && document.getElementsByClassName("square")[index + 7].childNodes.length === 1 && document.getElementsByClassName("square")[index + 9].childNodes.length === 1 && blueTurn === true) {

      chosenPiece = document.getElementsByClassName("square")[index].querySelector('.square > .blue-piece');

      if (!document.getElementsByClassName("square")[index + 7].classList.contains("white")) {
        document.getElementsByClassName("square")[index + 7].className += " highlight";
        highlightTracker1 = document.getElementsByClassName("square")[index + 7];
        highlightTracker1.addEventListener("click", function(){blueMove(highlightTracker1)});
      }

      if (!document.getElementsByClassName("square")[index + 9].classList.contains("white")) {
        document.getElementsByClassName("square")[index + 9].className += " highlight";
        highlightTracker2 = document.getElementsByClassName("square")[index + 9];
        highlightTracker2.addEventListener("click", function(){blueMove(highlightTracker2)});
      }
    }
    
  }

  function redMove(chosenTracker) {
    if (redTurn && chosenPiece !== undefined) {
      chosenTracker.appendChild(chosenPiece);
      redTurn = false;
      blueTurn = true;
      chosenTracker.removeEventListener("click", function(){redMove(chosenTracker)});
      chosenPiece = undefined;
    } 
  }

  function blueMove(chosenTracker) {
    if (blueTurn && chosenPiece !== undefined) {
      chosenTracker.appendChild(chosenPiece);
      redTurn = true;
      blueTurn = false;
      chosenTracker.removeEventListener("click", function(){blueMove(chosenTracker)});
      chosenPiece = undefined;
    }
  }

}]);

// DIRECTIVES

checkersApp.directive('colorDirective', function() {
  return function(scope, element, attrs) {
    scope.$watch(attrs.colorDirective, function(value) {
      
      var count = 0;
      
      for (var j = 0; j < 8; j++) {
        for (var k = 0; k < 8; k++) {
          if ((j + k) % 2 === 0) {
            document.getElementsByClassName("square")[count].className += " black";
          } else {
            document.getElementsByClassName("square")[count].className += " white";
          }
          count++;
        }
      }

      for (var l = 0; l < document.getElementsByClassName("square black").length; l++) {
        if (l < 12) {  
          document.getElementsByClassName("square black")[l].insertAdjacentHTML("beforeend", "<div class='blue-piece'></div>");
        }
        if (l > 19) {
          document.getElementsByClassName("square black")[l].insertAdjacentHTML("beforeend", "<div class='red-piece'></div>");
        }
      }  

    })
  }
})