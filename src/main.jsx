import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import HomePage from './routes/homepage/homepage.jsx'
import Postpage from './routes/postpage/postpage.jsx'
import Createpage from './routes/createpage/createpage.jsx'
import Authpage from './routes/authpage/authpage.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Profilepage from './routes/profilepage/profilepage.jsx'
import Searchpage from './routes/searchpage/searchpage.jsx'
import Mainlayaut from './routes/layouts/mainlayout.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route element={<Mainlayaut />}>
          {/* /<App /> */}
          <Route path='/' element={<HomePage />} />
          <Route path='/createpage' element={<Createpage />} />
          <Route path='/pin/:id' element={<Postpage />} />
          {/* <Route path='/auth' element={<Authpage />} /> */}
          <Route path='profilepage/:username' element={<Profilepage />} />
          <Route path='/search' element={<Searchpage />} />
        </Route>
        <Route  path='/auth' element={<Authpage />}></Route>
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
)
