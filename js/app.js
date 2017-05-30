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
            var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            var osmAttrib = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors, Imagery © CloudMade';

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
                width: 1200,
                resizable: false,
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
                        $("#cdf_map").css("opacity", "0.1");
                        app.initgallery(data);
                    },
                    title: 'Galerie Photos',
                    icon: '<img class="center" src="../images/glyphicons-139-picture.png">'
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
            for (i = 0; i < data.vert.length; i++) {
                //marqueurs                 
                var markersVert = new Marker(data.vert[i].marqueur, '#18453B', "rgba(0, 171, 57, 0.5)", '#000');
                var latVert = data.vert[i].geoloc.lat;
                var longVert = data.vert[i].geoloc.lng;
                markersVert = L.marker([latVert, longVert], {
                    icon: L.BeautifyIcon.icon({
                        iconSize: markersVert.iconSize,
                        borderColor: markersVert.borderColor,
                        backgroundColor: markersVert.backgroundColor,
                        isAlphaNumericIcon: markersVert.isAlphaNumericIcon,
                        text: markersVert.text,
                        textColor: markersVert.textColor,
                        innerIconStyle: markersVert.innerIconStyle
                    })
                }).addTo(map);
                //popup
                titreVert = data.vert[i].titre;
                texteVert = data.vert[i].texte;
                var contentPopupVert = '';
                contentPopupVert += "<h2>" + titreVert + "</h2>" + "<br><div class='carousel'>";
                for (j = 0; j < data.vert[i].images.length; j++) {
                    var imgVert = data.vert[i].images[j].url;
                    contentPopupVert += '<a href="' + imgVert + '" data-lightbox="' + imgVert + '"><img class="imgPopup" src="' + imgVert + '" alt="' + titreVert + '" data-image="' + imgVert + '"></a>';
                }
                contentPopupVert += "<p>" + texteVert + "</p>";
                markersVert.bindPopup(contentPopupVert);
            };

            //batiments officiels
            for (i = 0; i < data.annexes.length; i++) {
                //marqueurs
                var markersAnnexes = new Marker(data.annexes[i].marqueur, '#193025', "rgba(0, 100, 0, 0.5)", '#000');
                var latAnnexes = data.annexes[i].geoloc.lat;
                var longAnnexes = data.annexes[i].geoloc.lng;
                markersAnnexes = L.marker([latAnnexes, longAnnexes], {
                    icon: L.BeautifyIcon.icon({
                        iconSize: markersAnnexes.iconSize,
                        borderColor: markersAnnexes.borderColor,
                        backgroundColor: markersAnnexes.backgroundColor,
                        isAlphaNumericIcon: markersAnnexes.isAlphaNumericIcon,
                        text: markersAnnexes.text,
                        textColor: markersAnnexes.textColor,
                        innerIconStyle: markersAnnexes.innerIconStyle
                    })
                }).addTo(map);
                //popup
                titreAnnexes = data.annexes[i].titre;
                texteAnnexes = data.annexes[i].texte;
                var contentPopupAnnexes = '';
                contentPopupAnnexes += "<h2>" + titreAnnexes + "</h2>" + "<br><div class='carousel'>";
                for (j = 0; j < data.annexes[i].images.length; j++) {
                    var imgAnnexes = data.annexes[i].images[j].url;
                    contentPopupAnnexes += '<a href="' + imgAnnexes + '" data-lightbox="' + imgAnnexes + '"><img class="imgPopup" src="' + imgAnnexes + '" alt="' + titreAnnexes + '" data-image="' + imgAnnexes + '"></a>';
                }
                contentPopupAnnexes += "</div><p>" + texteAnnexes + "</p>";
                markersAnnexes.bindPopup(contentPopupAnnexes);
            };

        },

        // phototheque
        initgallery: function(data) {

            var photoVert = '';
            for (x = 0; x < data.vert.length; x++) {
                var alt = data.vert[x].titre;
                for (y = 0; y < data.vert[x].images.length; y++) {
                    var imgVert = data.vert[x].images[y].url;
                    var creditVert = data.vert[x].images[y].credit;
                    photoVert += '<img alt="' + alt + '" src="' + imgVert + '" data-image="' + imgVert + '" data-description="' + creditVert + '">';
                }
            };

            var photoAnnexes = '';
            for (x = 0; x < data.annexes.length; x++) {
                var alt = data.annexes[x].titre;
                for (y = 0; y < data.annexes[x].images.length; y++) {
                    var imgAnnexes = data.annexes[x].images[y].url;
                    var creditAnnexes = data.annexes[x].images[y].credit;
                    photoAnnexes += '<img alt="' + alt + '" src="' + imgAnnexes + '" data-image="' + imgAnnexes + '" data-description="' + creditAnnexes + '">';
                }
            };

            $('#gallery').html(photoVert + photoAnnexes);

            unitegallery();

            select(photoVert, photoAnnexes);
            $(".ui-dialog-titlebar-close").on("click", function() {
                $("#cdf_map").css("opacity", "1")
            })
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
    $("#gallery").unitegallery({
        //main options:
        grid_padding: 10,
        grid_space_between_cols: 10,
        grid_space_between_rows: 10,
        //gallery options:
        gallery_theme: "tilesgrid",
        gallery_width: "100%",
        gallery_background_color: "œ#C0C0C0",
        //navigation option:
        grid_num_rows: 3,
        theme_navigation_type: "arrows",
        theme_space_between_arrows: 5,
        //tile design options:
        tile_overlay_opacity: 0.4,
        tile_overlay_color: "#000000",
        tile_enable_image_effect: false,
        //tile text panel options:
        tile_enable_textpanel: true,
        tile_textpanel_title_text_align: "center",
        tile_textpanel_always_on: true,
        tile_textpanel_title_font_size: null,
        tile_enable_action: true,
        //lightbox options:
        lightbox_slider_control_zoom: false,
        lightbox_textpanel_enable_description: true,
        lightbox_type: "compact",
        lightbox_overlay_opacity: 0.8,
        lightbox_slider_image_border: false
    });
};