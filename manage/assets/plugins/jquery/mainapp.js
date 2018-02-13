
function openmodal(video_id , video_status , video_path , qrcode_path , video_title){ 
	$('#video_info').html('<h4>'+video_title+'</h4><video src="'+ video_path +'"   controls style="height:180px;"></video>');
	$('#qrcode').html('<img src="'+qrcode_path+'"></img>');
	$('#videoModal').modal('show');
	
}
function openaddvideomodal(){		
				$('#addvideoModal').modal('show'); 
}
$("#loginb").click(function(){ 
				Login();
			});	
//////////////////////////////////////////////// checklogin ////////////////////////

function initmaster(){
	var Uemail = getCookie("useremail");
	var session = getCookie("qrcodeapp");
	//console.log
  var values = JSON.stringify( { "email" : Uemail  , "session_id" : session } );
 $.ajax({
	 
        url: "http://ec2-52-200-186-135.compute-1.amazonaws.com/api_twominutes/index.php/api/login",
        type: "post",
        data: values ,
        success: function (response) {
			if(response.success){
			window.location = "http://127.0.0.1/qrcodeapp/manage/"+session;  
			}else{
				window.location = "http://127.0.0.1/qrcodeapp/";
				
			}		   
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }

	
    });
	
	
}	

////////////////////////////////////////url /////////////////
$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	return results[0];
}
		
/////////////////////////////////////////////////////////////Login ///////////////////////////////
function Login(){
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
			setCookie("qrcodeapp",response.session, 365);
			setCookie("useremail",Uemail, 365);
			window.location = "http://127.0.0.1/qrcodeapp/manage/";
			// redirect    
			}		   
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }

	
    });
	
}
///////////////////////////////////////////////////////////// manipulate cookies /////////////////////

   function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  

}
///////////////////////////////////////////////////////////// add a video ///////////////////////

function get_user_video(){
  var values = JSON.stringify( { "member_id" : 12 } );
   $("#videocard").html('<div class="col-md-12" ><h4 class="card-title">Gallery page</h4><h6 class="card-subtitle m-b-20 text-muted">you can make gallery like this</h6></div>');
 $.ajax({
	 
        url: "http://ec2-52-200-186-135.compute-1.amazonaws.com/api_twominutes/index.php/api/get_user_videos",
        type: "post",
        data: values ,
        success: function (response) {
           var videocard = ''; 
           for (var i = 0 ; i < response.length ; i++){
			   
			  videocard += build_video_card(response[i]);
			  
		
		   }	   
           $("#videocard").append(videocard);    
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }

	
    });
	 
	$("#videocard").append('<div class="col-md-7 col-4 align-self-center">'+
                       '<div class="d-flex m-t-10 justify-content-end">'+
        
                            '<div class="">'+
                                '<button id="add_video" onclick="openaddvideomodal()" class="right-side-toggle waves-effect waves-light btn-success btn btn-circle btn-sm pull-right m-l-10"><i class="ti-user text-white"></i></button>'+
                            '</div>'+
                        '</div>'+
					
                    '</div>');
	
}
///////////////////////////////// video object /////
function urldecode(url) {
  return decodeURIComponent(url.replace(/\+/g, ' '));
}
/////////////////////////////// build video card ////////////

function build_video_card( video ){ 	
	var video_path = urldecode(video.videos_path);
	var qrcode_path = urldecode(video.qrcode_path);
	var title = urldecode(video.qrcode_path);
	var html_card = '<div class="col-lg-3 col-md-6">'+
                        '<div class="card">'+
                            '<div class="el-card-item">'+
                                '<div class="el-card-avatar el-overlay-1">'+
                                    '<video src="assets/images/big/video1.mp4"  controls style="height:180px;"></video>'+
                                    '<div class="el-overlay">'+
                                        '<ul class="el-info">'+
                                            '<li><a id="videobutton" onclick="openmodal(\'' + video.videos_id + '\' , \'' + video.videos_status + '\', \'' + video_path + '\', \'' + qrcode_path + '\', \'' + title + '\')" class="btn default btn-outline image-popup-vertical-fit"><i class="icon-magnifier"></i></a></li>'+
                                            '<li><a class="btn default btn-outline" href="javascript:void(0);"><i class="icon-link"></i></a></li>'+
                                        '</ul>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="el-card-content">'+
                                    '<h3 class="box-title">Project title</h3> <small>subtitle of project</small>'+
                                    '<br/> </div>'+
                            '</div>'+
                        '</div>'+
                    '</div>';

	 var html_video = html_card ;
	  return html_video;
	
	
}




////////////////////////////////////////////////////////////////

//////////////////////////////////// upload video ///////////

			
			$("#submitvideo").submit(function(e) {
    e.preventDefault();    
    var formData = new FormData(this);

    $.ajax({
        url: 'http://ec2-52-200-186-135.compute-1.amazonaws.com/api_twominutes/index.php/api/upload_video/',
        type: 'POST',
        data: formData,
        success: function (data) {
            alert(data)
        },
        cache: false,
        contentType: false,
        processData: false
    });
});


//////////////////////////////////////////////////////////////
function loadvideo(){
		get_user_video();
	}
