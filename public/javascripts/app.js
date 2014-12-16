var app = angular.module('app', ['ngRoute','ngAnimate','ngSanitize']);

app.config(function($animateProvider) {
  $animateProvider.classNameFilter(/angular-animate/);
})

app.config(function($routeProvider, $httpProvider){
    $routeProvider
        .when('/', {templateUrl: 'partials/home.html', controller: HomeCtrl})
        .when('/profile', {templateUrl: '/profile', controller: ProfileCtrl})
        .when('/games', {templateUrl: 'partials/games.html'})
        .when('/games/add', {templateUrl: 'partials/games_add.html'})
        .when('/games/:refId', {templateUrl: 'partials/games_single.html', controller: 'UniqueGameCtrl'})
        .when('/friends', {templateUrl: 'partials/friends.html', controller: FriendsCtrl})
        .when('/nights', {templateUrl: 'partials/nights.html', controller: NightsCtrl})
        .when('/contibute', {templateUrl: 'partials/contibute.html', controller: ContributeCtrl})
        .when('/contact', {templateUrl: 'partials/contact.html', controller: ContactCtrl})
        .when('/signup', {templateUrl: '/signup'})
        .when('/login', {templateUrl: '/login'})
        .otherwise({redirectTo: '/'});
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    delete $httpProvider.defaults.headers.common['Content-Type'];
    delete $httpProvider.defaults.headers.common['Accept-Ranges'];

});


function HomeCtrl($rootScope, $http) { 
    $('html,body').animate({scrollTop: 0});
    $rootScope.header = "Welcome"; 
}

function ProfileCtrl($rootScope, $http) { 
    $('html,body').animate({scrollTop: 0});
    $rootScope.header = "The Company"; 
}

function FriendsCtrl($rootScope, $http) { 
    $('html,body').animate({scrollTop: 0});
    $rootScope.header = "Engineering"; 
}

function NightsCtrl($rootScope, $http) { 
    $('html,body').animate({scrollTop: 0});
    $rootScope.header = "Development"; 
}

function ContributeCtrl($rootScope, $http) { 
    $('html,body').animate({scrollTop: 0});
    $rootScope.header = "Development"; 
}

function ContactCtrl($rootScope, $http) { 
    $('html,body').animate({scrollTop: 0});
    $rootScope.header = "Contact"; 
}

function LogOutCtrl($rootScope, $http) { 
    $('html,body').animate({scrollTop: 0});
    $rootScope.header = "Contact"; 
}
