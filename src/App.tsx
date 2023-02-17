import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Player from './Player';
import Splash from './routes/Splash';
import Map from './routes/Map';
import preview from './stories/Preview';
import demo from './stories/Demo';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Player story={preview} />
    },
    {
        path: "/comingsoon",
        element: <Splash />
    },
    {
        path: "/map",
        element: <Map westEdge={-0.14956} eastEdge={-0.13883} northEdge={51.56532} southEdge={51.56107} />
    },
    {
        // TODO better routing by slug
        path: "/stories/demo",
        element: <Player story={demo} />
    }
])

function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
