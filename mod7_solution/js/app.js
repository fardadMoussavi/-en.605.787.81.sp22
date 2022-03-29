(function () {
  "use strict";

  var app = angular.module("ShoppingListCheckOff", []);
  // Required Filter with $$$ signs
  app.filter("priceTotal", function () 
  {
    return function (input)
    {
      return GetDollarSign(input);
    };
  });

  function GetDollarSign(input)
  {
    return "$$$" + input.toFixed(2);
  }
  // Required initial 5 Items
  var initialItems =
  [
    { name: "pop(s)", quantity: 10, pricePerItem: 22 },
    { name: "cookie(s)", quantity: 1, pricePerItem: 3 },
    { name: "ramen", quantity: 3, pricePerItem: 2 },
    { name: "fried rice(s)", quantity: 12, pricePerItem: 4 },
    { name: "meatballs", quantity: 11, pricePerItem: 1 },
  ];
  // create service
  app.service
  (
    "ShoppingListCheckOffService",
    CreateShoppingListCheckOffService(initialItems)
  );
  // service handler
  function CreateShoppingListCheckOffService(initialItems)
   {
    return function ShoppingListCheckOffService()
    {
      var controller = this;
      var pending = initialItems;
      var bought = [];

      controller.buyItem = function (idx)
      {
        var selectedItem = pending[idx];
        if (selectedItem.quantity < 1 || selectedItem.quantity == undefined)
        {
          alert("Allowed minimum quantity is 1. Value auto set to 1.");
          selectedItem.quantity = 1;
        }
        bought.push(selectedItem); // add to selected items list
        pending.splice(idx, 1); // remove from available list
      };
      controller.getPendingItems = function ()
      {
        return pending;
      };
      controller.getBoughtItems = function ()
      {
        return bought;
      }
    };
  }

  app.controller("ToBuyController", ToBuyController);
  ToBuyController.$inject = ["$scope", "ShoppingListCheckOffService"];
  function ToBuyController($scope, ShoppingListCheckOffService)
  {
    $scope.items = ShoppingListCheckOffService.getPendingItems();
    $scope.bought = function (idx)
    {
      ShoppingListCheckOffService.buyItem(idx);
    };
  }

  app.controller("AlreadyBoughtController", AlreadyBoughtController);
  AlreadyBoughtController.$inject = ["$scope", "ShoppingListCheckOffService"];
  function AlreadyBoughtController($scope, ShoppingListCheckOffService)
  {
    $scope.items = ShoppingListCheckOffService.getBoughtItems();
  }
})();