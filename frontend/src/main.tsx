import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import Dashboard from './pages/dashboard.tsx'
import ProfilePage from './pages/ProfilePage.tsx'
import LoginPage from "./pages/LoginPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace />}/>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/dashboard" element={<Dashboard/>} />
                    <Route path="/profile" element={<ProfilePage/>} />
                </Routes>
            </BrowserRouter>
        </Provider>
    </StrictMode>,
)
