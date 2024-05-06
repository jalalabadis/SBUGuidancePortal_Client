import { ThemeProvider } from "./context/Themes";
import { LoaderProvider } from "./context/Preloader";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

import Error from "./pages/Error";

import PushNotification from "./context/PushNotification";
function App() {
  return (
<ThemeProvider>
<LoaderProvider>
<PushNotification/>
<BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="*" element={<Error />} />
        </Routes>
    </BrowserRouter>
   
    </LoaderProvider>
   </ThemeProvider>
  );
}

export default App;
