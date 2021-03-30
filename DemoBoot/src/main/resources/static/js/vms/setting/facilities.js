$(document).ready(function () {
	$('#tahunFasilitas').datetimepicker({
		defaultDate: new Date(),
		format: 'YYYY'
	});
	
	$("#addFacilities").click(function(){
		doAddFacilities();
	});
});

function getDataFacilities(){
	$('.u-loading-screen').css('display', 'block');
	
	$.ajax({
	   url: "facilities/getlistFacilities",
       type: 'GET',
       success: function(response) {
    	  if(isJson(response)){
 	    		$('.u-loading-screen').css('display', 'none');
 	    		
		  	  	$('#div_list_fac').empty();
		  	  	var table='';
		
		   	  	table+="<table class='table table-bordered table-striped data list_fac table2excel_with_colors' id='list_bidding' style='width: 100%;'>";
		   	    table+="    <thead class='bg-primary-vms text-white h-10 small'>";
		   	    table+="        <tr>";
		   	    table+="            <th style='width: 2%;'>No</th>";
		   	    table+="            <th style='width: 12%;'>Type</th>";
		   	  	table+="            <th style='width: 15%;'>Facilities Name</th>";
		   	  	table+="            <th style='width: 17%;'>Specification</th>";
		   		table+="            <th style='width: 5%;'>Qty</th>";
		   		table+="            <th style='width: 8%;'>Create Year</th>";
		   		table+="            <th style='width: auto;'>Note</th>";
		   		table+="			<th class='d-none' style='wdith: auto%'>Vendor ID</th>"
		   	    table+="            <th style='width: 10%; text-align: center;'>Action</th>";
		   	    table+="        </tr>";
		   	    table+="    </thead>";
		   	   
		   	   	table+="    <tbody>";
		        	 $.each(JSON.parse(response), function(key, value){ 
		     	   	table+="        <tr style='font-size:14px;'>";
		 	       	table+="             <td style='width: 2%; text-align: center;'>"+(key+1)+"</td>";
		 	        table+="             <td style='width: 12%;'>"+value.tobFacilitiesType.facilitiesTypeName+"</td>";
		 	        table+="             <td style='width: 15%;'>"+value.name+"</td>";
		 	        table+="             <td style='width: 17%;'>"+value.specification+"</td>";
		 	        table+="             <td style='width: 5%;'>"+value.total+"</td>";
		 	        table+="             <td style='width: 8%;'>"+value.createYear+"</td>";
		 	        table+="             <td style='width: auto;'>"+value.note+"</td>";
		 	        table+="             <td class='d-none' style='width: auto;'>"+value.vendorID+"+</td>";
		 	       	table+="             <td style='width: 10%; text-align: center;'>";
		 	       	table+="                 <button class='btn btn-warning mt-1' onclick='getDetailsfac("+JSON.stringify(value)+")'><i class='fa fa-pen'></i></button>";
		 	     	table+="                 <button class='btn btn-danger mt-1' onclick='doRemovefac("+JSON.stringify(value)+")'><i class='fa fa-trash'></i></button>";
		 	       	table+="             </td>";
		 	       	table+="         </tr>";
		        	 }); 
		    	   	table+="	</tbody> ";
		    	   	table+="</table> ";
		        	table+="<hr class='divider' />";
		        	table+="<input type='submit' value='Add' class='btn btn-primary-vms float-left mr-2' onclick='doEntryFacilities()'>";
		   	   
		    	    $('#div_list_fac').append(table);
		  	 	$(".list_fac").DataTable({
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

function doRemovefac(value){

	Swal.fire({
        title: "Are you sure delete "+value.name+" ?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!"
    }).then(function(result) {
        if (result.value) {
        	$.ajax({
      		   url: "facilities/delFacilities",
      	       type: 'POST',
      	       data:{
      	    	  data:JSON.stringify(value)
      	       },
      	       success: function(response) { 
      	    	  if(response == '1'){
      	    		 $('.u-loading-screen').css('display', 'none');
      	    		 alertSucces("Your Facilities has been deleted.");
      	    		 getDataFacilities();
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

function getDetailsfac(value){
	$('#facilitiesID').val(value.facilitiesID);
	$('#tipeFasilitas').val(value.tobFacilitiesType.facilitiesTypeID);
	$('#namaFasilitas').val(value.name);
	$('#spesifikasiFasilitas').val(value.specification);
	$('#jumlahFasilitas').val(value.total);
	$('#keteranganFasilitas').val(value.note);
	setButtonFac($('#facilitiesID').val());
	
	$('#facilities_add').modal('show');
	
}

function doEntryFacilities(){
	doClearFacilities();
	setButtonFac($('#facilitiesID').val());
	$('#facilities_add').modal('show');
}

function doAddFacilities(){
	
	if(doValidationFac()== false){
		return;
	}else{
		doAddFacilitiesProcess();
	}
}

function doAddFacilitiesProcess(){
	$('.u-loading-screen').css('display', 'block');
	
	let data = {
		facilitiesID
		:parseInt($('#facilitiesID').val()),
			tobFacilitiesType: {
				facilitiesTypeID:parseInt($('#tipeFasilitas').val())
			},
		name:$('#namaFasilitas').val(),
		specification:$('#spesifikasiFasilitas').val(),
		total:$('#jumlahFasilitas').val(),
		createYear:$('#tahunFasilitas_').val(),
		note:$('#keteranganFasilitas').val()
		
	}
	
	$.ajax({
	   url: "facilities/addFacilities",
       type: 'POST',
       data:{
    	  data:JSON.stringify(data)
       },
       success: function(response) {
    	  if(response == '1'){ console.log
    		 $('.u-loading-screen').css('display', 'none');
    		 alertSucces("Data Succesfully Saved.");
    		 $('#facilities_add').modal('hide');
    		 getDataFacilities();
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


function doListFacilities(){
	$.ajax({
	   url: "facilities/getlistFacilitiesType",
       type: 'GET', 
       success: function(response){
    	   if(isJson(response)){
    		   $('.u-loading-screen').css('display', 'none');
	    	   var opt = "";
	    	   $.each(JSON.parse(response), function(key, value){
	    		   opt +="<option value="+value.facilitiesTypeID+">"+value.facilitiesTypeName+"</option>";
	    	   });
			   $('#tipeFasilitas').html(opt);
			   $('#tipeFasilitas').val($('#tipeFasilitas option:first').val());
    	   }else{
    		   $('.u-loading-screen').css('display', 'none');
	    	   if(response == timeOut()){
	    		    gotoIndex();
	    	   }else{
	    		   alertError(response);    
	    	   }
    	   }
       },
	   error : function(e, x, settings, exception) {
		   errorHandle(e, exception);
	   }
	});		
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
      		   url: "facilities/delFacilities",
      	       type: 'POST',
      	       data:{
      	    	  data:JSON.stringify(data)
      	       },
      	       success: function(response) {
      	    	  if(response == '1'){
      	    		 $('.u-loading-screen').css('display', 'none');
      	    		 alertSucces("Your Experience has been deleted.");
      	    		 getDataFacilities();
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

function doValidationFac(){
	let bitResult=true;
	
	if($('#namaFasilitas').val().length != 0){
		$('#namaFasilitas').removeClass("is-invalid");
		$('#namaFasilitas').addClass("is-valid");
	}else{
		$('#namaFasilitas').addClass("is-invalid");
		$('#namaFasilitasError').html("Facilities Name is Empty.");
		return false;
	}
	
	if($('#spesifikasiFasilitas').val().length != 0){
		$('#spesifikasiFasilitas').removeClass("is-invalid");
		$('#spesifikasiFasilitas').addClass("is-valid");
	}else{
		$('#spesifikasiFasilitas').addClass("is-invalid");
		$('#spesifikasiFasilitasError').html("Specification Name is Empty.");
		return false;
	}

	if($('#jumlahFasilitas').val().length != 0){
		if(!isNumeric($('#jumlahFasilitas').val())){
			$('#jumlahFasilitas').addClass("is-invalid");
			$('#jumlahFasilitasError').html("You must entered a valid number.");
			return false;
		}else{
			$('#jumlahFasilitas').removeClass("is-invalid");
			$('#jumlahFasilitas').addClass("is-valid");
		}
		
		if($('#jumlahFasilitas').val() == 0){
			$('#jumlahFasilitas').addClass("is-invalid");
			$('#jumlahFasilitasError').html("Qty must greater than 0.");
			return false;
		}
	}else{
		$('#jumlahFasilitas').addClass("is-invalid");
		$('#jumlahFasilitasError').html("Qty is Empty.");
		return false;
	}	
	
	
	return bitResult;
}

/*  function doFocusExp(source, desc){
	$('#'+desc+'').removeClass("is-invalid");
	$('#'+source+'').focus(); 
	$('#'+source+'').select();
 } */


function doClearFacilities(){
	$('#facilitiesID').val('0');
	$('#tipeFasilitas').val('1');
	
	$('#spesifikasiFasilitas').val('');
	$('#spesifikasiFasilitas').removeClass("is-invalid");
	$('#spesifikasiFasilitas').removeClass("is-valid");
	
	$('#jumlahFasilitas').val('');
	$('#jumlahFasilitas').removeClass("is-invalid");
	$('#jumlahFasilitas').removeClass("is-valid");
	
	$('#keteranganFasilitas').val('');
	$('#keteranganFasilitas').removeClass("is-invalid");
	$('#keteranganFasilitas').removeClass("is-valid");
	
	
	$('#namaFasilitas').val('');		
	$('#namaFasilitas').removeClass("is-invalid");
	$('#namaFasilitas').removeClass("is-valid");
	
}

function setButtonFac(id){
	if(id == 0){
		$('#addFacilities').text('Add');
	}else{
		$('#addFacilities').text('Update');
	}
}