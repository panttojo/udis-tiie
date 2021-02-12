import React from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";

  // Dashboard
import Dashboard from "../pages/Dashboard/index";
import TIIE from "../pages/TIIE/index"

const authProtectedRoutes = [

	{ path: "/dashboard", component: Dashboard },
	{ path: "/tiie", component: TIIE },

	// this route should be at the end of all other routes
	{ path: "/", exact: true, component: () => <Redirect to="/dashboard" /> }
];

const publicRoutes = [
	{ path: "/logout", component: Logout },
	{ path: "/login", component: Login },
];

export { authProtectedRoutes, publicRoutes };
