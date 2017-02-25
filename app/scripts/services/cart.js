'use strict';

/**
 * @ngdoc service
 * @name workRepoApp.Cart
 * @description
 * # Cart
 * Service in the workRepoApp.
 */
angular.module('workRepoApp')
  .service('Cart', function () {
    var productName = function(){
    	var name = "";
    	var fromChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    	for(var i = 0; i<5; i++)
    		name += fromChar.charAt(Math.floor(Math.random() * fromChar.length));
    	return name;
    };
    var itemObject = {
        items: []
    };
    var setCart = function(){
    	localStorage.setItem("cart",angular.toJson(itemObject));
    };
    this.getCart = function(){
    	return JSON.parse(localStorage.getItem("cart"));
    };

    this.addItem = function(){
    	itemObject = this.getCart();
    	if(!itemObject){
    		itemObject = {
		        items: []
		    };
    	}
    	itemObject.items.push({
            qty: 1,
            description: productName(),
            cost: Math.floor(10 + Math.random() * 900),
            id: itemObject.items.length
        });
        setCart();
        return itemObject;
    };

    this.remove = function (id) {
    	var cartItems = this.getCart();
    	for(var i = 0; i<cartItems.items.length; i++){
    		if (cartItems.items[i].id === id) {
    			cartItems.items.splice(i,1);
    			i--;
    		}
    	}
    	itemObject = angular.copy(cartItems);
    	setCart();
    	return cartItems;
    };

    this.clear = function() {
    	 localStorage.removeItem('cart');
    	 itemObject = {
    	 	items:[]
    	 };
    	 return itemObject;
    };

    this.persist = function(data) {
        var proceed = true;
        for(var i = 0; i<data.items.length; i++){
            if (!data.items[i].qty || isNaN(data.items[i].qty) || data.items[i].qty<1) {
                console.log(data.items[i].qty);
                proceed = false;
            }
        }
        if (!proceed) {
            return proceed;    
        }
        else{
            return data;
        }
    };

    this.changeQuantity = function (data){
        if(this.persist(data)){
        	itemObject = angular.copy(data);
        	setCart();
            return itemObject;
        }
        else{
            return false;
        }
    };

  });
