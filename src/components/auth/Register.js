import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import '../../stylesheets/register.css';


class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            password2: '',
            gitName: '',
            imgURL: '',
            errors: {},
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)      
    }
    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            username: this.state.username,
            password: this.state.password,
            password2: this.state.password2,
            gitName: this.state.gitName,
            imgURL: this.state.imgURL
        }

    // console.log(newUser);
    axios.post('/api/user/register', newUser)
        .then(
            (res) => {
                
                console.log('data: ',res.data)
                if( res.data.gitName === 'Github username not found'){
                    swal({
                        title: "Github Username Not found!",
                        text: "Please enter valid github username",
                        type: "error"
                    })
                }
                else {
                swal({
                    title: "User created",
                    text: "Please login",
                    type: "success"
                }).then((res) => {
                    this.props.history.push("/");
                })
            }
            })
        .catch( (err) => {
            console.log(err.data)
            swal({
                title: "Error",
                text: "Incorrect Information",
                type: "error"
            })
        })
    }
        
    render() {
        return (
                <div className="parallax">
                    <form className="register-form"onSubmit = {this.onSubmit}>
                    <h1>Create Account</h1>
                    <h2 className="label">USERNAME</h2>
                    <input type="text" minLength="6" autoComplete="off" placeholder="6 characters minimum" name="username" value={this.state.username} required onChange={this.onChange}></input>
                    <h2 className="label">GITHUB USERNAME  <strong>*ONLY GITHUB USERNAME*</strong></h2>
                    <input type="text" autoComplete="off" placeholder="Github username" name="gitName" value={this.state.gitName} required onChange={this.onChange}></input>
                    <h2 className="label">PROFILE PHOTO <strong> ** MUST SEE FACE CLEARLY **</strong></h2>
                    <input type="file" className="input-" required onChange={(e) => this.setState({imgURL: e.target.value.replace("C:\\fakepath\\", "")})}/>                    
                    <h2 className="label">PASSWORD</h2>
                    <input id="passwordForm1" type="password"  minLength="6" autoComplete="off" placeholder="6 characters minimum" name="password" value={this.state.password} required onChange={this.onChange}></input>
                    <h2 className="label">CONFIRM PASSWORD</h2>
                    <input id="passwordForm2" type="password"  minLength="6" autoComplete="off" placeholder="6 characters minimum" name="password2" value={this.state.password2} required onChange={this.onChange}></input>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}

export default Register