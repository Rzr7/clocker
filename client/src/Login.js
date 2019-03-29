import React, { Component } from 'react';
import './App.css';
import $ from "jquery";
import axios from "axios";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import checkAuth from './Functions'

library.add(faCheck)

class Login extends Component {
  state = {};

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
    axios.post('/users/auth', {
      username: $('#name').val(),
      password: $('#pass').val()
    })
    .then(function (response) {
        if (response.data[0].status === "success") {
            localStorage.setItem('session', response.data[0].token);
            window.location.replace("/app");
        }
    })
    .catch(function (error) {
      $('#name').css('border', '2px solid red');
      $('#pass').css('border', '2px solid red');
    });
  }

  register = () => {
      axios.post('/users/user', {
        username: $('#regname').val(),
        password: $('#regpass').val(),
        email: $('#regemail').val(),
      })
      .then(function (response) {
        if (response.data[0].status === "success") {
            localStorage.setItem('session', response.data[0].token);
            window.location.replace("/app");
        }
      })
      .catch(function (error) {
        if (error.response.data[0].status === "error") {
          if (error.response.data[1].username) {
            $('#regname').css('border', '2px solid #ffeb00');
          }
          if (error.response.data[1].password) {
            $('#regpass').css('border', '2px solid #ffeb00');
          }
          if (error.response.data[1].email) {
            $('#regemail').css('border', '2px solid #ffeb00');
          }
        }
      });
  }
  render() {
    return (
      <div className="App">
        <div className="materialContainer">
          <div className="box">

            <div className="title">LOGIN</div>

            <div className="input">
                <label for="name">Username</label>
                <input type="text" name="name" id="name" />
                <span className="spin"></span>
            </div>

            <div className="input">
                <label for="pass">Password</label>
                <input type="password" name="pass" id="pass" />
                <span className="spin"></span>
            </div>

            <div className="button login">
                <button onClick={this.auth}><span>GO</span> <FontAwesomeIcon icon="check" /></button>
            </div>

            {/*<a href="" className="pass-forgot">Forgot your password?</a>*/}

          </div>

          <div className="overbox">
            <div className="material-button alt-2"><span className="shape"></span></div>

            <div className="title">REGISTER</div>

            <div className="input">
                <label for="regname">Username</label>
                <input type="text" name="regname" id="regname" />
                <span className="spin"></span>
            </div>

            <div className="input">
                <label for="regpass">Password</label>
                <input type="password" name="regpass" id="regpass" />
                <span className="spin"></span>
            </div>

            <div className="input">
                <label for="regemail">E-mail</label>
                <input type="email" name="regemail" id="regemail" />
                <span className="spin"></span>
            </div>

            <div className="button">
                <button onClick={this.register}><span>NEXT</span></button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
