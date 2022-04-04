let myMap;

const init = () => {
  myMap = new ymaps.Map("map", {

  center: [55.704925, 37.641910],
  controls: [],
  zoom: 15
  });

  const coords = [
    [55.704925, 37.641910],
    [55.709780, 37.655858]
  ];

  const myCollections = new ymaps.GeoObjectCollection({}, {
    draggable: false,
    iconLayout: 'default#image',
    iconImageHref: "img/map/map.svg",
    iconImageSize: [46, 57],
    iconImageOffset: [-35, -52]
  });

  coords.forEach (coord  => {
    myCollections.add(new ymaps.Placemark(coord));
  });

  myMap.geoObjects.add(myCollections);
}


ymaps.ready(init);

