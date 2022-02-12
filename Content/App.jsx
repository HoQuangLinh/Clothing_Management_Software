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

export default class HomeComponent extends Component {

  render() {
    const app = (
        <div>
            
        <Sidebar />
        <div className="layout__content">
          <Navbar />
          <div className="layout__content-routes">
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/home" />} />
              <Route path="/home" component={Dashboard} />
              <Route
                path="/products"
                component={() => (
                    <Product />//showModal={this.showModal} />
                    )}
            />
              <Route path="/staffs" component={Staff} />
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
