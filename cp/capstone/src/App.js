import { Route, Routes, Link, useNavigate } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./component/HomePage";
import About from "./component/About";
import Login from "./component/Login";
import PlayList from "./component/PlayList";
import Registeration from "./component/Registeration";
import { Navbar, Nav, Container } from "react-bootstrap";
import AddSong from "./component/AddSong";
import DeleteSong from "./component/DeleteSong";
import Song from "./component/Song";
import { isAuth } from "./Data/auth";
import { Fragment, useState,useRef } from "react";
import PageNotFound from "./component/pageNotFound";
import Profile from "./component/Profile";
import MySongs from "./component/MySongs";


const App = () => {
  const [user, setUser] = useState({ isLoggedIn: false, email: "" });


  const authHandle = (props) => {
    setUser({ isLoggedIn: props.auth, email: props.email });
  };
  let navigate = useNavigate();

  const CheckUser = () => {
    if (!user.isLoggedIn) {
      alert("To create/see your playList Login First");
      navigate("/login", { replace: true });
      return;
    } else {
      navigate("/playlist", { replace: true });
    }
  };



  return (
    <Fragment>
      <Navbar className="nav-home" bg="dark" variant="dark" >
        <Container >
          <Navbar.Brand as={Link} to="/">
            Home
          </Navbar.Brand>
          <Nav className="me-auto nav-home" >
            <Nav.Link onClick={CheckUser}>
              {" "}
              {/*as={Link} to="/playlist" */}
              PlayList
            </Nav.Link>
            <Nav.Link
              className="login"
              onClick={() => {
                if (user.isLoggedIn) {
                  if (window.confirm("Are you sure you want to logout?")) {
                    setUser({ email: null, isLoggedIn: false });
                    navigate("/login");
                    console.log(user);
                  }
                }
                else{
                  navigate("/login");
                }
              }}
              // as={Link}
              // to="/login"
            >
              {user.isLoggedIn ? "Logout" : "Login"}
            </Nav.Link>
            <Nav.Link
            hidden={!user.isLoggedIn}
              className="profile"
              onClick={() => {
                if (user.isLoggedIn) {
                  {
                    navigate("/profile");
                  }
                }
              }}
              as={Link}
              to="/profile"
            >
              profile
            </Nav.Link>
            <Nav.Link hidden={!user.isLoggedIn} as={Link} to="/mysong">
              My Song
            </Nav.Link>
            
            <Nav.Link as={Link} to="/song">
              Songs
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
          </Nav>
        </Container>
        
      </Navbar>

      <isAuth.Provider value={{ isAuth: user.isLoggedIn, email: user.email }}>
        <Routes>
          <Route path="*" element={<PageNotFound />} />

          <Route index path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/playlist" element={<PlayList />} />
          <Route path="/login" element={<Login authHandle={authHandle} />} />
          <Route path="/register" element={<Registeration />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mysong" element={<MySongs />} />

          <Route path="/song" element={<Song />} />
          <Route path="song/addsong" element={<AddSong />} />
          <Route path="song/editsong" element={<DeleteSong />} />
        </Routes>
      </isAuth.Provider>
    </Fragment>
  );
};

export default App;
