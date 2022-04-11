(function() {
   'use strict';

   angular.module('NarrowItDownApp',        [])
      .controller('NarrowItDownController', NarrowItDownController) // controller used by html
      .service('menuSearchService',         MenuSearchService) // type of service
      .directive('foundItems',              FoundItemsDirective); // directive

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
               return HandleSucess(searchTerm, response);
           };
           return $http(requestConfig).then(onSuccess);
        };
   }

   function HandleSucess(searchTerm, response)
   {
    var sterm   = (searchTerm || "").toLowerCase();
    var foundItems = [];

    if (sterm.length > 0 &&
        response &&
        response.data &&
        response.data.menu_items)
    {
        var rItems = response.data.menu_items;
        var index;
        for (index = 0; index < rItems.length; index++)
        {
            var description = (rItems[index].description || "").toLowerCase();
            if (description.indexOf(sterm) >= 0)
            {
                foundItems.push(rItems[index]);
            }
        }
    }
    return foundItems;
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
