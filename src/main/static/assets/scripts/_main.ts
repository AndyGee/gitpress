///<reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts"/>

angular.module('microprofileio-main', [
    'ngRoute',
    'ngStorage',
    'microprofileio-menu',
    'microprofileio-header',
    'microprofileio-footer',
    'microprofileio-projects',
    'microprofileio-contributors',
    'microprofileio-googlegroups',
    'microprofileio-twitter',
    'microprofileio-survey',
    'microprofileio-action',
    'microprofileio-faq',
    'microprofileio-blog',
    'microprofileio-presentations'
])

    .config([
        '$locationProvider', '$routeProvider',
        function ($locationProvider, $routeProvider) {
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: true
            });
            $routeProvider
                .when('/', {
                    templateUrl: 'app/templates/page_home.html'
                })
                .when('/page', {
                    templateUrl: 'app/templates/page_pages.html',
                    controller: ['$location', function ($location) {
                        $location.path('/page/frontpage.adoc');
                    }]
                })
                .when('/page/:resourceName*', {
                    templateUrl: 'app/templates/page_home.html',
                    controller: 'HomeController'
                })
                .when('/projects', {
                    templateUrl: 'app/templates/page_documents.html',
                    controller: ['microprofileioMenuService', function (menu) {
                        menu.setSelected('docs');
                    }]
                })
                .when('/forum', {
                    templateUrl: 'app/templates/page_forum.html',
                    controller: ['microprofileioMenuService', function (menu) {
                        menu.setSelected('forum');
                    }]
                })
                .when('/contributors', {
                    templateUrl: 'app/templates/page_contributors.html',
                    controller: ['microprofileioMenuService', function (menu) {
                        menu.setSelected('contributors');
                    }]
                })
                .when('/faq', {
                    templateUrl: 'app/templates/page_faq.html',
                    controller: ['microprofileioMenuService', function (menu) {
                        menu.setSelected('faq');
                    }]
                })
                .when('/blog/:resourceName*', {
                    templateUrl: 'app/templates/page_blog.html',
                    controller: ['microprofileioMenuService', '$scope', '$route', (menu, $scope, $route) => {
                        $scope.resource = $route.current.params['resourceName'];
                    }]
                })
                .when('/presentations', {
                    templateUrl: 'app/templates/page_presentations.html',
                    controller: ['microprofileioMenuService', function (menu) {
                        menu.setSelected('presentations');
                    }]
                })
                .when('/project/:configFile/:resourceName*', {
                    templateUrl: 'app/templates/page_project.html',
                    controller: 'ProjectPageController'
                })
                .when('/project/:configFile', {
                    templateUrl: 'app/templates/page_project.html',
                    controller: 'ProjectPageController'
                })
                .otherwise({
                    controller: ['$scope', '$location', 'microprofileioMenuService', function ($scope, $location, menu) {
                        $scope.path = $location.path();
                        menu.setSelected(null);
                    }],
                    templateUrl: 'app/templates/page_404.html'
                });
        }
    ])

    .controller('ProjectPageController', ['$route', '$scope', 'microprofileioMenuService', function ($route, $scope, menu) {
        $scope.configFile = $route.current.params['configFile'];
        $scope.resource = $route.current.params['resourceName'];
        menu.setSelected('docs');
    }])

    .controller('HomeController', ['$route', '$scope', 'microprofileioMenuService', function ($route, $scope, menu) {
        $scope.resource = $route.current.params['resourceName'];
        if (!$scope.resource) {
            $scope.resource = 'frontpage.adoc';
        }
        menu.setSelected('home');
    }])

    .run(['$rootScope', function ($rootScope) {
        $rootScope.baseFullPath = angular.element('head base').first().attr('href');
    }])

    .run(function () {
        // placeholder
    });
