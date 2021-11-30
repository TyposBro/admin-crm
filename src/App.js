import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/auth/AuthContext";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import MovieList from "./pages/movieList/MovieList";
import Movie from "./pages/movie/Movie";
import NewMovie from "./pages/newMovie/NewMovie";
import LoginPage from "./pages/login/Login.jsx";
import Lists from "./pages/lists/Lists";
import ListItem from "./pages/listItem/ListItem";
import NewList from "./pages/newList/NewList";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Loader from "react-loader-spinner";
import RegisterPage from "./pages/register/Register";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route>{user ? <DefaultContainer /> : <AuthContainer />}</Route>
      </Switch>
    </Router>
  );
}

const AuthContainer = () => {
  return (
    <Router>
      <Switch>
        <LoginPage />
      </Switch>
      <Switch>
        <RegisterPage path="/register" />
      </Switch>
    </Router>
  );
};

const DefaultContainer = () => {
  const [render, setRender] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setRender(true);
    }, 3000);
  });
  return render ? (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/movies">
            <MovieList />
          </Route>
          <Route path="/movie/:movieId">
            <Movie />
          </Route>
          <Route path="/newmovie">
            <NewMovie />
          </Route>
          <Route path="/lists">
            <Lists />
          </Route>
          <Route path="/list/:listId">
            <ListItem />
          </Route>
          <Route path="/newlist">
            <NewList />
          </Route>
        </Switch>
      </div>
    </Router>
  ) : (
    <div className="loader">
      <Loader type="Circles" color="Grey" height={100} width={100} />
    </div>
  );
};

export default App;
