$(document).ready(function () {
	$("#update").click(function(){
		$('.u-loading-screen').css('display', 'block');
		let data = {
			userName : $('#username').val(),
			userFullName : $('#fullname').val(),
			userEmail : $('#email').val()
		}
		$.ajax({
		   url: "account/addAccount",
		   type: 'POST',
	       data: {
	    	   data : JSON.stringify(data),
	       },
	       success: function(response) {
	    	   $('.u-loading-screen').css('display', 'none');
	    	   if(response == '1'){
	    		   $('#div_user').text($('#fullname').val());
	    		   alertSucces("Data Succesfully Changed");
	    	   }else{
	    		   alertError(error);
	    	   }
	    	   doCloseModalAlert("acc");
	       },
	       error: function (e, x, settings, exception) {
	           errorHandle(e, exception);
	       }
		});
	});
});

function getDataAccount(){
	$('.u-loading-screen').css('display', 'block');
	$.ajax({
	   url: "account/getAccount",
       type: 'GET',
       success: function(response) {
    	  if(isJson(response)){
    		 $('.u-loading-screen').css('display', 'none');
    		 doSetData(JSON.parse(response));
    	  }else{
    		$('.u-loading-screen').css('display', 'none');
    		if(response == timeOut()){
    		    gotoIndex();
    		}else{
    			alertDialog("System Message", response, 'item');    
    		} 
    	  }
	  	  doCloseModalAlert("item");  
       },
       error: function (e, x, settings, exception) {
    	   errorHandle(e, exception);
       }
	});
	doCloseModalAlert("error");
}

function doSetData(value){
	$('#username').val(value.userName);
	$('#fullname').val(value.userFullName);
	$('#email').val(value.userEmail);
}