import React from "react";
import { Route, Redirect } from "react-router-dom";

const authUser = process.env.REACT_APP_LOCAL_STORAGE_USER

const AppRoute = ({
	component: Component,
	layout: Layout,
	isAuthProtected,
	groups,
	...rest
}) => {
	const user = JSON.parse(localStorage.getItem(authUser))
	return (
		<Route
			{...rest}
			render={props => {

				if (isAuthProtected && !user) {
					return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
				}

				return (
					<Layout>
						<Component {...props} />
					</Layout>
				)

			}}
		/>
	)
}

export default AppRoute;
