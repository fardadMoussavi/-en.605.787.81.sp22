(function () {
  angular.module("MenuApp").config(RoutesConfig);

  RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"]; // minification pervention
  function RoutesConfig($stateProvider, $urlRouterProvider)
  {
    $urlRouterProvider.otherwise("/");
    $stateProvider
    .state("home", // home state - default - just the template
    {
        url: "-en.605.787.81.sp22/mod9_solution/",
        templateUrl: "templates/home.html",
    })
    .state("categories", // categories state - template and controller
    {
      url: "/categories",
      templateUrl: "templates/categories.html",
      controller: "CategoryListController as categoryList",
      resolve:
      {
        categories: [
          "MenuDataService",
          function (MenuDataService)
          {
            return MenuDataService.getAllCategories();
          },
        ],
      },
    })
    .state("items", // items state - template and controller
    {
      url: "/categories/{categoryShortName}",
      templateUrl: "templates/items.html",
      controller: "ItemsListController as itemList",
      resolve:
      {
        category: [
          "$stateParams",
          "MenuDataService",
          function ($stateParams, MenuDataService)
          {
            return MenuDataService.getCategoryForShortname($stateParams.categoryShortName);
          },
        ],
        items: [
          "$stateParams",
          "MenuDataService",
          function ($stateParams, MenuDataService)
          {
            return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
          },
        ],
      },
    });
  }
})();
