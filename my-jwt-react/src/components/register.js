import React from "react";
import axios from "axios"
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

const cookies = new Cookies();

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            redirect: false
        }
    }
    componentDidMount() {
        let token = cookies.get('Access_token')
        console.log(token)
        if (token) {
            this.setState({ redirect: true })
        }
    }
    handleInputChange = async (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });

    }
    onSubmit = async (event) => {
        event.preventDefault();
        await axios.post('http://localhost:3001/authenticate/', this.state)
            .then(res => {
                console.log(res)
                if (res.data.success == false) {
                    alert(res.data.response)
                    return
                } else if (res.status === 200) {
                    cookies.set('Access_token', res.data.token, [{ path: '/', expires: res.data.expireTime }]);
                    // hashHistory.push('/'); 
                    this.setState({ redirect: true })

                } else {
                    const error = new Error(res.error);
                    throw error;
                }
            })
        // .catch(err => {
        //     alert('Error logging in please try again');
        // });
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/dashboard" />;
        }
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Register / Login Below!</h1>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    required
                />
                <input type="submit" value="Submit" />
            </form>
        );

    }
}