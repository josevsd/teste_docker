import Login from "./pages/Login_Register/Login";
import Register from "./pages/Login_Register/Register";
import Departments from './pages/Department';
import TablePage from './pages/TablePage/Dashboard';
import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store';
import MainPageUsers from "./pages/PageUser/mainPageUsers";
import TableUser from "./pages/PageUser/mainPageUsers";
import TableVerification from "./pages/PageVerification/mainPageVerification";


function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/departments" element={<Departments/>}/>
        <Route path="/table" element={<TablePage />}/>
        <Route path="/tableUsers" element={<TableUser />}/>
        <Route path="/verifications" element={<TableVerification />}/>
        <Route path="/users" element={<MainPageUsers />} />
      </Routes>
    </Provider>
  );
}

export default App;
