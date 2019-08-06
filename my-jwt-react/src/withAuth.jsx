import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        redirect: false,
      };
    }

    componentDidMount() {
      let token = cookies.get('Access_token')
        if(token){
          console.log(token)          
        }else{
          this.setState({ redirect_to_login: true });

        }
    }

    render() {
      if (this.state.redirect_to_login == true) {
        return <Redirect to="/" />;
      }       
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  }
}