import { defaultLocation } from "../map/geography";
import MapViewer from "../map/MapViewer";
import demoMap from "../maps/DemoMap";

export default function DemoMap() {
    return <MapViewer lat={defaultLocation.lat} lon={defaultLocation.lon}
        map={demoMap} />;
}
