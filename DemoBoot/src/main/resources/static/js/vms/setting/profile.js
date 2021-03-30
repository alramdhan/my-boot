$(document).ready(function () {
	$("#fileProfile").on("change",function(){ 
		$(".txt-upload").addClass("d-none");
		$("#filenameProfile").removeClass("d-none");
	    $("#filenameProfile").text($(this).val().replace(/.*(\/|\\)/, ''));
	    if($("#filenameProfile").text() == ""){
	    	$(".txt-upload").removeClass("d-none");
		}
	});
	
	$('#updateProfile').on('click', function(){
		let timerInterval;
		Swal.fire({
		  title: 'Updating!',
		  showConfirmButton: false,
		  timer: 1000,
		  timerProgressBar: true,
		  willOpen: () => {
		    Swal.showLoading()
		    timerInterval = setInterval(() => {
		      const content = Swal.getContent()
		      if (content) {
		        const b = content.querySelector('b')
		        if (b) {
		          b.textContent = Swal.getTimerLeft()
		        }
		      }
		    }, 100)
		  },
		  willClose: () => {
		    clearInterval(timerInterval)
		  }
		}).then((result) => {
		  /* Read more about handling dismissals below */
		  if (result.dismiss === Swal.DismissReason.timer) {
			  alertSucces("Data Succesfully Change.");
		  }
		});
	});

	$('#createDateAkta').datetimepicker({
		defaultDate : new Date(),
		format : 'DD-MM-YYYY'
	});
	$('#beritaNegara').datetimepicker({
		defaultDate : new Date(),
		format : 'DD-MM-YYYY'
	});
	$('#pengesahanAkta').datetimepicker({
		defaultDate : new Date(),
		format : 'DD-MM-YYYY'
	});
	
	$('#province').change(function() {
		doListCity();
	});
	$('#city').change(function() {
		doListDistrict();
	});
	$('#district').change(function() {
		doListSubdistrict();
	});
});

function validateFile(){
	  const allowedExtensions =  ['jpg','png'],
	        sizeLimit = 180000; // 1 megabyte
	  // destructuring file name and size from file object
	  const { name:fileName, size:fileSize } = this.files[0];
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
	    $("#filenameProfile").text("");
	    $("#filenameProfile").addClass("d-none");
	    $(".txt-upload").removeClass("d-none");
	    this.value = null;
	  }else if(fileSize > sizeLimit){
	    Swal.fire({
	    	icon: 'error',
	    	  title: 'file size too large (Max Size : 180Kb)',
	    	})
	    $("#filenameProfile").text("");
	    $("#filenameProfile").addClass("d-none");
	    $(".txt-upload").removeClass("d-none");
	    this.value = null;
	  }else{
		  $('.u-loading-screen').css('display', 'block');
		  
		  let fileProfile = $("#fileProfile");
		  let formData = new FormData();
		  formData.append('file', fileProfile[0].files[0]);
		  
		  $.ajax({
			  url: "profile/changeAvatar",
			  type: "POST",
			  enctype: 'multipart/form-data',
			  data: formData,
			  processData: false,
			  contentType: false,
			  cache: false,
			  timeout:600000,
			  success: function (res) {
//				  console.log(res);
				  $('.u-loading-screen').css('display', 'none');
				  document.getElementById('profileImage').setAttribute(
					  'src', 'data:image/png;base64,'+res+''
				  );
				  document.getElementById('imgProfile').setAttribute(
					  'src', 'data:image/png;base64,'+res+''
				  );
			  },
			  error: function (e, x, settings, exception) {
				  errorHandle(e, exception);
			  }
		  });
	 }
}

function getDataProfile(){
	$('.u-loading-screen').css('display', 'block');
	$.ajax({
	   url: "profile/getProfile",
       type: 'GET',
       success: function(response) {
    	   if(isJson(response)){
    		   $('.u-loading-screen').css('display', 'none');
    		   doSetDataProfile(JSON.parse(response));
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
}

function doSetDataProfile(value){
	$('#vendorName').val(value.vendorName);
	$('#vendorAddress').val(value.vendorAddress);
	$('#vendorEmail').val(value.vendorEmail);
	$('#phone').val(value.phone);
	$('#vendorContact').val(value.vendorContact);
	$('#vendorContactPosition').val(value.vendorContactPosition);
	$('#website').val(value.website);
	doListClassification(value.tobClassification.classificationID);
}

function doListProvince(){
	$('.u-loading-screen').css('display', 'block');
	$.ajax({
	   url: "profile/getProvince",
       type: 'GET', 
       data: {},
       success: function(response){
    	   $('.u-loading-screen').css('display', 'none');
    	   var opt = "";
    	   opt +="<option value='0'>-- Pilih Provinsi --</option>";
    	   $.each(response, function(key, value){
    		   opt +="<option value="+value.provinceID+">"+value.provinceName+"</option>";
    	   });
		   $('#province').html(opt);
		   $('#province').val($('#province option:first').val());
		   
		   doListCity();
       },
	   error : function(e, x, settings, exception) {
		   errorHandle(e, exception);
	   }
	});
}

function doListCity(){
	if($('#province').val() == 0){
		var opt = "";
	   	opt +="<option value='0'>-- Pilih Kota/Kabupaten --</option>";
	   	$('#city').html(opt);
	   	
	   	doListDistrict();
	}else{
		$('.u-loading-screen').css('display', 'block');
		$.ajax({
		   url: "profile/getCity",
	       type: 'POST', 
	       data: {
	    	   province:$('#province').val()
	       },
	       success: function(response){
	    	   $('.u-loading-screen').css('display', 'none');
	    	   var opt = "";
	    	   opt +="<option value='0'>-- Pilih Kota/Kabupaten --</option>";
	    	   $.each(response, function(key, value){
	    		   opt +="<option value="+value.cityID+">"+value.cityName+"</option>";
	    	   });
			   $('#city').html(opt);
			   $('#city').val($('#city option:first').val());
			   
			   doListDistrict();
	       },
		   error : function(e, x, settings, exception) {
			   errorHandle(e, exception);
		   }
		});
	}
}

function doListDistrict(){
	if($('#city').val() == 0){
		var opt = "";
	   	opt +="<option value=''>-- Pilih Kecamatan --</option>";
	   	$('#district').html(opt);
	   	doListSubdistrict();
	}else{
		$('.u-loading-screen').css('display', 'block');
		$.ajax({
		   url: "profile/getDistrict",
	       type: 'POST', 
	       data: {
	    	   city:$('#city').val()
	       },
	       success: function(response){
	    	   $('.u-loading-screen').css('display', 'none');
	    	   var opt = "";
	    	   opt +="<option value=''>-- Pilih Kecamatan --</option>";
	    	   $.each(response, function(key, value){
	    		   opt +="<option value="+value.districtID+">"+value.districtName+"</option>";
	    	   });
			   $('#district').html(opt);
			   $('#district').val($('#district option:first').val());
			   
			   doListSubdistrict();
	       },
		   error : function(e, x, settings, exception) {
			   errorHandle(e, exception);
		   }
		});
	}
}

function doListSubdistrict(){
	if($('#district').val() == 0){
		var opt = "";
	   	opt +="<option value=''>-- Pilih Kelurahan/Desa --</option>";
	   	$('#subdistrict').html(opt);
	   	$('#postalCode').val('');
	}else{
		$('.u-loading-screen').css('display', 'block');
		$.ajax({
		   url: "profile/getSubdistrict",
	       type: 'POST', 
	       data: {
	    	   district:$('#district').val()
	       },
	       success: function(response){
	    	   $('.u-loading-screen').css('display', 'none');
	    	   var opt = "";
	    	   opt +="<option value=''>-- Pilih Kelurahan/Desa --</option>";
	    	   $.each(response, function(key, value){
	    		   opt +="<option value="+value.subdistrictID+">"+value.subdistrictName+"</option>";
	    	   });
			   $('#subdistrict').html(opt);
			   $('#subdistrict').val($('#subdistrict option:first').val());
	       },
		   error : function(e, x, settings, exception) {
			   errorHandle(e, exception);
		   }
		});
	}
}

function doListClassification(value){
	$('.u-loading-screen').css('display', 'block');
	$.ajax({
	   url: "profile/getClassification",
       type: 'GET', 
       data: {},
       success: function(response){
    	   $('.u-loading-screen').css('display', 'none');
    	   var opt = "";
    	   $.each(response, function(key, value){
    		   opt +="<option value="+value.classificationID+">"+value.classificationName+"</option>";
    	   });
		   $('#classification').html(opt);
		   if(value != 0){
			   $('#classification').val(value);
		   }else{
			   $('#classification').val($('#classification option:first').val());
		   }
       },
	   error : function(e, x, settings, exception) {
		   errorHandle(e, exception);
	   }
	});
}