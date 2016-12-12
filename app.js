// MODULE
var checkersApp = angular.module("checkersApp", []);

// CONTROLLERS
checkersApp.controller("boardController", ["$scope", function($scope) {
  
  $scope.squares = [];
  $scope.squareCount = 64;

  for (var i = 0; i < $scope.squareCount; i++) {
    $scope.squares.push("");
  }

  var highlightTracker1, highlightTracker2, highlightTracker3, highlightTracker4, chosenPiece, redTurn = true, blueTurn = false;

  $scope.select = function(index){

    if (highlightTracker1 !== undefined) {
        highlightTracker1.classList.remove("highlight");
        highlightTracker1.removeEventListener("click", function(){move(highlightTracker1)});
      }
    if (highlightTracker2 !== undefined) {
      highlightTracker2.classList.remove("highlight");
      highlightTracker2.removeEventListener("click", function(){move(highlightTracker2)});
    }
    if (highlightTracker3 !== undefined) {
        highlightTracker3.classList.remove("highlight");
        highlightTracker3.removeEventListener("click", function(){move(highlightTracker3)});
      }
    if (highlightTracker4 !== undefined) {
      highlightTracker4.classList.remove("highlight");
      highlightTracker4.removeEventListener("click", function(){move(highlightTracker4)});
    }
      
    var selectedPieceSquare = document.getElementsByClassName("square")[index];

    if(selectedPieceSquare.childNodes.length === 2 && selectedPieceSquare.lastChild.classList.contains("red-piece") && redTurn === true) {
      chosenPiece = document.getElementsByClassName("square")[index].querySelector('.square > .red-piece');

      if (!document.getElementsByClassName("square")[index - 7].classList.contains("white") && document.getElementsByClassName("square")[index - 7].childNodes.length === 1) {
        document.getElementsByClassName("square")[index - 7].className += " highlight";
        highlightTracker1 = document.getElementsByClassName("square")[index - 7];
        highlightTracker1.addEventListener("click", function(){move(highlightTracker1)});
      }

      if (!document.getElementsByClassName("square")[index - 9].classList.contains("white") && document.getElementsByClassName("square")[index - 9].childNodes.length === 1) {
        document.getElementsByClassName("square")[index - 9].className += " highlight";
        highlightTracker2 = document.getElementsByClassName("square")[index - 9];
        highlightTracker2.addEventListener("click", function(){move(highlightTracker2)});
      }
    }

    if(selectedPieceSquare.childNodes.length === 2 && selectedPieceSquare.lastChild.classList.contains("blue-piece") && blueTurn === true) {

      chosenPiece = document.getElementsByClassName("square")[index].querySelector('.square > .blue-piece');

      if (!document.getElementsByClassName("square")[index + 7].classList.contains("white") && document.getElementsByClassName("square")[index + 7].childNodes.length === 1) {
        document.getElementsByClassName("square")[index + 7].className += " highlight";
        highlightTracker3 = document.getElementsByClassName("square")[index + 7];
        highlightTracker3.addEventListener("click", function(){move(highlightTracker3)});
      }

      if (!document.getElementsByClassName("square")[index + 9].classList.contains("white") && document.getElementsByClassName("square")[index + 9].childNodes.length === 1) {
        document.getElementsByClassName("square")[index + 9].className += " highlight";
        highlightTracker4 = document.getElementsByClassName("square")[index + 9];
        highlightTracker4.addEventListener("click", function(){move(highlightTracker4)});
      }
    }
    
  }

  function move(chosenTracker) {
    if (redTurn && chosenPiece !== undefined) {
      chosenTracker.appendChild(chosenPiece);
      redTurn = false;
      blueTurn = true;
      chosenTracker.removeEventListener("click", function(){move(chosenTracker)});
      chosenPiece = undefined;
    } else if (blueTurn && chosenPiece !== undefined) {
      chosenTracker.appendChild(chosenPiece);
      redTurn = true;
      blueTurn = false;
      chosenTracker.removeEventListener("click", function(){move(chosenTracker)});
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