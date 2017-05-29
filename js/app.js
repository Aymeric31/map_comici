$( document ).ready(function() {
    console.log( "ready!" );
    var mymap = L.map('mapid').setView([51.505, -0.09], 13);
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXltZXJpYzMxIiwiYSI6ImNqM2E2dzl5cTAwMzgycW83ZWhvbHFhZGwifQ.zuFKT4e7IjgpwHoxF_Xfeg';
    var map = new mapboxgl.Map({
        container: 'mapid',
        style: 'mapbox://styles/mapbox/streets-v9',

    }
});


});