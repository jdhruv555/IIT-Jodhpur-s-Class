// Initialize the map with custom options
const map = L.map('map', {
    zoomControl: false,
    minZoom: 4,
    maxZoom: 18
}).setView([23.5937, 78.9629], 5);

// Add custom zoom control to the top-right
L.control.zoom({
    position: 'topright'
}).addTo(map);

// Add OpenStreetMap as base layer with political boundaries
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: ' OpenStreetMap contributors',
    maxZoom: 18,
    opacity: 1
}).addTo(map);

// Add administrative boundaries
L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lines/{z}/{x}/{y}.png', {
    opacity: 0.4
}).addTo(map);

// Add clear labels on top
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png', {
    subdomains: 'abcd',
    maxZoom: 18,
    opacity: 1
}).addTo(map);

// Store markers in an object for easy access
const markers = {};
const glowText = document.getElementById('glowText');

// Enhanced custom marker icon with modern cosmic design
const customIcon = L.divIcon({
    className: 'custom-marker',
    html: `
        <div class="marker-outer">
            <div class="marker-pulse"></div>
            <div class="marker-core"></div>
            <div class="marker-ring"></div>
        </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
});

// Modern animation for glowing text
function showGlowingText(text) {
    glowText.textContent = text;
    glowText.style.opacity = '0';
    glowText.style.transform = 'translate(-50%, -50%) scale(0.9)';
    
    requestAnimationFrame(() => {
        glowText.style.opacity = '1';
        glowText.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    setTimeout(() => {
        glowText.style.opacity = '0';
        glowText.style.transform = 'translate(-50%, -50%) scale(1.1)';
    }, 2000);
}

// Modern popup content with enhanced styling
function createPopupContent(location) {
    return `
        <div class="popup-content">
            <h3>${location.name}</h3>
            <div class="popup-details">
                <p><span class="label">District</span>${location.district}</p>
                <p><span class="label">State</span>${location.state}</p>
            </div>
        </div>
    `;
}

// Enhanced location list item with modern hover effects
function createLocationListItem(location) {
    const div = document.createElement('div');
    div.className = 'location-item';
    div.innerHTML = `
        <div class="location-content">
            <div class="location-icon">
                <div class="mini-marker"></div>
            </div>
            <div class="location-text">
                <h3>${location.name}</h3>
                <p>${location.district}, ${location.state}</p>
            </div>
        </div>
        <div class="location-hover-effect"></div>
    `;
    
    div.addEventListener('click', () => {
        const marker = markers[location.name];
        map.flyTo(marker.getLatLng(), 10, {
            duration: 1.2,
            easeLinearity: 0.25
        });
        marker.openPopup();
        showGlowingText(location.name);
    });
    
    return div;
}

// Add markers with modern interactions
const locationsList = document.getElementById('locations');
locations.forEach(location => {
    const marker = L.marker(location.coords, { 
        icon: customIcon,
        riseOnHover: true
    })
    .bindPopup(createPopupContent(location), {
        className: 'custom-popup modern',
        closeButton: false,
        offset: [0, -20]
    })
    .addTo(map);
    
    // Modern hover interactions
    marker.on('mouseover', function() {
        this.openPopup();
        this._icon.classList.add('marker-hover');
    });
    
    marker.on('mouseout', function() {
        this._icon.classList.remove('marker-hover');
    });
    
    marker.on('click', () => {
        showGlowingText(location.name);
        map.flyTo(marker.getLatLng(), 10, {
            duration: 1.2,
            easeLinearity: 0.25
        });
    });
    
    markers[location.name] = marker;
    locationsList.appendChild(createLocationListItem(location));
});

// Add cosmic background with stars
const stars = 150;
const mapContainer = document.querySelector('.map-container');

for (let i = 0; i < stars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2;
    star.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: twinkle ${Math.random() * 4 + 2}s infinite;
    `;
    mapContainer.appendChild(star);
}

// Modern map interactions
map.on('popupopen', function(e) {
    if (!map.getBounds().contains(e.popup.getLatLng())) {
        map.flyTo(e.popup.getLatLng(), 10, {
            duration: 1.2,
            easeLinearity: 0.25
        });
    }
});
