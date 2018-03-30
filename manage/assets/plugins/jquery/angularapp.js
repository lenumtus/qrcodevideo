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
                


                $scope.Login = function (){
                  Loginfunct();

                }
    }); 
    scotchApp.controller('registerController' ,  function($scope ) {
                

                $scope.Register = function (){
                  Registerfunct();

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
function Registerfunct(){
  var members_email = $('#members_email').val();
  var members_firstname = $('#members_firstname').val();
  var members_surname = $('#members_surname').val();
  var members_password = $('#members_password').val();
  var values = JSON.stringify( { "members_email":members_email,  "members_firstname":members_firstname ,"members_surname":members_surname ,"members_password":members_password ,"members_deleted":"1"} );
 $.ajax({
   
        url: "http://ec2-52-200-186-135.compute-1.amazonaws.com/api_twominutes/index.php/api/register",
        type: "post",
        data: values ,
        success: function (response) {
            console(response.success);
      if(response.success){
      window.location = "http://127.0.0.1/qrcodeapp/";
      // redirect    
      }      
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }

  
    });
  
}