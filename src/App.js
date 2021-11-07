import logo from './logo.svg';
import './App.css';
import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom";
import HomePage from "./components/HomePage/index";
import AuthProvider from "./Context/AuthProvider";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import AppProvider from './Context/AppProvider';
import AddRoomModal from './components/Modals/AddRoomModal';
import InviteMemberModal from './components/Modals/InviteMemberModal';

function App() {

  return <BrowserRouter>
    <AuthProvider>
      <AppProvider>
        <Switch>
          <Route component={Login} path="/login" />
          <Route component={ChatRoom} path="/chat" />
          <Route component={HomePage} path="/" />
        </Switch>
        <AddRoomModal/>
        <InviteMemberModal />
      </AppProvider>
    </AuthProvider>
  </BrowserRouter>;
}

export default App;
