app.controller('UniqueGameCtrl', function($scope,$rootScope,$routeParams,Games){

    $scope.loading = true;
    $scope.game = Games.getOneGame($routeParams.refId).then(function(game){
        console.log(game);
        $scope.game = game;
        $scope.loading = false;
    }, function(msg){
        $scope.game = [{
                    "content" : msg,
                    "date" : " Network Issue"
                }]
    });
});