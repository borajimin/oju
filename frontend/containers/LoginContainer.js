import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { login, logout } from 'redux-implicit-oauth2'

const url = "http://localhost:3000";

const config = {
  url: url + "/oauth/kakao",
  accessTokenKey: "code",
  parseQuery: true
}

const LoginContainer = ({ isLoggedIn, login, logout }) => {
  console.log(isLoggedIn);
  return isLoggedIn ? <div><button type='button' onClick={logout}>Logout</button></div>
  : <div><button type='button' onClick={login}>Login</button></div>
}

LoginContainer.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = ({ auth }) => ({
  isLoggedIn: auth.isLoggedIn
})

const mapDispatchToProps = {
  login: () => login(config),
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
