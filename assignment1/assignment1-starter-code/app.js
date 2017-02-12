      var mainApp = angular.module("LunchCheck", []);

      mainApp.controller('LunchCheckController', LunchCheckController);

      LunchCheckController.$inject = ['$scope'];
      function LunchCheckController($scope){
        $scope.message = "";

        $scope.butt = function(){
          if($scope.lunch == null || $scope.lunch == " "){
            cont = 0;
            list = "";
          }else{
            list = $scope.lunch.split(',');
          }
          var cont = 0;
          for(var i=0; i<list.length; i++){
            cont++;
          }
          if(cont == 0){
            $scope.message = "Please enter data first";
          }
          if(cont > 0 && cont <= 3){
            $scope.message = "Enjoy!";
          }
          if(cont >= 4){
            $scope.message = "Too much";
          }
          
        } 
      };