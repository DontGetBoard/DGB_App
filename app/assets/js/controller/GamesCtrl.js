app.factory('Games', function($http, $q){

    var games = {

        games : false,

        getGames : function(){
            var deferred = $q.defer();
            if (games.games !== false){
                deferred.resolve(games.games);
            }else{
                $http({method: 'GET', url: './data/games.json'}).
                    success(function(data, status, headers, config) {
                        games.games = data;
                        deferred.resolve(games.games);
                    }).
                    error(function(data, status, headers, config) {
                        deferred.reject('Network Problem!!');
                    });
            } 
            return deferred.promise;
        }
    };
    return games;

});

app.controller('GamesCtrl', function($scope,$rootScope,Games){

    $('html,body').animate({scrollTop: 0});
    $rootScope.header = "Games"; 

    $scope.loading = true;
    $scope.games = Games.getGames().then(function(games){
        $scope.games = games;
        $scope.loading = false;
        setTimeout(function(){_masonry()},500);

    }, function(msg){
        $scope.games = [{
                    "title" : msg,
                    "date" : " Network Issue"
                }];
        setTimeout(function(){_masonry()},500);
    });
});