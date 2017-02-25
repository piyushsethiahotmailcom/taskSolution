'use strict';

/**
 * @ngdoc function
 * @name workRepoApp.controller:DonationCtrl
 * @description
 * # DonationCtrl
 * Controller of the workRepoApp
 */
angular.module('workRepoApp')
  .controller('DonationCtrl', function ($scope) {
  	var _s = $scope;
  	_s.neededAmt = 167;
  	_s.amtToPay = 50;
    _s.addValue = function() {
		var valueToAdd = parseFloat(document.getElementById("amt").value)/10;
		var width = 0;
		var elem = document.getElementById("barId");
		if (!elem.style.width) {
			var barWidth = 83.3;
			_s.neededAmt = _s.neededAmt - (valueToAdd*10);
			elem.style.width = barWidth + valueToAdd + "%";
		}
		else{
			if (_s.neededAmt > 50) {
				_s.neededAmt = _s.neededAmt - (valueToAdd*10);
				if (_s.neededAmt < 50) {
					_s.amtToPay = _s.neededAmt;
				}
				width = parseFloat(elem.style.width.split("%")[0]);
				width = width + valueToAdd;
				elem.style.width = width + "%";
			}
			else{
				valueToAdd = parseInt(document.getElementById("amt").value);
				_s.neededAmt = _s.neededAmt - valueToAdd;
				_s.amtToPay = _s.neededAmt;
				width = parseFloat(elem.style.width.split("%")[0]);
				width = width + (valueToAdd/10);
				elem.style.width = width + "%";
			}
		}
	};
	_s.showMessage = function() {
		$("#dialogBox").css("display","block");
		//window.alert("Saved");
	};

	_s.closeDialogBox = function(){
		$("#dialogBox").css("display","none");
	};

	window.onclick = function(event) {
	    if (event.target.innerText == "X") {
	        $("#dialogBox").css("display","none");
	    }
	}

	_s.sharePost = function(){
		var url = "http://loktra.com";
		var text = "Yay, I donated!";
		window.open('http://twitter.com/share?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(text));
		window.open("https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(url)+"&description="+encodeURIComponent(text));
    };
    //seems like chrome doesn't allow to open multiple windows or tabs
    //so to check this functionality please use firefox;
  });
