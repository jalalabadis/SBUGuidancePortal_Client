import { ThemeProvider } from "./context/Themes";
import { LoaderProvider } from "./context/Preloader";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Error from "./pages/Error";
import Announcementpost from "./pages/Announcementpost";
import Profile from "./pages/Profile";

function App() {
  return (
<ThemeProvider>
<LoaderProvider>
<BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/announcement/:id" element={<Announcementpost/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="*" element={<Error />} />
        </Routes>
    </BrowserRouter>
   
    </LoaderProvider>
   </ThemeProvider>
  );
}

export default App;
