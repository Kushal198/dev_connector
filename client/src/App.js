import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { logoutUser, setCurrentUser } from './actions/authActions';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import store from './store';
import PrivateRoute from './components/common/PrivateRoute';
import { clearCurrentProfile } from './actions/profileActions';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

//Check for token
if (localStorage.jwtToken) {
    //Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    //decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    //set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
    //check for expire token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        //Logout user
        store.dispatch(logoutUser());
        //Clear current Profile
        store.dispatch(clearCurrentProfile());
        //Redirect to login
        window.location.href = '/login';
    }
}

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Landing />} />

                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/profiles" element={<Profiles />} />
                            <Route
                                path="/profile/:handle"
                                element={<Profile />}
                            />
                            <Route
                                path="/dashboard"
                                element={
                                    <PrivateRoute>
                                        <Dashboard />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/create-profile"
                                element={
                                    <PrivateRoute>
                                        <CreateProfile />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/edit-profile"
                                element={
                                    <PrivateRoute>
                                        <EditProfile />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/add-experience"
                                element={
                                    <PrivateRoute>
                                        <AddExperience />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/add-education"
                                element={
                                    <PrivateRoute>
                                        <AddEducation />
                                    </PrivateRoute>
                                }
                            />
                            <Route path="/not-found" element={<NotFound />} />
                            <Route
                                path="/feed"
                                element={
                                    <PrivateRoute>
                                        <Posts />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/post/:id"
                                element={
                                    <PrivateRoute>
                                        <Post />
                                    </PrivateRoute>
                                }
                            />
                        </Routes>

                        <Footer />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
