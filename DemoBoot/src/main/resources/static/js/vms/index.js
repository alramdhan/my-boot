$(document).ready(function () {
	$('#userName').on('keypress',function(e) {
	    if(e.which == 13) {
    		$('#userPWD').focus(); 
    		$('#userPWD').select();
	    }
	});
	
	$('#userPWD').on('keypress',function(e) {
	    if(e.which == 13) {
	    	doLogin();
	    }
	});
});

function doLogin() {
	if (doLoginValidation() == false) {
		return;
	} else {
		doLoginProcess();
	}
}

function doLoginValidation() {
	var bitResult = true;

	if ($('#userName').val().length != 0) {
		$('#userName').removeClass("is-invalid");
		$('#userName').addClass("is-valid");
	} else {
		$('#userName').addClass("is-invalid");
		$('#userNameError').html("User is Empty.");
		return false;
	}

	if ($('#userPWD').val().length != 0) {
		$('#userPWD').removeClass("is-invalid");
		$('#userPWD').addClass("is-valid");
	} else {
		$('#userPWD').addClass("is-invalid");
		$('#userPWDError').html("Password is Empty.");
		return false;
	}

	return bitResult;
}

function doLoginProcess() {
	$('.u-loading-screen').css('display', 'block');
	var data = {
		userName:$('#userName').val(),
		userPWD:$('#userPWD').val()
	};
	
	$.ajax({
		url : "login",
		type : "POST",
		data:{
		   	data:JSON.stringify(data)
       	},
		success : function(response) {
			$('.u-loading-screen').css('display', 'none');
			if (isJson(response)) {
				window.location.href = "home";	
			}else {
				if (response == "") {
					gotoIndex();
				} else {
					alertDialog("System Message", response, 'login');
				}
			}
			doCloseModalAlert("login");
		},
		error : function(e, x, settings, exception) {
			$('.u-loading-screen').css('display', 'none');
			var error = errorMessage(e, exception);
			alertDialog("System Message", error, "error");
		}
	});
	doCloseModalAlert("error");
}