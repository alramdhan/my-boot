function doChange(){
	if(doChangeValidation() == false){
		return;
	}
	doChangeProcess();
}

function doChangeValidation(){
	var bitResult=true;
	
	if($('#currentPassword').val().length != 0){
//		if($('#currentPassword').val().length < 8){
//			$('#currentPassword').addClass("is-invalid");
//			$("#currentPasswordError").html("Minimum length 8 Character.");
//			return false;
//		}else{
			$('#currentPassword').removeClass("is-invalid");
			$('#currentPassword').addClass("is-valid");
//		}
	}else{
		$('#currentPassword').addClass("is-invalid");
		$("#currentPasswordError").html("Password is Empty.");
		return false;
	}
	
	if($('#newPassword').val().length != 0){
		if($('#newPassword').val().length < 8){
			$('#newPassword').addClass("is-invalid");
			$("#newPasswordError").html("Minimum length 8 Character.");
			return false;
		}else{
			$('#newPassword').removeClass("is-invalid");
			$('#newPassword').addClass("is-valid");
		}
	}else{
		$('#newPassword').addClass("is-invalid");
		$("#newPasswordError").html("New Password is Empty.");
		return false;
	}
	
	if($('#confirmNewPassword').val().length != 0){
		if($('#confirmNewPassword').val().length < 8){
			$('#confirmNewPassword').removeClass("is-invalid");
			$('#confirmNewPassword').addClass("is-invalid");
			$("#confirmNewPasswordError").html("Minimum length 8 Character.");
			return false;
		}else{
			if($('#confirmNewPassword').val() != $('#newPassword').val()){
				$('#confirmNewPassword').removeClass("is-invalid");
				$('#confirmNewPassword').addClass("is-invalid");
  				$("#confirmNewPasswordError").html("Password did not match.");
  				return false;
			}else{
				$('#confirmNewPassword').removeClass("is-invalid");
  				$('#confirmNewPassword').addClass("is-valid");  					
			}
		}
	}else{
		$('#ConfirmNewPassword').addClass("is-invalid");
		$("#ConfirmNewPasswordError").html("Confirm New Password is Empty.");
		return false;
	}
	
	return bitResult;
}

function doChangeProcess(){
	$('.u-loading-screen').css('display', 'block');
	$.ajax({
	   url: "security/isPassword",
       type: 'POST', 
       data: {
    	   data:$('#currentPassword').val()
       },
       success: function(isPassword){
    	   if(isPassword == "1"){
    		  $.ajax({
    	 		   url: "security/save_change",
    	 	       type: 'POST', 
    	 	       data: {
    	 	    	   data:$('#confirmNewPassword').val()
    	 	       },
    	 	       success: function(isChange){
    	 	    	  if(isChange == "1"){
    	 	    		  $('.u-loading-screen').css('display', 'none');
    		    	  	  alertSucces("New Password is successfully changed.");
    	 	    	  }else{
    	 	    		  $('.u-loading-screen').css('display', 'none');
    	 	    		  if(isChange == timeOut()){
	   		    		       gotoIndex();
	   	    			  }else{
	   	    				  alertError(isChange);
	   	    			  }
    	 	    	  }
    	 	       },
    			   error : function(e, x, settings, exception) {
    				   errorHandle(e, exception);
    			   }
    			});
    			doCloseModalAlert("error");
    	   }else{
    		   $('.u-loading-screen').css('display', 'none');
    		   if(isPassword == "2"){
	    	   		alertError("Current Password is Wrong.");
    		   }else{
    			   if(isPassword == timeOut()){
	    		       gotoIndex();
    			   }else{
    				   alertError(isPassword);
    			   }
    		   }
    	   } 
       },
	   error : function(e, x, settings, exception) {
		   errorHandle(e, exception);
	   }
	});
}