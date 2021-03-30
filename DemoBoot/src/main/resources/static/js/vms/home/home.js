$(document).ready(function () {
	$.active = false;
    $('body').bind('click keypress', function() { $.active = true; });
    checkActivity(1800000, 60000, 0); // timeout = 30 minutes, interval = 1 minute.
    
    $("#push").click(function () {
     	$(this).toggleClass( "closed" );
      	if ($(this).hasClass("closed")) {
	    	$("#mcciIcon").attr("width","50")
	    	.css("margin-left","-13px")
	    	.css("background-size","auto")
	    	.css("background-repeat","no-repeat")
	    	.css("margin-top","6px");
      	} else {
	    	$("#mcciIcon").attr("width","100%").css("margin-bottom","5px");
      	} 
	});
});