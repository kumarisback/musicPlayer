import { Route, Routes, Link, useNavigate } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./component/HomePage";
import About from "./component/About";
import PlayList from "./component/PlayList";
import Registeration from "./component/Registeration";
import { Navbar, Nav, Container } from "react-bootstrap";
import AddSong from "./component/AddSong";
import DeleteSong from "./component/DeleteSong";
import Song from "./component/Song";
import { isAuth } from "./Data/auth";
import { Fragment, useState } from "react";
import PageNotFound from "./component/pageNotFound";
import Profile from "./component/Profile";
import MySongs from "./component/MySongs";
import NewPlaylist from "./component/newPlaylist";
import ShowPlaylist from "./component/showPlaylist";
import React ,{Suspense}from "react";
// import ChartLine from "./component/chart";
import ChartLine from "../src/component/chart"
// import NewPlayListComp from "./component/NewPlayListComp";

const NewPlayListComp=React.lazy(() => import("./component/NewPlayListComp"));
const Login =React.lazy(() => import("./component/Login"));


const App = () => {
  const [user, setUser] = useState({ isLoggedIn: true, email: "root@wipro.com" });


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
            <Nav.Link hidden={!user.isLoggedIn} as={Link} to="/mysong">
              My Song
            </Nav.Link>
            
            <Nav.Link as={Link} to="/song">
              Add Song
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/graph">
              Graph
            </Nav.Link>
          </Nav>
          <div className="loginside">
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
              {user?.email?.split('@')[0]}
            </Nav.Link>
          </div>
        </Container>
        
      </Navbar>

      <isAuth.Provider value={{ isAuth: user.isLoggedIn, email: user.email }}>
        <Routes>
          <Route path="*" element={<PageNotFound />} />

          <Route index path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/playlist" element={<Suspense fallback={<div>Loading</div>}><NewPlayListComp /></Suspense>} />
          <Route path="/login" element={ <Suspense fallback={<div>Loading</div>}>
          <Login authHandle={authHandle} />
			</Suspense>} />
          <Route path="/register" element={<Registeration />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mysong" element={<MySongs />} />
          <Route path="/newplaylist" element={<NewPlaylist />} />
          <Route path="/showplaylist" element={<ShowPlaylist />} />

          <Route path="/song" element={<Song />} />
          <Route path="song/addsong" element={<AddSong />} />
          <Route path="song/editsong" element={<DeleteSong />} />
          <Route path="graph" element={<ChartLine />} />
        </Routes>
      </isAuth.Provider>
    </Fragment>
  );
};

export default App;
