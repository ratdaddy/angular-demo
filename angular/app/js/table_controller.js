'use strict';

angular.module('stats', []).directive('url', function() {
  return function(scope, element, attrs) {
    scope.url = attrs.url
  }
});
/* Controllers */

function TableCtrl($scope, $http, $element) {

  $scope.gridData = []
  
  var dataSource = new kendo.data.DataSource({
    schema: {
      data: function(data) {
        console.log('call to data');
        return $scope.gridData
      }
    }
  });
  
  function getConfig() {
    $http.get($scope.url + '/config.json').success(function(config) {
      $($element).find('.grid').kendoGrid({
        columns: config,
        dataSource: dataSource
      });
      getData();
    });
  }
  
  var getData = function() {
    $http.get($scope.url + '/data.json').success(function(data) {
      console.log('read data from server');
      console.log(data);
      $scope.gridData = data;
    });
  }
  
  $scope.$watch('gridData', function() {
    console.log('gridData watch fired: ', $scope.gridData);
    dataSource.read();
  });
  
  $scope.$watch('url', function() {
    console.log('url watch fired: ', $scope.url);
    getConfig();
  });
  
  $scope.addMovie = function() {
    console.log('adding movie');
    this.gridData.push({ title: 'Star Wars: Revenge of the Sith', year: 2000 });
    dataSource.read();
  }
  
  $scope.getMovies = function() {
    getData();
  }
}
