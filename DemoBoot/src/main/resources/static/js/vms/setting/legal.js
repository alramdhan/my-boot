$(document).ready(function () {
	$('#SPPKPDate').datetimepicker({
		defaultDate: new Date(),
		format: 'DD-MM-YYYY'
	});
	$('#NIBDate').datetimepicker({
		defaultDate: new Date(),
		format: 'DD-MM-YYYY'
	});
	$('#businessLicenseStartDate').datetimepicker({
		defaultDate: new Date(),
		format: 'DD-MM-YYYY'
	});
	$('#businessLicenseEndDate').datetimepicker({
		defaultDate: new Date(),
		format: 'DD-MM-YYYY'
	});
	$('#certOfCompRegStartDate').datetimepicker({
		defaultDate: new Date(),
		format: 'DD-MM-YYYY'
	});
	$('#certOfCompRegEndDate').datetimepicker({
		defaultDate: new Date(),
		format: 'DD-MM-YYYY'
	});
	
	$("#statPKP").on('change', function() {
		doSPPKPDate();
	});
	$("#addLegal").click(function(){
		doAddLegal();
	});
});

function getDataLegal(){
	$('.u-loading-screen').css('display', 'block');
	
	$.ajax({
	   url: "legal/getLegal",
       type: 'GET',
       success: function(response) {
    	  if(isJson(response)){
    		 $('.u-loading-screen').css('display', 'none');
    		 doSetDataLegal(JSON.parse(response));
    	  }else{
    		$('.u-loading-screen').css('display', 'none');
    		if(response == timeOut()){
    		    gotoIndex();
    		}else{
    			alertError(response);    
    		} 
    	  }
       },
       error: function (e, x, settings, exception) {
    	   errorHandle(e, exception);
       }
	});
}

function doSetDataLegal(value){
	$('#taxNo').val(value.taxNo);
	$('#taxAddress').val(value.taxAddress);
	$('#taxProvince').val(value.taxProvince);
	$('#taxCity').val(value.taxCity);
	$('#taxPostalCode').val(value.taxPostalCode);
	$("#statPKP").val(value.taxPKP);
	$("#NIBNo").val(value.nibno);
	$("#NIBDate_").val(value.nibdate);
	$("#businessLicenseNo").val(value.businessLicenseNo);
	$("#businessLicenseIssuedBy").val(value.businessLicenseIssuedBy);
	$('#businessLicenseStartDate_').val(value.businessLicenseStartDate);
	$('#businessLicenseEndDate_').val(value.businessLicenseEndDate);
	$('#certOfCompRegIssuedBy').val(value.certOfCompRegIssuedBy);
	$('#certOfCompRegNo').val(value.certOfCompRegNo);
	$('#certOfCompRegStartDate_').val(value.certOfCompRegStartDate);
	$('#certOfCompRegEndDate_').val(value.certOfCompRegEndDate);
	doSPPKPDate();
	let pkp = value.taxPKP;
	if(pkp == 0){
		$('#SPPKPDate').datetimepicker({
			defaultDate: new Date(),
			format: 'DD-MM-YYYY'
		});
	}else{
		$('#SPPKPDate_').val(value.sppkpdate);
	}
}

function doSPPKPDate(){
	let pkp = $("#statPKP").val();
	if(pkp == 0){
		$('#div_sppkp_date').removeClass('d-block');
		$('#div_sppkp_date').addClass('d-none');
	}else{
		$('#div_sppkp_date').removeClass('d-none');
		$('#div_sppkp_date').addClass('d-block');
	}
}

function doAddLegal(){
	let data = {
		taxNo: $('#taxNo').val(),
		taxAddress:"",
		/* taxProvince:"",
		taxCity:"", */
		taxSubdistrictID: 0,
		taxPostalCode:"",
		taxPKP: parseInt($("#statPKP").val()),
		sppkpdate:$('#SPPKPDate_').val(),
		nibno: $('#NIBNo').val(),
		nibdate: $('#NIBDate_').val(),
		businessLicenseNo: $('#businessLicenseNo').val(),
		businessLicenseType: 0,
		businessLicenseIssuedBy: $('#businessLicenseIssuedBy').val(),
		businessLicenseStartDate: $('#businessLicenseStartDate_').val(),
		businessLicenseEndDate: $('#businessLicenseEndDate_').val(),
		certOfCompRegNo: $('#certOfCompRegNo').val(),
		certOfCompRegIssuedBy: $('#certOfCompRegIssuedBy').val(),
		certOfCompRegStartDate: $('#certOfCompRegStartDate_').val(),
		certOfCompRegEndDate: $('#certOfCompRegEndDate_').val()
	}
	$.ajax({
	   url: "legal/addLegal",
       type: 'POST',
       data:{
    	  data:JSON.stringify(data)
       },
       success: function(response) {
    	  if(response == '1'){
    		 $('.u-loading-screen').css('display', 'none');
    		 alertSucces("Data Succesfully Saved.");
    		 getDataLegal();
    	  }else{
    		  	$('.u-loading-screen').css('display', 'none');
	    		if(response == timeOut()){
	    		    gotoIndex();
	    		}else{
	    			alertError(response);    
	    		}
    	   }
       },
       error: function (e, x, settings, exception) {
    	  errorHandle(e, exception);
       }
	}); 
}