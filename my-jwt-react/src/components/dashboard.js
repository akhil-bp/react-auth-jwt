import React from "react";
import axios from "axios"
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const float={
    float:"right",
    color:"red"
}
export default class Dashboard extends React.Component {
    state = {
        data: {}
    }
    getUser = async () => {
        let token = cookies.get('Access_token')
        //3.38  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFraGlsLmJwQGVuZmludGVjaG5vbG9naWVzLmNvbSIsInBhc3N3b3JkIjoiYWFhIiwiZXhwIjoxNTY1MDg5NjM4LCJpYXQiOjE1NjUwODYwMzh9.yONBXeW1rTCqv6IatkTdG_ZXU9f0hPokuIDOUX_eees
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        await axios.post('http://localhost:3001/api')
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data.response)
                    if (res.data.response == "expired") {
                        cookies.remove('Access_token')
                        this.setState({ data: "token error or expired" })
                        alert("401 UNAUTHORIZED!")
                    } else {
                        this.setState({ data: res.data.response })
                    }
                } else {
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .catch(err => {
                alert('401 UNAUTHORIZED');
                this.setState({ data: err })
            });
    }
    logout = ()=>{
        cookies.remove('Access_token')
        this.props.history.push('/')
    }
    render() {

        return (
            <div>
                Dashboard
                <button onClick={this.getUser}>get all users </button>
                (works only if authenticated)
                <br />{JSON.stringify(this.state.data)}
                <button onClick={this.logout} style={float}>Log Out </button>
            </div>
        )

    }
}