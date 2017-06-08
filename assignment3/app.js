(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.factory('MenuSearchService', MenuSearchService)
.directive('foundItems', foundItemsDirective);

function foundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: foundItemsDirectiveController,
    controllerAs: 'narrow',
    bindToController: true
  };

  return ddo;
}


function foundItemsDirectiveController() {
  var narrow = this;

}

NarrowItDownController.$inject = ['MenuSearchService', '$http'];
function NarrowItDownController(MenuSearchService, $http) {
    var narrow = this;
    narrow.myTitle = "Holi";
    var menu = MenuSearchService();

    
    narrow.action = function(){
        narrow.items = menu.getItems(narrow.plate);
    }
    
    narrow.removeItem = function (itemIndex) {
        if(narrow.items != null){
            menu.removeItem(itemIndex);
        }
      };
}
    
getMatchedMenuItems.$inject = ['$http', 'searchTerm'];
function getMatchedMenuItems($http, searchTerm) {
    var service = this;
    
    service.items = [];

    $http({
        url: "https://davids-restaurant.herokuapp.com/menu_items.json", 
        method: "GET"
    }).then(function(response) {
        service.items = angular.fromJson(response.data.menu_items);
    });
    
    var list = [];
    service.getItems = function (item) {
        var cont = 0;
        var bool = false;
        if(service.items != null){
            for(var i=0;i<service.items.length;i++){
                if(service.items[i].description.search(item) > 0){
                    list[cont] = service.items[i];
                    cont++;
                    bool = true;
                }
            }          
        }
        if(!bool){
            list = [];
            list[0] = {name: "Nothing found"};
        }
        return list;
    };
                    
  service.removeItem = function (itemIndex) {
    list.splice(itemIndex, 1);
  };
  
}
    
MenuSearchService.$inject = ['$http'];
function MenuSearchService($http){
    var factory = function(searchTerm){
        return new getMatchedMenuItems($http, searchTerm);
    };
    
    return factory;
}

})();
