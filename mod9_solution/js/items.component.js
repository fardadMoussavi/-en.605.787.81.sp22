(function () 
{
  "use strict";

  angular.module("MenuApp")
  .component("itemsList", 
  {
    templateUrl: "templates/items-list.html",
    bindings:
    {
      items: "<",
    },
  });
})();
