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
import Staff from "./pages/Staff.jsx";
import AddProductModal from "../Content/components/modal/AddProductModal.jsx"

export default class HomeComponent extends Component {
    constructor() {
        super();
        this.state = {
            show: false
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

  render() {
    const app = (
        <div>
            <AddProductModal handleClose={this.hideModal} show={this.state.show} />
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
                                <Product showModal={this.showModal} />
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
