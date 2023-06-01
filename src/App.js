import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './pages/Home/Home';
import About from './pages/About/About';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Navbar from './components/Navbar/Navbar';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';

import './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

import { AuthProvider } from './context/AuthContext';

import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';
import Search from './pages/Search/Search';
import Post from './pages/Post/Post';

function App() {

  const [user, setUser] = useState(undefined)
  const { auth } = useAuthentication()

  const loadingUser = user === undefined;

  useEffect(() => {
    return () => {
      onAuthStateChanged(auth, (user) => {
        setUser(user)
      })
    }
  }, [auth])

  if (loadingUser) {
    return <p>Loading...</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className='container'>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/search" element={<Search />}></Route>
              <Route path="/posts/:id" element={<Post />}></Route>
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />}></Route>
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />}></Route>
              <Route path="/posts/create" element={user ? <CreatePost /> : <Navigate to="/login" />}></Route>
              <Route path="dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />}></Route>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
