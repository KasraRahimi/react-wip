import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/home.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import Dashboard from './pages/dashboard.tsx'
import ProfilePage from './pages/ProfilePage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/profile" element={<ProfilePage/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
