(function(){
    angular.module('apgApp',['JSRoutes']).controller('mainController', mainController);
    function mainController($scope){
        $scope.title = "front por APG";
    }
})();