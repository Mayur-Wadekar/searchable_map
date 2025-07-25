// Initialize the map
const map = L.map('map').setView([51.505, -0.09], 13);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add a marker for initial location
const marker = L.marker([51.505, -0.09]).addTo(map)
    .bindPopup('Welcome to the Searchable Map!').openPopup();

// Handle search functionality
document.getElementById('searchButton').addEventListener('click', function() {
    const location = document.getElementById('search').value;
    if (location) {
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const lat = data[0].lat;
                    const lon = data[0].lon;

                    map.setView([lat, lon], 14);
                    marker.setLatLng([lat, lon])
                            .bindPopup(`<strong>${data[0].display_name}</strong>`).openPopup();
                } else {
                    alert('Location not found!');
                }
            })
            .catch(error => console.error('Error fetching location:', error));
    } else {
        alert('Please enter a location to search.');
    }
});