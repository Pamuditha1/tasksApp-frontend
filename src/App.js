
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {Route, Switch} from 'react-router-dom'

import Tasks from './components/Tasks';
import Login from './components/Login';
import Register from './components/Register';

function App() {

  return (
    <div className="container">

      {/* Notification Component */}
      <ToastContainer />
      <Switch>
        <Route path="/app" component={Tasks} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
