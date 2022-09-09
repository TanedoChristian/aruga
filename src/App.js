import Header from "./components/Header";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import FrontPage from "./components/FrontPage";
import RegisterBabySitter from "./components/RegisterBabysitter";
import DashBoard from './components/Dashboard';
import {CookiesProvider} from 'react-cookie';
import {ReactSession} from 'react-client-session';
import Logout from "./components/Logout";
import Signin from "./components/Signin";
import Postjob from "./components/Postjob";
function App() {

  ReactSession.setStoreType("localStorage");
  return (
    <div>
      <CookiesProvider>
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<div> <Header home={"Home"} contact={"Contact Us"}/> <FrontPage /> </div>}> </Route>
          <Route path="/register" element={<div> <Header /> <RegisterBabySitter /> </div>}></Route>
          <Route path="/signin" element={<div> <Signin /> </div>} ></Route>
          <Route path="/dashboard" element={<div>  <DashBoard /> </div>}></Route>
          <Route path="/logout" element={<div><Logout /></div>}></Route>
          <Route path="/postjob" element={<div><Postjob /></div>}></Route>
        </Routes>
      </BrowserRouter>
      </CookiesProvider>
      

    </div>
  );
}

export default App;
