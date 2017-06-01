(function() {

    var app = {
        init: function() {
            this.url = "../data/galerie.json";
            this.getGalerie(app.url);
        },

        getGalerie: function(url) {
            $.ajax({
                url: url,
                success: this.initmap,
                error: function(err) {
                    if (err) {
                        console.log(err);
                    };
                }
            });
        },

        // carte interactive
        initmap: function(data) {
            var map = new L.Map('cdf_map', { fullscreenControl: true });
            var osmUrl = 'http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png';
            var osmAttrib = 'Map data © <a href="http://www.thunderforest.com/">Thunderforest</a> contributors, Imagery © CloudMade';

            var osm = new L.TileLayer(osmUrl, { minZoom: 10, maxZoom: 19, attribution: osmAttrib });

            map.setView(new L.LatLng(43.1083, 0.7234), 16);
            map.addLayer(osm);
            map.scrollWheelZoom.disable();
            map.on('fullscreenchange', function() {
                if (map.isFullscreen()) {
                    bouton.remove();
                    return;
                } else {
                    map.remove();
                    app.init();
                }
            });

            //bouton pour ouvrir la galerie sur la map
            $("#dialog").dialog({
                autoOpen: false,
                resizable: false,
                width: "auto",
                fluid: true,
                clickOut: false,
                responsive: true,
                show: {
                    effect: "fade",
                    duration: 1000
                },
                hide: {
                    effect: "fade",
                    duration: 1000
                }
            });

            var bouton = L.easyButton({
                position: 'bottomleft',
                states: [{
                    onClick: function(btn, map) {
                        $("#dialog").dialog("open");
                        app.initgallery(data);
                    },
                    title: 'Galerie Photos',
                    icon: '<img class="center" src="../videos/glyphicons-9-film.png">'
                }]
            }).addTo(map);


            //définition des marqueurs
            var Marker = function(text, borderColor, backgroundColor, textColor) {
                this.text = text;
                this.iconSize = [15, 15];
                this.borderColor = borderColor;
                this.backgroundColor = backgroundColor;
                this.textColor = textColor;
                this.isAlphaNumericIcon = true;
                this.innerIconStyle = 'margin:auto';
            };


            //circuit vert clair
            for (i = 0; i < data.patrimoine.length; i++) {
                //marqueurs                 
                var markersPatrimoine = new Marker(data.patrimoine[i].marqueur, '#18453B', "rgba(0, 171, 57, 0.5)", '#000');
                var latPatrimoine = data.patrimoine[i].geoloc.lat;
                var longPatrimoine = data.patrimoine[i].geoloc.lng;
                markersPatrimoine = L.marker([latPatrimoine, longPatrimoine], {
                    icon: L.BeautifyIcon.icon({
                        iconSize: markersPatrimoine.iconSize,
                        borderColor: markersPatrimoine.borderColor,
                        backgroundColor: markersPatrimoine.backgroundColor,
                        isAlphaNumericIcon: markersPatrimoine.isAlphaNumericIcon,
                        text: markersPatrimoine.text,
                        textColor: markersPatrimoine.textColor,
                        innerIconStyle: markersPatrimoine.innerIconStyle
                    })
                }).addTo(map);
                //popup
                titrePatrimoine = data.patrimoine[i].titre;
                textePatrimoine = data.patrimoine[i].texte;
                var contentPopupPatrimoine = '';
                contentPopupPatrimoine += "<h2>" + titrePatrimoine + "</h2>" + "<br><div class='carousel'>";
                for (j = 0; j < data.patrimoine[i].videos.length; j++) {
                    var vidPatrimoine = data.patrimoine[i].videos[j].url;
                    contentPopupPatrimoine += '<iframe width="auto" height="auto" src="https://www.youtube.com/embed/' + vidPatrimoine + '" frameborder="0" allowfullscreen></iframe>';
                }
                contentPopupPatrimoine += "<p>" + textePatrimoine + "</p>";
                markersPatrimoine.bindPopup(contentPopupPatrimoine);
            };

            //batiments officiels
            for (i = 0; i < data.initiative.length; i++) {
                //marqueurs
                var markersInitiative = new Marker(data.initiative[i].marqueur, '#193025', "rgba(0, 100, 0, 0.5)", '#000');
                var latInitiative = data.initiative[i].geoloc.lat;
                var longInitiative = data.initiative[i].geoloc.lng;
                markersInitiative = L.marker([latInitiative, longInitiative], {
                    icon: L.BeautifyIcon.icon({
                        iconSize: markersInitiative.iconSize,
                        borderColor: markersInitiative.borderColor,
                        backgroundColor: markersInitiative.backgroundColor,
                        isAlphaNumericIcon: markersInitiative.isAlphaNumericIcon,
                        text: markersInitiative.text,
                        textColor: markersInitiative.textColor,
                        innerIconStyle: markersInitiative.innerIconStyle
                    })
                }).addTo(map);
                //popup
                titreInitiative = data.initiative[i].titre;
                texteInitiative = data.initiative[i].texte;
                var contentPopupInitiative = '';
                contentPopupInitiative += "<h2>" + titreInitiative + "</h2>" + "<br><div class='carousel'>";
                for (j = 0; j < data.initiative[i].videos.length; j++) {
                    var vidInitiative = data.initiative[i].videos[j].url;
                    contentPopupInitiative += '<iframe width="auto" height="auto" src="https://www.youtube.com/embed/' + vidInitiative + '" frameborder="0" allowfullscreen></iframe>';
                }
                contentPopupInitiative += "</div><p>" + texteInitiative + "</p>";
                markersInitiative.bindPopup(contentPopupInitiative);
            };
            for (i = 0; i < data.culture.length; i++) {
                //marqueurs
                var markersCulture = new Marker(data.culture[i].marqueur, '#193025', "rgba(0, 100, 0, 0.5)", '#000');
                var latCulture = data.culture[i].geoloc.lat;
                var longCulture = data.culture[i].geoloc.lng;
                markersCulture = L.marker([latCulture, longCulture], {
                    icon: L.BeautifyIcon.icon({
                        iconSize: markersCulture.iconSize,
                        borderColor: markersCulture.borderColor,
                        backgroundColor: markersCulture.backgroundColor,
                        isAlphaNumericIcon: markersCulture.isAlphaNumericIcon,
                        text: markersCulture.text,
                        textColor: markersCulture.textColor,
                        innerIconStyle: markersCulture.innerIconStyle
                    })
                }).addTo(map);
                //popup
                titreCulture = data.culture[i].titre;
                texteCulture = data.culture[i].texte;
                var contentPopupCulture = '';
                contentPopupCulture += "<h2>" + titreCulture + "</h2>" + "<br><div class='carousel'>";
                for (j = 0; j < data.culture[i].videos.length; j++) {
                    var vidCulture = data.culture[i].videos[j].url;
                    contentPopupCulture += '<iframe width="auto" height="auto" src="https://www.youtube.com/embed/' + vidCulture + '" frameborder="0" allowfullscreen></iframe>';
                }
                contentPopupCulture += "</div><p>" + texteCulture + "</p>";
                markersCulture.bindPopup(contentPopupCulture);
            };
        },

        // videotheque
        initgallery: function(data) {

            var patrimoineVideo = '';
            for (x = 0; x < data.patrimoine.length; x++) {
                var alt = data.patrimoine[x].titre;
                for (y = 0; y < data.patrimoine[x].videos.length; y++) {
                    var vidPatrimoine = data.patrimoine[x].videos[y].url;
                    var creditPatrimoine = data.patrimoine[x].videos[y].credit;
                    patrimoineVideo += '<img alt="' + alt + '"data-type="youtube" data-videoid="' + vidPatrimoine + '">';
                }
            };

            var initiativeVideo = '';
            for (x = 0; x < data.initiative.length; x++) {
                var alt = data.initiative[x].titre;
                for (y = 0; y < data.initiative[x].videos.length; y++) {
                    var vidInitiative = data.initiative[x].videos[y].url;
                    var creditInitiative = data.initiative[x].videos[y].credit;
                    initiativeVideo += '<img alt="' + alt + '"data-type="youtube" data-videoid="' + vidInitiative + '">';
                }
            };

            var cultureVideo = '';
            for (x = 0; x < data.culture.length; x++) {
                var alt = data.culture[x].titre;
                for (y = 0; y < data.culture[x].videos.length; y++) {
                    var vidCulture = data.culture[x].videos[y].url;
                    var creditCulture = data.culture[x].videos[y].credit;
                    cultureVideo += '<img alt="' + alt + '"data-type="youtube" data-videoid="' + vidCulture + '">';
                }
            };
            $('#gallery1').html(patrimoineVideo + initiativeVideo + cultureVideo);

            unitegallery();

            // select(photoPatrimoine, photoAnnexes);
            // $(".ui-dialog-titlebar-close").on("click", function() {
            //     $("#cdf_map").css("opacity", "1")
            // })
        }
    }
    app.init();
})();

//filtre phototheque
function select(photoVert, photoAnnexes) {
    $("#selectTheme").on("change", function() {
        if ($(this).val() == "Vert") {
            $("#gallery").html(photoVert);
        } else if ($(this).val() == "Annexes") {
            $("#gallery").html(photoAnnexes);
        } else {
            $('#gallery').html(photoVert + photoAnnexes);
        };
        unitegallery();
    });
};

//définition galerie
function unitegallery() {
    $("#gallery1").unitegallery({
        grid_num_rows:10,
        theme_navigation_type: "bullets",

    });
};