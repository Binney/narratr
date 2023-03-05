import { defaultLocation } from "../map/geography";
import Map from "../map/Map";

export default function DemoMap() {
    return <Map lat={defaultLocation.lat} lon={defaultLocation.lon}
        westEdge={-0.149554}
        eastEdge={-0.142024}
        northEdge={51.564606}
        southEdge={51.5611356}
        background='fantasy_map_demo' />;
}
