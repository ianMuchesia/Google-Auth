import { useEffect, useState } from 'react'

import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import axios from 'axios';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';


function App() {
  const [user, setUser] = useState(null);


  
	const getUser = async () => {
		try {
			const url = `http://localhost:4000/auth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
			setUser(data.user._json);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

  return (
    <>
     <div className="container">
			<Routes>
				<Route
				
					path="/"
					element={user ? <Home user={user} /> : <Navigate to="/login" />}
				/>
				<Route
				
					path="/login"
					element={user ? <Navigate to="/" /> : <Login />}
				/>
				<Route
					path="/signup"
					element={user ? <Navigate to="/" /> : <SignUp />}
				/>
			</Routes>
		</div>
    </>
  )
}

export default App
