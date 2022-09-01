import Header from "./components/Header";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import FrontPage from "./components/FrontPage";
import RegisterBabySitter from "./components/RegisterBabysitter";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div> <Header /> <FrontPage /> </div>}> </Route>
          <Route path="/register-babysitter" element={<div> <Header /> <RegisterBabySitter /> </div>}></Route>
        </Routes>
      </BrowserRouter>
      

    </div>
  );
}

export default App;
