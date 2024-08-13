const socket = io();

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        function (position) {
            const { latitude, longitude } = position.coords;
            socket.emit("send-location", { latitude, longitude });
        },
        error => {
            console.log(error);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        }
    );
}
const map = L.map("map");
map.setView([0,0],16);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {attribution: "OpenStreetMap"
        }).addTo(map);

const markers ={};
socket.on("receive-location",(data)=>{
    const { latitude, longitude } = data;
    map.setView([latitude ,longitude]);
    if (!markers[latitude]) {
        markers[latitude] = L.marker([latitude, longitude]).addTo(map);
        }
});

