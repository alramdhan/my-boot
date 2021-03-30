function doSendForgot(){
	$('.u-loading-screen').css('display', 'block');
	$.ajax({
		url : "forgot_password",
		type : "POST",
		data:{
			data:$('#UserName').val()
		},
		success : function(data) {
			$('.u-loading-screen').css('display', 'none');
			if (isJson(data)) {
				$('#div_reset_password').empty();
				let div = '';
				
				div +="<div class='text-left'>";
				div +="		<h1 class='h4 text-gray-900 mb-5 font-weight-bold'>Check your email</h1>";
				div +="</div>";
				div +="<div class='form-group'>";
				div +="		<label style='font-size: 16px; justify-content: flex-start;'>";
				div +="			We've sent an email "+JSON.parse(data).userEmail+". Clik the link in the email to reset your password.";
				div +="		</label>"; 
				div +="		<br>"; 
				div +="		<br>"; 
				div +="		<label style='font-size: 16px; justify-content: flex-start;'>";
				div +="			if you don't see the email, check other placeit might be, like your junk, spam, social, or other folders.";
				div +="		</label>";
				div +="</div>";
				div +="<input type='submit' class='btn btn-primary-vms col-sm-2' value='Ok' onclick='gotoIndex()'>";
				div +="<hr>";
				
				$('#div_reset_password').append(div);
			}else {
				if (data == "") {
					gotoIndex();
				} else {
					$('#error_message').html(data);
				}
			}
		},
		error : function(e, x, settings, exception) {
			$('.u-loading-screen').css('display', 'none');
			var error = errorMessage(e, exception);
			alertDialog("System Message", error, "error");
		}
	});
	doCloseModalAlert("error");
}

function doNewPassword(){
	if (doNewValidation() == false) {
		return;
	} else {
		doNewProcess();
	}
}

function doNewValidation() {
	var bitResult = true;

	if ($('#newUserPWD').val().length != 0) {
		if ($('#newUserPWD').val().length < 8) {
			$('#newUserPWD').addClass("is-invalid");
			$('#newUserPWDError').html("Minimum 8 Character.");
			return false;
		} else if ($('#newUserPWD').val().length >= 21) {
			$('#newUserPWD').addClass("is-invalid");
			$('#newUserPWDError').html("Maximum length 20 Character.");
			return false;
		} else {
			$('#newUserPWD').removeClass("is-invalid");
			$('#newUserPWD').addClass("is-valid");
		}
	} else {
		$('#newUserPWD').addClass("is-invalid");
		$('#newUserPWDError').html("New Password is Empty.");
		return false;
	}
	
	if ($('#confUserPWD').val().length != 0) {
		if ($('#confUserPWD').val().length < 8) {
			$('#confUserPWD').addClass("is-invalid");
			$('#confUserPWDError').html("Minimum 8 Character.");
			return false;
		} else if ($('#confUserPWD').val().length >= 21) {
			$('#confUserPWD').addClass("is-invalid");
			$('#confUserPWDError').html("Maximum length 20 Character.");
			return false;
		} else {
			$('#confUserPWD').removeClass("is-invalid");
			$('#confUserPWD').addClass("is-valid");
		}
	} else {
		$('#confUserPWD').addClass("is-invalid");
		$('#confUserPWDError').html("Confirmation Password is Empty.");
		return false;
	}
	
	if($('#confUserPWD').val() != $('#newUserPWD').val()){
		$('#confUserPWD').addClass("is-invalid");
		$('#confUserPWDError').html("Confirmation Password did not match.");
		return false;
	}

	return bitResult;
}

function doNewProcess(){
	$('.u-loading-screen').css('display', 'block');
	let data = {
		newUserPWD:$('#newUserPWD').val(),
		confUserPWD:$('#confUserPWD').val(),
		iVal:$('#iVal').val()
	};
	
	$.ajax({
		url : "new_password",
		type : "POST",
		data:{
			data:JSON.stringify(data)
		},
		success : function(data) {
			$('.u-loading-screen').css('display', 'none');
			if(data == "1"){
				$('#div_new_password').empty();
				let div = '';
				
				div +="<div class='text-left'>";
				div +="<h1 class='h4 text-gray-900 mb-5 font-weight-bold'>Password has been reset.</h1>";
				div +="</div>";
				div +="<button class='btn btn-primary-vms btn-user col-sm-2' onclick='gotoIndex()'>Login</button>";
				
				$('#div_new_password').append(div);
			}else {
				if (response == "") {
					gotoIndex();
				} else {
					alertDialog("System Message", response, 'new');
				}
			}
			doCloseModalAlert("new");
		},
		error : function(e, x, settings, exception) {
			$('.u-loading-screen').css('display', 'none');
			var error = errorMessage(e, exception);
			alertDialog("System Message", error, "error");
		}
	});
	doCloseModalAlert("error");
}