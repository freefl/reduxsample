import React from 'react'
import { Route, IndexRoute} from 'react-router';


import Greetings from './components/Greetings';
import App from './components/app';
import SignupPage from './components/signup/SignupPage';


export default (

	<Route path = "/" component={App} >
		<IndexRoute component={Greetings} />
		<Route path="signup" component={SignupPage} />
	</Route>

)