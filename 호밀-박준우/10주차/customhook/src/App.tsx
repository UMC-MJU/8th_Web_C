import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/home';
import NotFound from './pages/not-found';
import MoviesPage from './pages/movies';
import RootLayout from './layout/root-layout';
import MoviePage from './pages/movie';
import NowPlaying from './pages/nowplaying';
import TopRated from './pages/toprated';
import UpComming from './pages/upcomming';
import NowPlayingPage from './pages/nowplayinDetail';
import TopRatedPage from './pages/topratedDetail';
import UpcommingPage from './pages/upcommingDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home/> 
      }, {
        path: 'movies',
        element: <MoviesPage />
      }, {
        path: 'movies/:id',
        element: <MoviePage />
      }, {
        path: 'nowplaying',
        element: <NowPlaying />
      }, {
        path: 'nowplaying/:id',
        element: <NowPlayingPage />
      }, {
        path: 'toprated',
        element: <TopRated />
      }, {
        path: 'toprated/:id',
        element: <TopRatedPage />
      }, {
        path: 'upcomming',
        element: <UpComming />
      }, {
        path: 'upcomming/:id',
        element: <UpcommingPage />
      }    
    ]
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App;