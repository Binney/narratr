export interface SpaceProps {
    eastEdge: number;
    westEdge: number;
    northEdge: number;
    southEdge: number;
}

export const metresPerDegreeLon = 6371 * 1000 * 2 * Math.PI / 360;
export const scale = 1 * metresPerDegreeLon; // 1px = 1m
