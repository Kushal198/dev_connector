import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();

        return <Component {...props} router={{ location, navigate, params }} />;
    }

    return ComponentWithRouterProp;
}

function Login(props) {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState({
        errors: {}
    });

    useEffect(() => {
        const checkAuthentication = () => {
            if (props.auth.isAuthenticated) {
                navigate('/dashboard');
            }
        };
        checkAuthentication();
    }, []);

    useEffect(() => {
        if (props.auth.isAuthenticated) {
            navigate('/dashboard');
        }
        if (props.errors) {
            setError((state) => ({ ...state, errors: props.errors }));
        }
    }, [props]);

    const { email, password } = inputs;
    const { errors } = error;

    function onChange(e) {
        const { name, value } = e.target;
        setInputs((inputs) => ({ ...inputs, [name]: value }));
    }
    function onSubmit(e) {
        e.preventDefault();
        const userData = {
            email: inputs.email,
            password: inputs.password
        };
        props.loginUser(userData);
    }

    return (
        <div className="container">
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">
                                Sign in to your DevConnector account
                            </p>
                            <form onSubmit={onSubmit}>
                                <TextFieldGroup
                                    placeholder="Email Address"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={onChange}
                                    error={errors.email}
                                />
                                <TextFieldGroup
                                    placeholder="Password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={onChange}
                                    error={errors.password}
                                />
                                <input
                                    type="submit"
                                    className="btn btn-info btn-block mt-4"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// class Login extends React.Component {
//     // constructor() {
//     //     super();
//     //     this.state = {
//     //         email: '',
//     //         password: '',
//     //         errors: {}
//     //     };
//     //     this.onChange = this.onChange.bind(this);
//     //     this.onSubmit = this.onSubmit.bind(this);
//     // }
//     componentDidMount() {
//         if (this.props.auth.isAuthenticated) {
//             console.log(this.props.router.navigate);
//             this.props.router.navigate('/dashboard');
//         }
//     }

//     componentWillReceiveProps(nextProps) {
//         if (nextProps.auth.isAuthenticated) {
//             this.props.router.navigate('/dashboard');
//         }
//         if (nextProps.errors) {
//             this.setState({ errors: nextProps.errors });
//         }
//     }
//     render() {
//         const { errors } = this.state;
//         return (
//             // <div className="container">
//             //     <div className="login">
//             //         <div className="container">
//             //             <div className="row">
//             //                 <div className="col-md-8 m-auto">
//             //                     <h1 className="display-4 text-center">
//             //                         Log In
//             //                     </h1>
//             //                     <p className="lead text-center">
//             //                         Sign in to your DevConnector account
//             //                     </p>
//             //                     <form onSubmit={this.onSubmit}>
//             //                         <div className="mb-3 form-group">
//             //                             <input
//             //                                 type="email"
//             //                                 className={classnames(
//             //                                     'form-control form-control-lg',
//             //                                     {
//             //                                         'is-invalid': errors.email
//             //                                     }
//             //                                 )}
//             //                                 placeholder="Email Address"
//             //                                 name="email"
//             //                                 value={setState(email)}
//             //                                 onChange={this.onChange}
//             //                             />
//             //                             {errors.email && (
//             //                                 <div className="invalid-feedback">
//             //                                     {errors.email}
//             //                                 </div>
//             //                             )}
//             //                         </div>
//             //                         <div className="mb-3 form-group">
//             //                             <input
//             //                                 type="password"
//             //                                 className={classnames(
//             //                                     'form-control form-control-lg',
//             //                                     {
//             //                                         'is-invalid':
//             //                                             errors.password
//             //                                     }
//             //                                 )}
//             //                                 placeholder="Password"
//             //                                 name="password"
//             //                                 value={setState(password)}
//             //                                 onChange={this.onChange}
//             //                             />
//             //                             {errors.password && (
//             //                                 <div className="invalid-feedback">
//             //                                     {errors.password}
//             //                                 </div>
//             //                             )}
//             //                         </div>
//             //                         <input
//             //                             type="submit"
//             //                             className="btn btn-info btn-block mt-4"
//             //                         />
//             //                     </form>
//             //                 </div>
//             //             </div>
//             //         </div>
//             //     </div>
//             // </div>
//         );
//     }
// }

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth,
        errors: state.errors
    };
}

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
