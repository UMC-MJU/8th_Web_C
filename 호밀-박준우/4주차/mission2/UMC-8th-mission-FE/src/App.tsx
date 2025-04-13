import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import HomeLayout from './layout/HomeLayout'
import { NotFound } from './pages/NotFound'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

const router = createBrowserRouter([
  {
    path:"/",
    element:<HomeLayout />,
    errorElement:<NotFound />,
    children: [
      {index: true, element: <HomePage/>},
      {path: 'login', element:<LoginPage />},
      {path: 'sighup', element: <SignupPage />},
    ]
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
