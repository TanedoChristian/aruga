import Header from "./components/Header";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import FrontPage from "./components/FrontPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div> <Header /> <FrontPage /> </div>}> </Route>
        </Routes>
      </BrowserRouter>
      

    </div>
  );
}

export default App;
