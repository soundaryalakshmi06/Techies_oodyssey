// Accepts { latitude, longitude } | { lat, lng } | { lat, lon } | GeoJSON | [lng, lat]
export const toGeoPoint = (loc) => {
    if (!loc) return undefined;

    let lng;
    let lat;
    if (Array.isArray(loc) && loc.length === 2) {
        [lng, lat] = loc;
    } else if (Array.isArray(loc.coordinates) && loc.coordinates.length === 2) {
        [lng, lat] = loc.coordinates;
    } else {
        lng = loc.longitude ?? loc.lng ?? loc.lon;
        lat = loc.latitude ?? loc.lat;
    }

    if (lng == null || lat == null) return undefined;
    lng = Number(lng);
    lat = Number(lat);
    if (!Number.isFinite(lng) || !Number.isFinite(lat)) return undefined;
    if (Math.abs(lng) > 180 || Math.abs(lat) > 90) return undefined;

    return { type: 'Point', coordinates: [lng, lat] };
};