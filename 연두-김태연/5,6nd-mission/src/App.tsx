import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import LoginPage from "./Page/LoginPage";
import EmailSignUpPage from './Page/EmailSignUpPage';
import PassSignUpPage from './Page/PassSignUpPage';
import FinalSignUpPage from "./Page/FinalSignUpPage";
import HomePage from './Page/HomePage';
import MyPage from "./Page/MyPage";
import RedirectPage from "./Page/RedirectPage";
import SpinningCD from "./components/SpinningCD";
import DetailLP from "./Page/DetailLP";
import Layout from "./Layout";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

const queryClient = new QueryClient(); 

function App() {
  return (
    <QueryClientProvider client={queryClient}> 
      <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/LoginPage" element={<LoginPage/>}></Route>
            <Route path="/v1/auth/google/callback" element={<RedirectPage />} />
            <Route
              path="/MyPage"
              element={
                <ProtectedRoute>
                  <MyPage />
                </ProtectedRoute>
              }
            />
              <Route
              path="/DetailLP"
              element={
                <ProtectedRoute>
                  <DetailLP />
                </ProtectedRoute>
              }
            />
            <Route path="/EmailSignUpPage" element={<EmailSignUpPage/>}></Route>
            <Route path="/PassSignUpPage" element={<PassSignUpPage/>}></Route>
            <Route path="/FinalSignUpPage" element={<FinalSignUpPage/>}></Route>
            
            {/* <Route path="/DetailLP" element={<DetailLP/>}></Route>   */}

            {/* <Route path="/spinning-cd" element={<SpinningCD/>}></Route>   */}
          </Route>
          
        </Routes>
      </Router>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
