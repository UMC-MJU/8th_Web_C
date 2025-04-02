import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/home';
import NotFound from './pages/not-found';
import MoviesPage from './pages/movies';
import RootLayout from './layout/root-layout';
import MoviePage from './pages/movie';
import NowPlaying from './pages/nowplaying';
import TopRated from './pages/toprated';
import UpComming from './pages/upcomming';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomePage /> 
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
        path: 'toprated',
        element: <TopRated />
      }, {
        path: 'upcomming',
        element: <UpComming />
      }    
    ]
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App;