import React, { Component } from 'react';
import '../css/App.css';
import logo from '../img/logo.svg';
import {FormControl,FormGroup,ControlLabel,Button} from 'react-bootstrap';

class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            login: '',
            pass: ''
        }

        this._handleChange = this._handleChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit(e) {
        e.preventDefault();

        if (this.state.login === '' || this.state.pass === '') {
            alert('Campos inválidos');
            return;
        }


        let body = JSON.stringify({login:this.state.login , pass:this.state.pass});

        fetch('http://localhost:8000/login' , {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        }).then( res => res.json())
        .then( (result) => {
            if (result.response) {
                alert('Logado');
            } else if (result.error) {
                alert('Login ou Senha inválidos');
            }
        })
        .catch( (err) => {
            console.log(err);
        });
    }

    _handleChange(e) {
        if (e.target.type === 'text') {
            this.setState({
                login: e.target.value
            });
        } else {
            this.setState({
                pass: e.target.value
            });
        }
    }

    render() {

        const {login,pass} = this.state;

        return (
            <div className="App" className="form_login">
                <form onSubmit={this._handleSubmit} >
                    <FormGroup>
                        <ControlLabel>Login</ControlLabel>
                        <FormControl
                            type="text"
                            placeholder="Login"
                            value={login}
                            onChange={this._handleChange}
                        />
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            type="password"
                            placeholder="Password"
                            value={pass}
                            onChange={this._handleChange}
                        />
                    <Button type="submit">Submit</Button>
                    </FormGroup>
                </form>
            </div>
        );
    }

}

export default App;
