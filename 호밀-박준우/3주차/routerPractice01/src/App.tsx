import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/home';
import NotFound from './pages/not-found';
import MoviesPage from './pages/movies';
import RootLayout from './layout/root-layout';
import MoviePage from './pages/movie';

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
      }
    ]
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App;