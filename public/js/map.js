let map = L.map("map").setView(Listing.geometry.coordinates, 9);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 20,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
let marker = L.marker(Listing.geometry.coordinates)
  .addTo(map)
  .bindPopup(
    `<h4><b>${Listing.location}</b></h4><h6>Exact location provided after booking</h6>`
  )
  .addTo(map);

var circle = L.circle(Listing.geometry.coordinates, {
  color: "#993955",
  fillColor: "#993955",
  fillOpacity: 0.2,
  radius: 17000,
}).addTo(map);

// console.log(Coordinates);
// console.log(
//   "---------------------------------Done----------------------------------------"
// );
