import React from "react";
import Landing from "./pages/Landing";
import Admin from "./pages/Admin";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./pages/About";
import Login from "./pages/Login";
import BottomNav from "./components/BottomNav";
import { AuthProvider } from "./components/Auth";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/about" component={About} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/admin" component={Admin} />
        </Switch>
      </Router>
      <BottomNav />
    </AuthProvider>
  );
}

export default App;
