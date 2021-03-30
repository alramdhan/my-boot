$(document).ready(function () {
	$('#createDateAkta').datetimepicker({
		defaultDate: new Date(),
		format: 'DD-MM-YYYY'
	});
	$('#beritaNegara').datetimepicker({
		defaultDate: new Date(),
		format: 'DD-MM-YYYY'
	});
	$('#pengesahanAkta').datetimepicker({
		defaultDate: new Date(),
		format: 'DD-MM-YYYY'
	});
	
	$("#addDeed").click(function(){
		doAddDeed();
	});
});

function getDataDeed(){
	$('.u-loading-screen').css('display', 'block');
	$.ajax({
	   url: "deed/getDeed",
       type: 'GET',
       success: function(response) {
    	  if(isJson(response)){
    		 $('.u-loading-screen').css('display', 'none');
    		 doSetDataDeed(JSON.parse(response));
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
	
function doSetDataDeed(value){
	$('#aktaPerusahaan').val(value.deedName);
	$('#nomorAkta').val(value.deedNo);
	$('#createDateAkta_').val(value.createDate);
	$('#beritaNegara_').val(value.stateNewsDate);
	$('#pengesahanAkta_').val(value.endorsementDate);
	$('#noPengesahan').val(value.endorsemenNo);
	$('#namaNotaris').val(value.notarisName);
	
	$('#aktaDokumen').val(value.documentDeed);
	
	doListAdministrator(value.tobVendorDeedAdministrator.administratorID);
	$('#namaAkta').val(value.administratorName);
	$('#nomorKtpPengurus').val(value.administratorIdentityNo);
	$('#ktpPengurus').val(value.administratorIdentity);
	$('#noNpwpPengurus').val(value.administratorTaxNo);
	$('#telpPengurus').val(value.administratorPhone);
}
	
function doListAdministrator(value){
	$('.u-loading-screen').css('display', 'block');
	$.ajax({
	   url: "deed/getListAdministrator",
       type: 'GET', 
       success: function(response){
    	   $('.u-loading-screen').css('display', 'none');
    	   var opt = "";
    	   $.each(response, function(key, value){
    		   opt +="<option value="+value.administratorID+">"+value.administratorDescription+"</option>";
    	   });
		   $('#pengurusAkta').html(opt);
		   if(value != 0){
			   $('#pengurusAkta').val(value);
		   }else{
			   $('#pengurusAkta').val($('#pengurusAkta option:first').val());
		   }
       },
	   error : function(e, x, settings, exception) {
		   errorHandle(e, exception);
	   }
	});
}

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}
	
function doAddDeed(){
	
	let data = {
		deedName:$('#aktaPerusahaan').val(),
		deedNo:$('#nomorAkta').val(),
		createDate:$('#createDateAkta_').val(),
		stateNewsDate:$('#beritaNegara_').val(),
		endorsementDate:$('#pengesahanAkta_').val(),
		endorsemenNo:$('#noPengesahan').val(),
		notarisName:$('#namaNotaris').val(),
		tobVendorDeedAdministrator : {
			administratorID:parseInt($('#pengurusAkta').val())
		},
		documentDeed:$("#aktaDokumen").val(),
		administratorName:$('#namaAkta').val(),
		administratorIdentityNo:$('#nomorKtpPengurus').val(),
		administratorIdentity:$('#ktpPengurus').val(),
		administratorTaxNo:$('#noNpwpPengurus').val(),
		administratorPhone:$('#telpPengurus').val()
	};
	
	
	let akta = $("#filesAkta");
	let ktp = $("#filesKtp");
	
	let formData = new FormData();
	formData.append('akta', akta[0].files[0]);
	formData.append('ktp', ktp[0].files[0]);
	formData.append('data', JSON.stringify(data));
	
	$('.u-loading-screen').css('display', 'block');
	$.ajax({
	   url: "deed/addDeed",
       type: 'POST',
       enctype: 'multipart/form-data',
       data: formData,
       processData: false,
	   contentType: false,
	   cache: false,
       timeout: 600000,
       success: function(response) {
    	  if(response == '1'){
    		 $('.u-loading-screen').css('display', 'none');
    		 alertSucces("Data Succesfully Saved.");
    		 getDataDeed();
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