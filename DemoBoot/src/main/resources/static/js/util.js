function checkActivity(timeout, interval, elapsed) {
    if ($.active) {
        elapsed = 0;
        $.active = false;
        doGetSession();
    }
    if (elapsed < timeout) {
        elapsed += interval;
        setTimeout(function() {
            checkActivity(timeout, interval, elapsed);
        }, interval);
    } else {
    	doGetSession();
    }
}

function isJson(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

function isEmptyJSON(obj) {
	for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function isExistJSONKey(obj, key) {
    if(obj.hasOwnProperty(key)){
    	return true;
    }
            
    return false;
}

function isValidateEmail(email) {
  	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
			return true;
  	}else{
  	    return false;
  	}
}

function isbackSlash(data) {
  	if ((/\\/).test(data)){
		return true;
  	}else{
  	    return false;
  	}
}

function isNumeric(data) {
    var regExp = new RegExp("^\\d+$");
    var isValid = regExp.test(data);
    return isValid;
}

function isNullOrEmpty(data){
	return data === null || data === '';
}

function isEmpptyJSON(){
	return '{}';
}

function formatDateYYYYMMDD(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function formatDateDDMMYYYY(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('-');
}

function formatDateMMYYYY(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [month, year].join('-');
}

function alertDialog(title, message, alertID){
	$("#modalAlert").modal('show');
	$("#alertTitle").text(title);
	$("#alert").text(message);
	$("#alertID").val(alertID);
}

function alertMessage(title, message, alertID, headerColor){
	$("#alertTitle").text(title);
	$("#alert").text(message);
	$("#alertID").val(alertID);
	$('#alertMessage').removeClass("bg-primary-uncal")
	$('#alertMessage').css('background-color', headerColor)
	$("#modalAlert").modal('show');
}

function confirmDialog(title, message, confirmID){
	$('#modalConfirm').modal('show');
   	$("#confirmTitle").text(title);
   	$("#confirm").text(message);
	$("#confirmID").val(confirmID);
}

function hideDialog(modalID){
	modalID.modal('hide');
}

function showModal(modalID){
	modalID.modal({
		backdrop: 'static', 
		keyboard: false
	});
}

function doGetSession(){
	$.ajax({
		url: "session", 
		type:'POST',
		data:{},
		success:function(response){
			if(response == timeOut()){
			 	gotoIndex();
			}
		}
	});
}

function errorMessage(e, exception){
	 let message;
	 let statusErrorMap = {
        '400' : "Server understood the request, but request content was invalid.",
        '401' : "Unauthorized access.",
        '403' : "Forbidden resource can't be accessed.",
        '405' : "Method Not Allowed.",
        '500' : "Internal server error.",
        '503' : "Service unavailable."
    };
    if (e.status) {
        message =statusErrorMap[e.status];
       if(!message){
             message="Unknown Error \n.";
        }
    }else if(exception=='parsererror'){
        message="Error.\nParsing JSON Request failed.";
    }else if(exception=='timeout'){
        message="Request Time out.";
    }else if(exception=='abort'){
        message="Request was aborted by the server";
    }else {
        message="Unknown Error \n.";
    }
    
    return message;
}

function doCloseModalAlert(data){
	$('#okAlert').click(function() {
		if($('#alertID').val() == data) {
			$('#modalAlert').modal('hide');
		}
    });
}
function gotoIndex(){
	$('.u-loading-screen').css('display', 'none');
	window.location.href = "/MCCI-B2B";
}

function timeOut(){
	return "TimeOut";
}

function doFormatCurrency(data){
	let h = parseInt(data).toLocaleString(); 
	return h;
}

function alertSucces(message){
	Swal.fire({
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 1500
    });
}

function alertError(message){
	Swal.fire({
        icon: "error",
        title: message,
        showConfirmButton: false,
        timer: 1500
    });
}

function errorHandle(e, exception){
	$('.u-loading-screen').css('display', 'none');
    let error = errorMessage(e, exception);
    alertError(error);
}

function doReadOnly(element){
	$('#'+element).attr('readonly', true);
	$('#'+element).css('background-color', 'white');
}

function doReadOnlyButton(element){
	$('#'+element).attr('disabled', true);
}

function doWrite(element){
	$('#'+element).attr('readonly', false);
	$('#'+element).css('background-color', 'white');
}

function doWriteButton(element){
	$('#'+element).attr('disabled', false);
}
function doFocusValidation(source, desc){
	if($('#'+desc+'').val().length == 0){
		$('#'+desc+'').removeClass("is-invalid");
		$('#'+desc+'').removeClass("is-valid");
	}
	$('#'+source+'').focus(); 
	$('#'+source+'').select();
}
function doFocus(source){
	$('#'+source+'').focus(); 
	$('#'+source+'').select();
}

function doRemoveValidation(desc){
	if($('#'+desc+'').val().length == 0){
		$('#'+desc+'').removeClass("is-invalid");
		$('#'+desc+'').removeClass("is-valid");
	}
}
function doAvatar(data, profile){
	if(!isNullOrEmpty(profile)){
		document.getElementById(''+data+'').setAttribute(
		  	'src', 'data:image/png;base64,'+profile+''
	  	);
	}
}

function doValidateInputFile(element, data){
	const allowedExtensions =  ['pdf','doc','docx'],
    sizeLimit = 2000000; // byte
	
	    // destructuring file name and size from file object
	const { name:fileName, size:fileSize } = element[0].files[0];
	/*
	* if filename is apple.png, we split the string to get ["apple","png"]
	* then apply the pop() method to return the file extension
	*
	*/
	const fileExtension = fileName.split(".").pop();
	/* 
	check if the extension of the uploaded file is included 
	in our array of allowed file extensions
	*/
	if(!allowedExtensions.includes(fileExtension)){
		Swal.fire({
			icon: 'error',
			  title: 'file type not allowed',
			})
		data.text("");
		element[0].value = null;
	}else if(fileSize > sizeLimit){
		Swal.fire({
			icon: 'error',
			  title: 'file size too large (Max Size : 2Mb)',
			})
		data.text("");
		element[0].value = null;
	}else{
		data.val($(element[0]).val().replace(/.*(\/|\\)/, ''));
	}
}