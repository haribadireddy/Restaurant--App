import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginPage extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg, showSubmitError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to='/' />
    }
    return (
      <div className='login-container'>
        <div className='box-container'>
          <h1 className='login-heading'>UNI Resto Cafe</h1>
          <form className='form-container' onSubmit={this.onSubmitForm}>
            <label className='label' htmlFor="username">USERNAME</label>
            <input
              className='input'
              placeholder='USERNAME'
              id="username"
              type='text'
              onChange={this.onChangeUsername}
            />
            <label className='label' htmlFor="password">PASSWORD</label>
            <input
              className='input'
              placeholder='PASSWORD'
              type='password'
              id="password"
              onChange={this.onChangePassword}
            />

            <button className='login-button' type='submit'>
              Login
            </button>
            {showSubmitError && <p className='error-msg'>{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
