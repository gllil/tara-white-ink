import React from "react";
import Landing from "./pages/Landing";
import Admin from "./pages/Admin";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./pages/About";
import Login from "./pages/Login";
import BottomNav from "./components/BottomNav";
import { AuthProvider } from "./auth/Auth";
import PrivateRoute from "./auth/PrivateRoute";
import StoreFront from "./pages/StoreFront";
import { GlobalState } from "./globalState/globalState";

function App() {
  return (
    <GlobalState>
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/about" component={About} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/store" component={StoreFront} />
            <PrivateRoute exact path="/admin" component={Admin} />
          </Switch>
        </Router>
        <BottomNav />
      </AuthProvider>
    </GlobalState>
  );
}

export default App;
