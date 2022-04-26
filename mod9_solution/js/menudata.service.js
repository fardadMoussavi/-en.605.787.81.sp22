(function () {
  "use strict";

  //implementing req 5 hhtp calls

  angular.module("data").service("MenuDataService", MenuDataService).constant("APIBaseUrl", "https://davids-restaurant.herokuapp.com"); // define service and base url
  MenuDataService.$inject = ["$http", "APIBaseUrl"]; // mification pervantion

  function MenuDataService($http, APIBaseUrl)
  {
    this.getAllCategories = function ()
    {
      return $http(
      {
        method: "GET",
        url: APIBaseUrl +
         "/categories.json", // base usel + categories
      }).then((response) => {
        return response.data;
      });
    };

    this.getCategoryForShortname = function (categoryShortName)
    {
      return $http(
      {
        method: "GET",
        url: APIBaseUrl +
         "/categories.json",
      }).then((response) => {
        return (
          response.data
            .filter((category) =>
             category.short_name == categoryShortName)
            .at(0).name || null
        );
      });
    };

    this.getItemsForCategory = function (categoryShortName)
    {
      return $http(
      {
        method: "GET",
        url: APIBaseUrl +
         "/menu_items.json?category=" + categoryShortName,       
      }).then((response) => {
        return response.data.menu_items;
      });
    };
  }
})();
