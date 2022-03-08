(function () {
  // perevent leak step 11
    "use strict";
    // declering app per step 6
    var app = angular.module("LunchCheck", []);
  
    app.controller("LunchCheckController", LunchCheckController);
  
    // step 10
    LunchCheckController.$inject = ["$scope"];
  
    function LunchCheckController($scope) {
      $scope.boxInput = "";
      $scope.msg = "";
      $scope.buttonClicked = false;
      $scope.inputPresent = false;
  
      $scope.handleButtonClick = function (input) {
        $scope.buttonClicked = true;       

        let userItems = GetItems(input);
        
        if(IsUserInputPeresent(userItems) === false) {
          $scope.inputPresent = false;
          $scope.msg = "Please enter data first";
          return;
        }
        if(IsThereComma(input, userItems) === false)
        {
          $scope.inputPresent = false;
          $scope.msg = "Please use commas to separate inputs. such as : item 1, item2 or item 1, ,item2 ex - 1,2,123456,,1 is considered as 4 inputs";
          return;
        }
        $scope.inputPresent = true;

        if(IsMoreThan3(userItems) === false)
          $scope.msg =  "Enjoy!";
        else        
          $scope.msg = "Too much!";
         
      };
    }
    // check user input to ensure comma is used
    function IsThereComma(input, splitInput){
      if(splitInput.length < 2)
        return true;
      else if(input.includes(','))
        return true;
      else
        return false;
    }

    // extract items
    function GetItems(input){
      return input.split(",").filter((x) => x.trim().length > 0);
    }
    // check if user peresented input
    function IsUserInputPeresent(userItems)
    {
      if (userItems.length < 1)
        return false;
      else
        return true;
    }
    // Has user entered more than 3 items
    function IsMoreThan3(userItems)
    {
      if (userItems.length <= 3)
        return false;
      else
        return true;
    }
  })();