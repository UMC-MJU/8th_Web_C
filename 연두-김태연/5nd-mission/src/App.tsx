import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Page/LoginPage";
import EmailSignUpPage from './Page/EmailSignUpPage';
import PassSignUpPage from './Page/PassSignUpPage';
import FinalSignUpPage from "./Page/FinalSignUpPage";
import HomePage from './Page/HomePage';
import MyPage from "./Page/MyPage";
import Layout from "./Layout";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/LoginPage" element={<LoginPage/>}></Route>
          <Route
            path="/MyPage"
            element={
              <ProtectedRoute>
                <MyPage />
              </ProtectedRoute>
            }
          />
          <Route path="/EmailSignUpPage" element={<EmailSignUpPage/>}></Route>
          <Route path="/PassSignUpPage" element={<PassSignUpPage/>}></Route>
          <Route path="/FinalSignUpPage" element={<FinalSignUpPage/>}></Route>
        </Route>
        
      </Routes>
    </Router>
    </AuthProvider>
  )
}

export default App
