
function openmodal(video_id , video_status , video_path , qrcode_path , video_title){ 
  $('#myModalLabel').html(video_title);
	$('#video_info').html('<div class="row"><div class="col-lg-6 col-md-6">'+
                        '<div class="card">'+
                            '<div class="card-body">'+
                                '<div class="d-flex flex-row">'+
                                    '<div class="round round-sm align-self-center round-info"><i class="ti-hand-point-up"></i></div>'+
                                    '<div class="m-l-10 align-self-center">'+
                                       ' <h6 class="m-b-0 font-light">100</h6>'+
                                        '<h6 class="text-muted m-b-0">likes</h6></div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div><div class="col-lg-6 col-md-6">'+
                        '<div class="card">'+
                            '<div class="card-body">'+
                                '<div class="d-flex flex-row">'+
                                    '<div class="round round-sm align-self-center round-info"><i class="fa fa-eye"></i></div>'+
                                    '<div class="m-l-10 align-self-center">'+
                                       ' <h6 class="m-b-0 font-light">23</h6>'+
                                        '<h6 class="text-muted m-b-0">Views</h6></div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div></div><video src="'+ video_path +'"   controls style="height:180px;"></video>');
	$('#qrcode').html('<button type="button" id="downloadqrcode" onclick="saveFile1(\'' + qrcode_path + '\')" crossorigin="anonymous" class="btn waves-effect waves-light btn-primary">Download Qrcode</button><img src="'+qrcode_path+'"></img>');
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
	var ret = false ;
	var Uemail = getCookie("useremail");
	var session = getCookie("qrcodeapp");
	if(Uemail && session){
		
		ret = true
		
	}
	return ret ;
	
}	
///////////////////////////////
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
			setCookie("qrcodeapp",response.session, 1);
			setCookie("useremail",Uemail, 1);
			window.location = "http://127.0.0.1/qrcodeapp/manage/";
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
            console.log(response.success);
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
  var values = JSON.stringify( { "member_email" : getCookie("useremail") } );
   $("#videocard").html('<div class="col-md-12" ></div>');
 $.ajax({
	 
        url: "http://ec2-52-200-186-135.compute-1.amazonaws.com/api_twominutes/index.php/api/get_user_videos",
        type: "post",
        data: values ,
        success: function (response) {
           var videocard = ''; 
           for (var i = 0 ; i < 7 ; i++){
			   
			  videocard += build_video_card(response[i]);
			  
		
		   }	   
           $("#videocard").append(videocard);    
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }

	
    });
	 
	/**$("#videocard").append(
                       '<div class="d-flex m-t-10 justify-content-end">'+
        
                            '<div class="">'+
                                '<button id="add_video" onclick="openaddvideomodal()" class="right-side-toggle waves-effect waves-light btn-success btn btn-circle btn-sm pull-right m-l-10"><i class="ti-user text-white"></i></button>'+
                            '</div>'+
                        '</div>'
					);**/
	
}
///////////////////////////////// video object /////
function urldecode(url) { 
  return decodeURIComponent(url.replace(/\+/g, ' '));
}
/////////////////////////////// build video card ////////////

function build_video_card( video ){ 	
	var video_path = urldecode(video.videos_path);
	var qrcode_path = urldecode(video.qrcode_path);
	var title = urldecode(video.videos_title);
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
                                    '<h3 class="box-title">'+video.videos_title+'</h3><div class="row"><div class = "col-lg-3 col-md-6"><span class="badge badge-primary">11 views</span></div><div class = "col-lg-3 col-md-6"><span class="badge badge-info">100 likes</span></div></div>'+
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
    var Uemail = getCookie("useremail");
    $("#member_email_id").val(Uemail) ;
    console.log($("#member_email_id").val());
    var formData = new FormData(this);
            var options = {
     theme:"sk-circle",
     message:'Upload the video ....',
     backgroundColor:"#1847B1",
     textColor:"white"
};

   HoldOn.open(options);
    $.ajax({
        url: 'http://ec2-52-200-186-135.compute-1.amazonaws.com/api_twominutes/index.php/api/upload_video/',
        type: 'POST',
        data: formData,
        success: function (data) {
            HoldOn.close();
            $('#addvideoModal').modal('toggle'); 
            alert(data)
        },
        cache: false,
        contentType: false,
        processData: false
    });
});

//////////////////////////// download qrcode /////////////////
  function saveFile(url){ alert(url);}
  function saveFile1(url) {
  // Get file name from url.
  var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'blob';
  xhr.onload = function() {
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
    a.download = filename; // Set the file name.
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    delete a;
  };
  xhr.open('GET', url);
  xhr.setRequestHeader("Access-Control-Allow-Origin","anonymous");
  xhr.send();
}
//////////////////////////////////////////////////////////////

function loadvideo(){
	    if(initmaster()){
		get_user_video();
		}else {
		  window.location = "http://127.0.0.1/qrcodeapp/";	
			
		}
		
	}
//////////////////////////////////////////////////// angular //////////

  /////////////////////////////////////////////////////////////////////////////
