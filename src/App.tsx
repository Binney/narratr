import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Player from './Player';
import Splash from './routes/Splash';
import Map from './routes/Map';
import preview from './stories/Preview';

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
        element: <Map />
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
