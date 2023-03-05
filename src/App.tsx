import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Player from './Player';
import Splash from './routes/Splash';
import preview from './stories/Preview';
import demo from './stories/Demo';
import DemoMap from './routes/DemoMap';
import Game from './Game';

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
        element: <DemoMap />
    },
    {
        // TODO better routing by slug
        path: "/stories/demo",
        element: <Game story={demo} />
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
