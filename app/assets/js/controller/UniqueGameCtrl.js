app.controller('UniqueGameCtrl', function($scope,$rootScope,$routeParams,Games){

    $scope.loading = true;
    $scope.game = Games.getGames().then(function(games){
        $scope.game = games[$routeParams.refId];
        $scope.loading = false;
    }, function(msg){
        $scope.game = [{
                    "content" : msg,
                    "date" : " Network Issue"
                }]
    });
});