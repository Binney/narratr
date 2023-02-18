export interface SpaceProps {
    eastEdge: number;
    westEdge: number;
    northEdge: number;
    southEdge: number;
}

export const metresPerDegreeLon = 6371 * 1000 * 2 * Math.PI / 360;
export const scale = 1 * metresPerDegreeLon; // 1px = 1m

// Nicked from https://www.movable-type.co.uk/scripts/latlong.html
// Thanks, Chris!
export function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // metres
    // Cor, look at that! Greek letters are valid JavaScript identifiers! Cool, huh?
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // in metres
}
