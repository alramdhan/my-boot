$(document).ready(function () {
	$('#mulaiProyek').datetimepicker({
		defaultDate: new Date(),
		format: 'DD-MM-YYYY'
	});
	$('#selesaiProyek').datetimepicker({
		defaultDate: new Date(),
		format: 'DD-MM-YYYY'
	});
	
	$("#addExperience").click(function(){
		doAddExperience();
	});
	
	$("#cancelExperince").click(function(){
		doClearExperience();
		$('#experience_add').modal('hide');
	});
});

function getDataExp(){
	$('.u-loading-screen').css('display', 'block');
	
	$.ajax({
	   url: "experience/getlistExperience",
       type: 'GET',
       success: function(response) {
    	  if(isJson(response)){
 	    		$('.u-loading-screen').css('display', 'none');
 	    		
		  	  	$('#div_list_exp').empty();
		  	  	var table='';
		
		  	  	table+="<table class='table table-bordered table-striped data list_exp table2excel_with_colors' id='list_bidding' style='width: 100%;'>";
		  	    table+="    <thead class='bg-primary-vms text-white h-10 small'>";
		  	    table+="        <tr>";
		  	    table+="            <th style='width: 2%;'>No</th>";
		  	    table+="            <th style='width: 10%'>Client</th>";
		  	  	table+="            <th style='width: auto'>Project Name</th>";
		  	  	table+="            <th style='width: 10%'>Contract No</th>";
		  		table+="            <th style='width: 10%'>Contract Value</th>";
		  		table+="            <th style='width: 10%'>Contact</th>";
		  		table+="            <th style='width: 10%'>Phone</th>";
		  		table+="            <th style='width: 10%'>Starting Date</th>";
		  		table+="            <th style='width: 10%'>Ending Date</th>";
		  		table+="            <th style='width: 10%'>Note</th>";
		  	    table+="            <th style='width: 8%; text-align: center;'>Action</th>";
		  	    table+="        </tr>";
		  	    table+="    </thead>";
		  	    table+="	<tbody>";
		  	    
		  	  	$.each(JSON.parse(response), function(key, value){
	 	       	   	table+="        <tr style='font-size:14px;'>";
	 	   	       	table+="             <td style='width: 2%; text-align: center;'>"+(key+1)+"</td>";
	 	   	        table+="             <td style='width: 10%;'>"+value.client+"</td>";
	 	   	        table+="             <td style='width: auto;'>"+value.project+"</td>";
	 	   	   	 	table+="             <td style='width: 10%;'>"+value.contractNo+"</td>";
	 	   	        table+="             <td style='width: 10%;'>"+parseInt(value.contractValue).toLocaleString()+"</td>";
	 	   	        table+="             <td style='width: 10%;'>"+value.contact+"</td>";
	 	   	    	table+="             <td style='width: 10%;'>"+value.phone+"</td>";
	 	   			table+="             <td style='width: 10%;'>"+value.startDate+"</td>";
	 	   			table+="             <td style='width: 10%;'>"+value.endDate+"</td>";
	 	   			table+="             <td style='width: 10%;'>"+value.note+"</td>";
	 	   	       	table+="             <td style='width: 8%; text-align: center;'>";
	 	   	       	table+="                 <button title='Detail' class='btn btn-secondary mt-1' onclick='doGetDetailExp("+JSON.stringify(value)+")'><i class='fas fa-pencil-alt'></i></button>";
	 	   	    	table+="                 <button title='Penawaran' class='btn btn-secondary mt-1' onclick='doRemoveExp("+JSON.stringify(value)+")'><i class='fas fa-trash'></i></button>";
	 	   	       	table+="             </td>";
	 	   	       	table+="         </tr>";
 	          	});
		  	    
		  	    table+="	</tbody>";
		   	   	table+="</table> ";
		       	table+="<hr class='divider' />";
		       	table+="<input type='submit' value='Add' class='btn btn-primary-vms float-left mr-2' onclick='addExperience()'>";
		   	   
		   	    $('#div_list_exp').append(table);
		 	 	$(".list_exp").DataTable({
					"destroy": true,
				   	"bPaginate": true,
				   	"bLengthChange": true,
				   	"bFilter": true,
				   	"bInfo": true,
				   	"bAutoWidth": true 
		 	    });
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

function addExperience(){
	doClearExperience();
	setButtonExp($('#experienceID').val());
	$('#experience_add').modal('show');
}

function doAddExperience(){
	
	if(doValidationExp()== false){
		return;
	}else{
		doAddExperinceProcess();
	}
}

function doAddExperinceProcess(){
	$('.u-loading-screen').css('display', 'block');
	
	let data = {
		experienceID:$('#experienceID').val(),
		client:$('#namaClient').val(),
		project:$('#namaProyek').val(),
		contractNo:$('#nomorKontrak').val(),
		contractValue:$('#nilaiProyek').val(),
		contact:$('#namaKontak').val(),
		phone:$('#telpKontak').val(),
		startDate:$('#mulaiProyek_').val(),
		endDate:$('#selesaiProyek_').val(),
		note:$('#keteranganProyek').val()
	}
	
	$.ajax({
	   url: "experience/addExperience",
       type: 'POST',
       data:{
    	  data:JSON.stringify(data)
       },
       success: function(response) {
    	  if(response == '1'){
    		 $('.u-loading-screen').css('display', 'none');
    		 alertSucces("Data Succesfully Saved.");
    		 $('#experience_add').modal('hide');
    		 getDataExp();
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

function doGetDetailExp(value){
	$('#namaClient').val(value.client);
	$('#namaProyek').val(value.project);
	$('#nomorKontrak').val(value.contractNo);
	$('#nilaiProyek').val(value.contractValue);
	$('#namaKontak').val(value.contact);
	$('#telpKontak').val(value.phone);
	$('#keteranganProyek').val(value.note);
	$('#experienceID').val(value.experienceID);
	$('#mulaiProyek_').val(value.startDate);
	$('#selesaiProyek_').val(value.endDate)
	setButtonExp($('#experienceID').val());
	$('#experience_add').modal('show');
}

function doRemoveExp(data){
	Swal.fire({
        title: "Are you sure delete "+data.client+" ?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!"
    }).then(function(result) {
        if (result.value) {
        	$.ajax({
      		   url: "experience/delExperience",
      	       type: 'POST',
      	       data:{
      	    	  data:JSON.stringify(data)
      	       },
      	       success: function(response) {
      	    	  if(response == '1'){
      	    		 $('.u-loading-screen').css('display', 'none');
      	    		 alertSucces("Your Experience has been deleted.");
      	    		 getDataExp();
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
	    });
	}
	
function doValidationExp(){
	let bitResult=true;
		
	if($('#namaClient').val().length != 0){
		$('#namaClient').removeClass("is-invalid");
		$('#namaClient').addClass("is-valid");
	}else{
		$('#namaClient').addClass("is-invalid");
		$('#namaClientError').html("Client Name is Empty.");
		doFocus('namaClient');
		doFocusValidation('namaClient', 'namaProyek');
		doRemoveValidation('namaProyek');
		doRemoveValidation('nomorKontrak');
		doRemoveValidation('nilaiProyek');
		doRemoveValidation('namaKontak');
		doRemoveValidation('telpKontak');
		return false;
	}
	
	if($('#namaProyek').val().length != 0){
		$('#namaProyek').removeClass("is-invalid");
		$('#namaProyek').addClass("is-valid");
	}else{
		$('#namaProyek').addClass("is-invalid");
		$('#namaProyekError').html("Project Name is Empty.");
		doFocus('namaProyek');
		doFocusValidation('namaProyek', 'nomorKontrak');
		doRemoveValidation('namaClient');
		doRemoveValidation('nomorKontrak');
		doRemoveValidation('nilaiProyek');
		doRemoveValidation('namaKontak');
		doRemoveValidation('telpKontak');
		return false;
	}
	
	if($('#nomorKontrak').val().length != 0){
		$('#nomorKontrak').removeClass("is-invalid");
		$('#nomorKontrak').addClass("is-valid");
	}else{
		$('#nomorKontrak').addClass("is-invalid");
		$('#nomorKontrakError').html("Contract No is Empty.");
		doFocus('nomorKontrak');
		doFocusValidation('nomorKontrak', 'nilaiProyek');
		doRemoveValidation('namaClient');
		doRemoveValidation('namaProyek');
		doRemoveValidation('nilaiProyek');
		doRemoveValidation('namaKontak');
		doRemoveValidation('telpKontak');
		return false;
	}
	
	if($('#nilaiProyek').val().length != 0){
		if(!isNumeric($('#nilaiProyek').val())){
			$('#nilaiProyek').addClass("is-invalid");
			$('#nilaiProyekError').html("You must entered a valid number.");
			doFocus('nilaiProyek');
			doFocusValidation('nilaiProyek', 'namaKontak');
			doRemoveValidation('namaClient');
			doRemoveValidation('namaProyek');
			doRemoveValidation('nomorKontrak');
			doRemoveValidation('namaKontak');
			doRemoveValidation('telpKontak');
			return false;
		}else{
			$('#nilaiProyek').removeClass("is-invalid");
			$('#nilaiProyek').addClass("is-valid");
		}
		
		if($('#nilaiProyek').val() == 0){
			$('#nilaiProyek').addClass("is-invalid");
			$('#nilaiProyekError').html("Contract Value must greater than 0.");
			doFocus('nilaiProyek');
			doFocusValidation('nilaiProyek', 'namaKontak');
			doRemoveValidation('namaClient');
			doRemoveValidation('namaProyek');
			doRemoveValidation('nomorKontrak');
			doRemoveValidation('namaKontak');
			doRemoveValidation('telpKontak');
			return false;
		}
	}else{
		$('#nilaiProyek').addClass("is-invalid");
		$('#nilaiProyekError').html("Contract Value is Empty.");
		doFocus('nilaiProyek');
		doFocusValidation('nilaiProyek', 'namaKontak');
		doRemoveValidation('namaClient');
		doRemoveValidation('namaProyek');
		doRemoveValidation('nomorKontrak');
		doRemoveValidation('namaKontak');
		doRemoveValidation('telpKontak');
		return false;
	}	
	
	if($('#namaKontak').val().length != 0){
		$('#namaKontak').removeClass("is-invalid");
		$('#namaKontak').addClass("is-valid");
	}else{
		$('#namaKontak').addClass("is-invalid");
		$('#namaKontakError').html("Contract is Empty.");
		doFocus('namaKontak');
		doFocusValidation('namaKontak', 'telpKontak');
		doRemoveValidation('namaClient');
		doRemoveValidation('namaProyek');
		doRemoveValidation('nomorKontrak');
		doRemoveValidation('nilaiProyek');
		doRemoveValidation('telpKontak');
		return false;
	}
	
	if($('#telpKontak').val().length != 0){
		if(!isNumeric($('#telpKontak').val())){
			$('#telpKontak').addClass("is-invalid");
			$('#telpKontakError').html("You must entered a valid number.");
			doFocus('telpKontak');
			doRemoveValidation('namaClient');
			doRemoveValidation('namaProyek');
			doRemoveValidation('nomorKontrak');
			doRemoveValidation('nilaiProyek');
			doRemoveValidation('namaKontak');
			return false;
		}else{
			$('#telpKontak').removeClass("is-invalid");
			$('#telpKontak').addClass("is-valid");
		}
	}else{
		$('#telpKontak').addClass("is-invalid");
		$('#telpKontakError').html("Phone number is Empty.");
		doFocus('telpKontak');
		doRemoveValidation('namaClient');
		doRemoveValidation('namaProyek');
		doRemoveValidation('nomorKontrak');
		doRemoveValidation('nilaiProyek');
		doRemoveValidation('namaKontak');
		return false;
	}
	
	
	return bitResult;
}

function doFocusExp(source, desc){
	$('#'+desc+'').removeClass("is-invalid");
	$('#'+source+'').focus(); 
	$('#'+source+'').select();
}

function doClearExperience(){
	$('#namaClient').val('');
	$('#namaClient').removeClass("is-invalid");
	$('#namaClient').removeClass("is-valid");
	
	$('#namaProyek').val('');
	$('#namaProyek').removeClass("is-invalid");
	$('#namaProyek').removeClass("is-valid");
	
	$('#nomorKontrak').val('');
	$('#nomorKontrak').removeClass("is-invalid");
	$('#nomorKontrak').removeClass("is-valid");
	
	$('#nilaiProyek').val('');
	$('#nilaiProyek').removeClass("is-invalid");
	$('#nilaiProyek').removeClass("is-valid");
	
	$('#namaKontak').val('');
	$('#namaKontak').removeClass("is-invalid");
	$('#namaKontak').removeClass("is-valid");
	
	$('#telpKontak').val('');
	$('#telpKontak').removeClass("is-invalid");
	$('#telpKontak').removeClass("is-valid");
	
	$('#keteranganProyek').val('');
	$('#keteranganProyek').removeClass("is-invalid");
	$('#keteranganProyek').removeClass("is-valid");
}

function setButtonExp(id){
	if(id == 0){
		$('#addExperience').text('Add');
	}else{
		$('#addExperience').text('Update');
	}
}