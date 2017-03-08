(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('AlreadyBoughtController', AlreadyBoughtController)
.controller('ToBuyController', ToBuyController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
    var bought = this;
    
    bought.itemBought = ShoppingListCheckOffService.getBought();

    bought.push = ShoppingListCheckOffService.getPush();   

}
    
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
    var toBuy = this;
    
    toBuy.itemBuy = ShoppingListCheckOffService.getBuy();
    
    toBuy.action = function(index, quantity, name){
        ShoppingListCheckOffService.action(index, quantity, name);
        toBuy.empty = ShoppingListCheckOffService.getEmpty();
    }
    

    
}
    
function ShoppingListCheckOffService(){
    var service = this;
    
    var Tbuy = [{
                  name: "cookies",
                  quantity: 10
                },
                {
                  name: "fanta",
                  quantity: 10
                },
                {
                  name: "Messi",
                  quantity: 10
                },
                {
                  name: "Ronaldo",
                  quantity: 7
                },
                {
                  name: "Griezmann",
                  quantity: 7
                }
               ];
   
    var Tbought = [];
    
    var empty = false;
    
    var push = true;
    
    service.action = function(index, quantity, name){
        var item = {
          name: name,
          quantity: quantity
        };
        Tbought.push(item);
        
        Tbuy.splice(index, 1);
        if(Tbuy.length == 0){
            empty = true;
        }else{
            push = false;
        }
        
    }
    

    service.getBuy = function(){
        return Tbuy;
    }
    
    service.getBought = function(){
        return Tbought;
    }
    
    service.getEmpty = function(){
        return empty;
    }
    
    service.getPush = function(){
        return push;
    }
}

})();
