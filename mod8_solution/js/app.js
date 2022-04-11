(function() {
   'use strict';

   angular.module('NarrowItDownApp',        [])
      .controller('NarrowItDownController', NarrowItDownController)
      .service('menuSearchService',         MenuSearchService)
      .directive('foundItems',              FoundItemsDirective);

   MenuSearchService.$inject = ['$http'];
   function MenuSearchService($http) {
       var service = this;

       service.getMatchedMenuItems = function (searchTerm)
        {
           var requestConfig =
           {
               method: "GET",
               url:    "https://davids-restaurant.herokuapp.com/menu_items.json"
           };
           var onSuccess = function (response)
           {
               var sterm   = (searchTerm || "").toLowerCase();
               var hasTerm    = (sterm.length > 0);
               var hasData    = (response && response.data && response.data.menu_items);
               var foundItems = [];

               if (hasTerm && hasData)
               {
                   var responseItems = response.data.menu_items;
                   var index;

                   for (index = 0; index < responseItems.length; index++)
                   {
                       var currentItem = responseItems[index];
                       var safeDescription = (currentItem.description || "").toLowerCase();

                       if (safeDescription.indexOf(sterm) >= 0)
                       {
                           foundItems.push(currentItem);
                       }
                   }
               }

               return foundItems;
           };
           return $http(requestConfig).then(onSuccess);
        };
   }

   function FoundItemsDirective()
   {
       var config = {
           templateUrl: 'loader/find-items-template.html',
           scope: {
               list:       '< resultList',
               onRemove:   '&',
               checkError: '&'
           }
       };
       return config;
   }

   NarrowItDownController.$inject = ['menuSearchService'];
   function NarrowItDownController(menuSearchService)
   {
       var controller = this;

       controller.searchTerm  = "";
       controller.found       = [];
       controller.searched = false;

       controller.search = function ()
       {
           menuSearchService.getMatchedMenuItems(controller.searchTerm).then(function(response) {
               controller.found       = response;
               controller.searched = true;
           });
       };
       controller.removeItem = function (itemIndex)
       {
           controller.found.splice(itemIndex, 1);
       };
       controller.isError = function ()
       {
           return controller.searched && controller.found.length == 0;
       };
   }

})(window);
