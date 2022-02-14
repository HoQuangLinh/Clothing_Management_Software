import { Component } from "react";
import Dashboard from "./pages/Dashboard.jsx";
import {
  Link,
  BrowserRouter,
  Route,
  Switch,
  StaticRouter,
  Redirect,
} from "react-router-dom";

import Navbar from "./components/navbar/Navbar.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import Product from "./pages/Product.jsx";
import Staff from "./pages/staff/Staff.jsx";
import Customer from "./pages/customer/customer.jsx";
import Login from "./pages/login/Login.jsx";
export default class HomeComponent extends Component {
  state = { isAuthenticated: false };
  render() {
    const app = !this.state.isAuthenticated ? (
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route path="/login" component={Login} />
      </Switch>
    ) : (
      <div>
        <Sidebar />
        <div className="layout__content">
          <Navbar />
          <div className="layout__content-routes">
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/login" />} />
              <Route path="/home" component={Dashboard} />
              <Route
                path="/products"
                component={() => (
                  <Product initialProducts={this.props.initialProducts} />
                )}
              />
              <Route path="/staffs" component={Staff} />
              <Route path="/customers" component={Customer} />
              <Route
                path="*"
                component={({ staticContext }) => {
                  if (staticContext) staticContext.status = 404;
                  return <h1>Not Found :(</h1>;
                }}
              />
            </Switch>
          </div>
        </div>
      </div>
    );

    if (typeof window === "undefined") {
      return (
        <StaticRouter
          context={this.props.context}
          location={this.props.location}
        >
          {app}
        </StaticRouter>
      );
    }
    return <BrowserRouter>{app}</BrowserRouter>;
  }
}
