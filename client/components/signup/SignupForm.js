import React from 'react';
import classnames from 'classnames';
import validateInput from '../../../server/shared/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';


class SignupForm extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			username:'',
			email:'',
			password: '',
			passwordConfirmation: '',
			errors:{},
			isLoading:false
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e){
		this.setState({[e.target.name]:e.target.value});
	}

	isValid()	{
		const {errors, isValid} = validateInput(this.state);

		if(!isValid){
			this.setState({errors});
		}

		return isValid;
		//return true;
	}

	onSubmit(e){
		e.preventDefault();

		if(this.isValid())
		{
			this.setState({errors:{}, isLoading:true} );

			this.props.userSignupRequest(this.state).then(
				() => {
					this.props.addFlashMessage({
						type: 'success',
						text: 'You signed up successfuly. Welcome'
					});
					console.log("back from service call");
					this.context.router.push('/');
				},
				(err) => this.setState({errors:err.response.data, isLoading: false})
		);
		}
		//axios.post('/api/users',{user: this.state});
	}


	render() {
		const {errors } = this.state;
		return (
			<form onSubmit={this.onSubmit}>
				<h1>Join MyCircle Community!</h1>


				<TextFieldGroup
	          		error={errors.username}
	          		label="Username"
	          		onChange={this.onChange}
	          		checkUserExists={this.checkUserExists}
	          		value={this.state.username}
	          		field="username"
	        	/>

		        <TextFieldGroup
		          error={errors.email}
		          label="Email"
		          onChange={this.onChange}
		          checkUserExists={this.checkUserExists}
		          value={this.state.email}
		          field="email"
		        />

		        <TextFieldGroup
		          error={errors.password}
		          label="Password"
		          onChange={this.onChange}
		          value={this.state.password}
		          field="password"
		          type="password"
		        />

		        <TextFieldGroup
		          error={errors.passwordConfirmation}
		          label="Password Confirmation"
		          onChange={this.onChange}
		          value={this.state.passwordConfirmation}
		          field="passwordConfirmation"
		          type="password"		
		         />
			    

				<div className="form-group">
						<button disabled = {this.state.isLoading} className="btn btn-primary btn-lg">
							Sign up
						</button>
				</div>
			</form>
		);
	}
}

SignupForm.propTypes = {
	userSignupRequest: React.PropTypes.func.isRequired,
	addFlashMessage: React.PropTypes.func.isRequired
}

SignupForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default SignupForm;