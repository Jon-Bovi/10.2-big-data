(function(module) {
  var zip = {};

  getData = function() {
    $.getJSON('../data/manhattan.json', function(data) {
      // TODO: start here!
      // narrow down object list
      zip.zips = data.features.map(function(feature) {
        return {
          zip: feature.properties.zip,
          neighborhood: feature.properties.neighborhood,
          address: feature.properties.address || null,
          coordinates: {
            lat: feature.geometry.coordinates[1],
            lng: feature.geometry.coordinates[0]
          }
        };
      });
      // build array with an element for each distinct neighborhood
      zip.topNeighborhoods = zip.zips.reduce(function(acc, cur) {
        index = acc.findIndex(function(element) {
          return element.neighborhood === cur.neighborhood;
        });
        if (index !== -1) {
          acc[index].numZips++;
        } else {
          acc.push({
            neighborhood: cur.neighborhood,
            numZips: 1
          });
        }
        return acc;
      }, [])
      // slice and dice
      .sort(function compare(a,b){
        return b.numZips - a.numZips;
      })
      .slice(0,5);
    });
  };

  getData();
  // console.log(zip.features);
  module.zip = zip;
})(window);
