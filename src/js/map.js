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

  MyIconLayout = ymaps.templateLayoutFactory.createClass([
    '<svg width="46" height="57" style="position: absolute; top: -35px; left: -52px;">',
        '<use href="img/icons/sprite.svg#map--map"/>',
    '</svg>'
].join(''));

  const myCollections = new ymaps.GeoObjectCollection({}, {
    draggable: false,
    iconLayout: MyIconLayout,
  });

  coords.forEach (coord  => {
    myCollections.add(new ymaps.Placemark(coord));
  });

  myMap.geoObjects.add(myCollections);
}


ymaps.ready(init);

