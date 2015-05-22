
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        showAdmob();

        $(document).on('vclick', '#Consult', function () {
            $('.Result').html('<img src="images/loading_100.gif" />');
            if ($('#txtPlaca').val() == '') {
                $('.Result').html('Debes ingresar una placa.');
            } else {
                $.ajax({
                    type: 'GET',
                    data: { Placa: $('#txtPlaca').val().replace('Ñ', '#') },
                    contentType: 'text/plain; charset=utf-8',
                    dataType: 'html',
                    timeout: 10000,
                    url: 'http://tvh.netdevsoftware.com/Consulta.ashx',
                    success: function (data, textStatus, jqXHR) {
                        $('.Result').html(data);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        if (textStatus == 'timeout') {
                            $('.Result').html('El servidor esta ocupado, intenta mas tarde.');
                        } else {
                            $('.Result').html('Estamos en mantenimiento, intenta mas tarde.');
                        }
                    }
                });
            }
        })        
    };

    function showAdmob() {
        var Admob_iOS_Id = 'ca-app-pub-9531683519287261/8259982033';
        var Admob_Android_Id = 'ca-app-pub-9531683519287261/9736715236';
        var Admob_Id = (navigator.userAgent.indexOf('Android') >= 0) ? Admob_iOS_Id : Admob_Android_Id;
        
        if (admob) {
            admob.initAdmob(Admob_Id, '');
            //var Admob_Params = new admob.Params();
            //Admob_Params.isTesting = true;
            //admob.showBanner(admob.BannerSize.BANNER, admob.Position.TOP_CENTER, Admob_Params);

            admob.showBanner(admob.BannerSize.BANNER, admob.Position.BOTTOM_CENTER);
        };
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();