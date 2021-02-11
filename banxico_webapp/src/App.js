import React, { Component } from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { registerLocale } from "react-datepicker";

// Import Routes
import { authProtectedRoutes, publicRoutes } from "./routes/";
import AppRoute from "./routes/route";

// layouts
import Layout from "./components/Layout/";
import NonAuthLayout from "./components/NonAuthLayout";

// Import moment
import 'moment-timezone';
import 'moment/locale/es';

// Import datepicker
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';

// Import scss
import "./assets/scss/theme.scss";


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		registerLocale('es', es)

		return (
			<React.Fragment>
				<Router>
					<Switch>
						{publicRoutes.map((route, idx) => (
							<AppRoute
								path={route.path}
								layout={NonAuthLayout}
								component={route.component}
								key={idx}
								isAuthProtected={false}
							/>
						))}

						{authProtectedRoutes.map((route, idx) => (
							<AppRoute
								path={route.path}
								layout={Layout}
								component={route.component}
								key={idx}
								isAuthProtected={true}
							/>
						))}
					</Switch>
				</Router>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		layout: state.Layout
	};
};

export default connect(mapStateToProps, null)(App);
