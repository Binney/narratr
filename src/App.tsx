import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Player from './Player';
import Splash from './routes/Splash';
import demo from './stories/Demo';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Splash />
    },
    {
        path: "/intro",
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
