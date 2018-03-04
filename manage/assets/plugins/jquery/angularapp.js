var scotchApp = angular.module('qrcodeApp', ['ngRoute']);

    // configure our routes
    scotchApp.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/login.html',
                controller  : 'loginController'
            })

            // route for the about page
            .when('/register', {
                templateUrl : 'pages/registration.html',
                controller  : 'registerController'
            })

            });
			// supplier profile
			scotchApp.controller('loginController' ,  function($scope ) {
                

                /**$http({
                    method: 'POST',
                    url: 'userauth.php',
                    data: encodedString,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })**/

                $scope.Login = function (){
                  Loginfunct();

                }
    });          

function Loginfunct(){
    var Uemail = $('#useremail').val();
    var Upassword = $('#userpassword').val();
  var values = JSON.stringify( { "email" : Uemail  , "password" : Upassword } );
 $.ajax({
     
        url: "http://ec2-52-200-186-135.compute-1.amazonaws.com/api_twominutes/index.php/api/login",
        type: "post",
        data: values ,
        success: function (response) {
            if(response.success){
            // set cookies
            setCookie("qrcodeapp",response.session, 1);
            setCookie("useremail",Uemail, 1);
            window.location = "./manage/";
            // redirect    
            }          
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }

    
    });
    
}
