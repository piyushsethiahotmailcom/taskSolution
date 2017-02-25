'use strict';

/**
 * @ngdoc function
 * @name workRepoApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the workRepoApp
 */
angular.module('workRepoApp')
  .controller('ProductCtrl', function ($scope, Cart, $location) {
  	var _s = $scope;
    _s.showError = false;
    _s.itemObject = Cart.getCart();

    _s.goTODonationPage = function(){
    	$location.url("donation");
    };

    _s.addItem = function() {
    	_s.itemObject = JSON.parse(JSON.stringify(Cart.addItem()));
    };

    _s.removeItem = function(id) {
        _s.itemObject = JSON.parse(JSON.stringify(Cart.remove(id)));
    };

    _s.ClearCart = function(){
    	_s.itemObject = JSON.parse(JSON.stringify(Cart.clear()));
    };

    _s.qtyChange = function(){
    	if(!Cart.changeQuantity(_s.itemObject)){
            _s.showError = true;
        }
        else{
            _s.showError = false;
        }
    };
    _s.total = function() {
        var total = 0;
        if (_s.itemObject) {
        	angular.forEach(_s.itemObject.items, function(item) {
	            total += item.qty * item.cost;
	        });
        }
        return total;
    };
  });
