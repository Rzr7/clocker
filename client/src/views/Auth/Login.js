import React, { Component } from 'react';
import './App.css';
import $ from "jquery";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import checkAuth from 'Functions'
import { signup, login } from 'util/APIUtils';
import { ACCESS_TOKEN } from 'constants/index.js';

library.add(faCheck)

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      name: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentDidMount() {
    checkAuth().then(function(result) {
        if (result) {
            window.location.replace("/app/dashboard");
        }
    });

    $(".input input").focus(function() {

      $(this).parent(".input").each(function() {
        $("label", this).css({
            "line-height": "18px",
            "font-size": "18px",
            "font-weight": "100",
            "top": "0px"
        })
        $(".spin", this).css({
            "width": "100%"
        })
      });
    }).blur(function() {
      $(".spin").css({
        "width": "0px"
      })
      if ($(this).val() === "") {
        $(this).parent(".input").each(function() {
            $("label", this).css({
              "line-height": "60px",
              "font-size": "24px",
              "font-weight": "300",
              "top": "10px"
            })
        });
  
      }
    });
  
    $(".button").click(function(e) {
      var pX = e.pageX,
        pY = e.pageY,
        oX = parseInt($(this).offset().left),
        oY = parseInt($(this).offset().top);
  
      $(this).append('<span class="click-efect x-' + oX + ' y-' + oY + '" style="margin-left:' + (pX - oX) + 'px;margin-top:' + (pY - oY) + 'px;"></span>')
      $('.x-' + oX + '.y-' + oY + '').animate({
        "width": "500px",
        "height": "500px",
        "top": "-250px",
        "left": "-250px",
  
      }, 600);
      $("button", this).addClass('active');
    })
  
    $(".alt-2").click(function() {
      if (!$(this).hasClass('material-button')) {
        $(".shape").css({
            "width": "100%",
            "height": "100%",
            "transform": "rotate(0deg)"
        })
  
        setTimeout(function() {
            $(".overbox").css({
              "overflow": "initial"
            })
        }, 600)
  
        $(this).animate({
            "width": "140px",
            "height": "140px"
        }, 500, function() {
            $(".box").removeClass("back");
  
            $(this).removeClass('active')
        });
  
        $(".overbox .title").fadeOut(300);
        $(".overbox .input").fadeOut(300);
        $(".overbox .button").fadeOut(300);
  
        $(".alt-2").addClass('material-buton');
      }
  
    })
  
    $(".material-button").click(function() {
  
      if ($(this).hasClass('material-button')) {
        setTimeout(function() {
            $(".overbox").css({
              "overflow": "hidden"
            })
            $(".box").addClass("back");
        }, 200)
        $(this).addClass('active').animate({
            "width": "700px",
            "height": "700px"
        });
  
        setTimeout(function() {
            $(".shape").css({
              "width": "50%",
              "height": "50%",
              "transform": "rotate(45deg)"
            })
  
            $(".overbox .title").fadeIn(300);
            $(".overbox .input").fadeIn(300);
            $(".overbox .button").fadeIn(300);
        }, 700)
  
        $(this).removeClass('material-button');
  
      }
  
      if ($(".alt-2").hasClass('material-buton')) {
        $(".alt-2").removeClass('material-buton');
        $(".alt-2").addClass('material-button');
      }
  
    });

    $('.input input').on('click', function() {
      $(this).css('border', 'none');
    })
  }

  auth = () => {
    const loginRequest = {
        usernameOrEmail: this.state.username,
        password: this.state.password
    };
    login(loginRequest)
    .then(response => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        this.props.history.push("/app/dashboard");
        window.location.replace("/app/dashboard");
    }).catch(error => {
        
    });
  }

  register = () => {
    const signupRequest = {
      name: this.state.name,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    };
    signup(signupRequest)
    .then(response => {
      localStorage.setItem(ACCESS_TOKEN, response.accessToken);
      this.props.history.push("/app/dashboard");
      window.location.replace("/app/dashboard");
    }).catch(error => {
        
    });
  }

  render() {
    return (
      <div className="App">
        <div className="materialContainer">
          <div className="box">

            <div className="title">LOGIN</div>

            <div className="input">
                <label htmlFor="name">Username</label>
                <input type="text" name="username" id="name" value={this.state.username} onChange={this.handleChange('username')} />
                <span className="spin"></span>
            </div>

            <div className="input">
                <label htmlFor="pass">Password</label>
                <input type="password" name="password" id="pass" value={this.state.password} onChange={this.handleChange('password')} />
                <span className="spin"></span>
            </div>

            <div className="button login">
                <button onClick={this.auth}><span>GO</span> <FontAwesomeIcon icon="check" /></button>
            </div>

          </div>

          <div className="overbox">
          
            <div className="material-button alt-2"><span className="shape"></span></div>

            <div className="title">REGISTER</div>

            <div className="input">
                <label htmlFor="regusername">Username</label>
                <input type="text" name="username" id="regusername" value={this.state.username} onChange={this.handleChange('username')}/>
                <span className="spin"></span>
            </div>

            <div className="input">
                <label htmlFor="regname">Name</label>
                <input type="text" name="name" id="regname" value={this.state.name} onChange={this.handleChange('name')}/>
                <span className="spin"></span>
            </div>

            <div className="input">
                <label htmlFor="regpass">Password</label>
                <input type="password" name="password" id="regpass" value={this.state.password} onChange={this.handleChange('password')}/>
                <span className="spin"></span>
            </div>

            <div className="input">
                <label htmlFor="regemail">E-mail</label>
                <input type="email" name="email" id="regemail" value={this.state.email} onChange={this.handleChange('email')}/>
                <span className="spin"></span>
            </div>

            <div className="button">
                <button onClick={this.register} type="submit"><span>NEXT</span></button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Login;
