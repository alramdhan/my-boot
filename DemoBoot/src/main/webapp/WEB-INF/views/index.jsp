<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<jsp:include page="/WEB-INF/views/layout/header.jsp" />

 		<nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
            <div class="form-group w-100 row">
	            <div class="col-sm-1">
	            
	                <a class="navbar-brand js-scroll-trigger d-none" href="#page-top">MCCI B2B Portal</a>
	                <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
	                    Menu
	                    <i class="fas fa-bars"></i>
	                </button>
	            </div>
	            <div class="col-sm-11">
	            
	                <div class="collapse navbar-collapse" id="navbarResponsive">
	                    <ul class="navbar-nav ml-auto">
	                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#about">Home</a></li>
	                        <c:if test="${reg == '1'}">
	                        	<li class="nav-item"><a class="nav-link js-scroll-trigger" href="<c:url value='/sign_up' />">Sign Up</a></li>
	                        </c:if>
	                        <li class="nav-item"><a class="nav-link js-scroll-trigger" style="cursor: pointer;" onclick='doShowLogin()'>Login</a></li>
	                    </ul>
	                </div>
	            </div>
            </div>
        </nav>
        <!-- Masthead-->
        <header class="masthead" style="background: no-repeat; background-image: url('img/mitsubishi.jpg'); background-size: 100% 100%; box-shadow: inset 0 0 0 2000px #212529b3;">
            <div class="container d-flex h-100 align-items-center">
                <div class="mx-auto text-center">
                    <h1 class="mx-auto my-0 text-uppercase text-white">MCCI</h1>
                    <h2 class="text-white-50 mx-auto mt-2 mb-5">The B2B portal will facilitate both procurement and vendors to engage in business. This portal will simplify the process of purchasing by integrating it with .SAP and Odoo E-procurement, and also have a database to keep documents uploaded by Vendors.</h2>
                    <c:if test="${reg == '1'}">
                    	<a class="btn btn-primary js-scroll-trigger" href="<c:url value='/sign_up' />">Register</a><br>
                    </c:if>
                    <span class="text-white">Already registered? <a style="cursor: pointer" onclick='doShowLogin()'><u>Click here!</u></a></span>
                </div>
            </div>
        </header>
        <!-- About-->
        <section class="about-section text-center" id="about">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 mx-auto">
                        <h2 class="text-white mb-4">Contact Us</h2>
                        <p class="text-white-50">
                            PT. Mitsubishi Chemical Indonesia<br>
                            Gedung Setiabudi Atrium, Suite 710<br>
                            Jl. H.R. Rasuan Said, Kuningan Jakarta 1290 Indonesia <br>
                            Phone : +62 21 5207699, 5210455-7
                        </p>
                    </div>
                </div>
<!--                 <img class="img-fluid" src="assets/img/indexbackground.svg" alt="" /> -->
            </div>
        </section>
<jsp:include page="/WEB-INF/views/layout/footer.jsp" />
<jsp:include page="/WEB-INF/views/login/login.jsp" />
<jsp:include page="/WEB-INF/views/modal/modalAlert.jsp" />	

<script>

function doShowLogin(){
	$('#userName').focus(); 
	$('#userName').select();
	$('#loginConfirm').modal('show');
}

</script>