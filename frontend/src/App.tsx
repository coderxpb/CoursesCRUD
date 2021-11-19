import { useState } from "react";
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import {HomePage} from "./pages/HomePage";

const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path={'/*'} element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
