<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@page pageEncoding="UTF-8"%>
<%@taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>
        <tiles:insertAttribute name="title" />
    </title>

    <link rel="stylesheet" href="<c:url value='/plugins/sweetalert2/sweetalert2.css'/>">
    <link rel="stylesheet" href="<c:url value='/plugins/fontawesome-free/css/all.min.css'/>">
    <link rel="stylesheet" href="<c:url value='/plugins/overlayScrollbars/css/OverlayScrollbars.min.css'/>">
    <link rel="stylesheet" href="<c:url value='/css/admin/adminlte.css?modified=9'/>">
    <link rel="stylesheet" href="<c:url value='/plugins/icheck-bootstrap/icheck-bootstrap.min.css'/>">
    <link rel="stylesheet"
        href="<c:url value='/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css'/>">

    <!-- Select2 -->
    <link rel="stylesheet" href="<c:url value='/plugins/select2/css/select2.min.css'/>">
    <link rel="stylesheet" href="<c:url value='/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css'/>">

    <!-- Bootstrap4 Duallistbox -->
    <link rel="stylesheet" href="<c:url value='/plugins/bootstrap4-duallistbox/bootstrap-duallistbox.min.css'/>">

    <link rel="shortcut icon" href="<c:url value='/img/favicon.ico'/>" type="image/x-icon" />
    <link href="<c:url value='/plugins/datatables-bs4/css/dataTables.bootstrap4.css'/>" rel="stylesheet">
    <link href="<c:url value='/plugins/datatables-select/css/select.bootstrap4.min.css'/>" rel="stylesheet">
    <link href="<c:url value='/plugins/summernote/summernote-bs4.css'/>" rel="stylesheet">

    <script src="<c:url value='/plugins/jquery/jquery.min.js'/>"></script>
    <script src="<c:url value='/js/util.js?modified=17'/>"></script>

    <!-- Bootstrap -->
    <script src="<c:url value='/plugins/bootstrap/js/bootstrap.bundle.min.js'/>"></script>
    <script src="<c:url value='/plugins/inputmask/jquery.inputmask.bundle.js'/>"></script>
    <script src="<c:url value='/plugins/moment/moment.min.js'/>"></script>
    <script src="<c:url value='/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js'/>"></script>
    <script src="<c:url value='/plugins/datatables/jquery.dataTables.min.js'/>"></script>
    <script src="<c:url value='/plugins/datatables-bs4/js/dataTables.bootstrap4.min.js'/>"></script>
    <script src="<c:url value='/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js'/>"></script>
    <script src="<c:url value='/plugins/summernote/summernote-bs4.min.js'/>"></script>
    <script src="<c:url value='/plugins/sweetalert2/sweetalert2.all.js'/>"></script>
    <script src="<c:url value='/plugins/sweetalert2/sweetalert2.js'/>"></script>
    <script src="<c:url value='/js/admin/adminlte.js'/>"></script>
    <script src="<c:url value='/plugins/select2/js/select2.full.min.js'/>"></script>
    <script src="<c:url value='/plugins/bootstrap4-duallistbox/jquery.bootstrap-duallistbox.min.js'/>"></script>

    <script src="<c:url value='/js/vms/home/home.js?modified=2'/>"></script>
    <script src="<c:url value='/js/vms/history/history.min.js?modified=1'/>"></script>
    <script src="<c:url value='/js/vms/setting/profile.js?modified=1'/>"></script>
    <script src="<c:url value='/js/vms/setting/account.js?modified=1'/>"></script>
    <script src="<c:url value='/js/vms/setting/security.js'/>"></script>
    <script src="<c:url value='/js/vms/setting/deed.js'/>"></script>
    <script src="<c:url value='/js/vms/setting/legal.js'/>"></script>
    <script src="<c:url value='/js/vms/setting/experience.js?modified=2'/>"></script>
    <script src="<c:url value='/js/vms/setting/facilities.js'/>"></script>

    <link rel="shortcut icon" href="<c:url value='/img/favicon.ico'/>" type="image/x-icon" />
</head>

<body class="hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed">
    <div class="wrapper">
        <!-- Navbar -->
        <header id="header">
            <tiles:insertAttribute name="header" />
        </header>
        <!-- /.navbar -->

        <!-- Main Sidebar Container -->
        <aside class="main-sidebar bg-primary-vms sidebar-dark-uncal elevation-4">
            <!-- Sidebar user panel (optional) -->
            <a href='<c:url value="/"/>' class="brand-link bg-primary-vms text-white pl-4"
                style="background-color: white !important">
                <img style="margin: 0px;" alt="" id="mcciIcon" width="90%" src="<c:url value='/img/MCCINobg.png'/>">
            </a>
            <!-- Sidebar -->
            <div class="sidebar bg-primary-vms" style="margin-top: 110px;">
                <div class="user-panel mt-3 pb-3 mb-3 d-flex pl-3 ml-1" style="border-color: white">
                    <a href="#" style="text-decoration: none; color: white; font-weight: bold; width: 100%;">
                        <img alt="" src="<c:url value='/img/default.png'/>" id="imgProfile"
                            class="imgProfile img-circle elevation-2" width="50px" height="50px">
                        &nbsp;<span class="brand-text font-weight-bold" id="div_user">${user.userFullName}</span>
                    </a>
                    <hr class="divider" style="background-color: white;" />
                </div>
                <c:set var="user" value="${user}" scope="request" />

                <!-- Sidebar Menu -->
                <section id="sidemenu">
                    <tiles:insertAttribute name="menu" />
                </section>
                <!-- /.sidebar-menu -->
            </div>
            <!-- /.sidebar -->
        </aside>
        <!-- /.main-sidebar -->

        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Main content -->
            <section class="content" id="container">
                <tiles:insertAttribute name="content"></tiles:insertAttribute>
            </section>
            <!-- /.content -->
        </div>
        <!-- /.content-wrapper -->

        <!-- Control Sidebar -->
        <aside class="control-sidebar control-sidebar-dark">
            <!-- Control sidebar content goes here -->
        </aside>
        <!-- /.control-sidebar -->

        <!-- Menu Loading -->
        <jsp:include page="/WEB-INF/tiles/templates/loading.jsp" />
        <!-- Modal Logout -->
        <jsp:include page="/WEB-INF/tiles/templates/logout.jsp" />

        <!-- Main Footer -->
        <footer id="footer">
            <tiles:insertAttribute name="footer" />
        </footer>
    </div>
    <!-- ./wrapper -->
</body>

</html>