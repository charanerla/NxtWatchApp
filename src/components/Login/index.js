import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

class Login extends Component {
  state = {
    userName: '',
    password: '',
    isPasswordShown: false,
    isErrorMsgShown: false,
    errorMessage: '',
  }

  onSubmitSuccess = () => {
    const {history} = this.props
    history.replace('/')
    // console.log('login successful')
  }

  submitTheForm = async event => {
    event.preventDefault()
    const {userName, password} = this.state
    const userDetails = {username: userName, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(response)
    // console.log(data)
    if (response.ok) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      this.onSubmitSuccess()
    } else {
      this.setState({isErrorMsgShown: true, errorMessage: data.error_msg})
    }
  }

  updateUsername = event => {
    this.setState({userName: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  updatePasswordVisibility = () => {
    this.setState(prevState => ({isPasswordShown: !prevState.isPasswordShown}))
  }

  renderingTheLoginPage = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const {
          userName,
          password,
          isPasswordShown,
          isErrorMsgShown,
          errorMessage,
        } = this.state
        const loginContainerStyles = isDarkTheme
          ? 'login-container dark-login'
          : 'login-container light-login'
        const formContainerStyles = isDarkTheme
          ? 'form-container dark-form'
          : 'form-container light-form'
        const labelStyles = isDarkTheme
          ? 'login-labels dark-label'
          : 'login-labels light-label'
        const textInputStyles = isDarkTheme
          ? 'inputs-fields dark-inputs'
          : 'inputs-fields light-inputs'
        const checkboxLabelStyles = isDarkTheme
          ? 'checkbox-label dark-label'
          : 'checkbox-label light-label'

        return (
          <div className={loginContainerStyles}>
            <div className={formContainerStyles}>
              <form className="login-form" onSubmit={this.submitTheForm}>
                <img
                  src={
                    isDarkTheme
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  }
                  alt="website logo"
                  className="app-logo"
                />
                <label htmlFor="userName" className={labelStyles}>
                  USERNAME
                </label>
                <input
                  type="text"
                  id="userName"
                  className={textInputStyles}
                  placeholder="Username"
                  value={userName}
                  onChange={this.updateUsername}
                  required
                />
                <label htmlFor="password" className={labelStyles}>
                  PASSWORD
                </label>
                <input
                  type={isPasswordShown ? 'text' : 'password'}
                  id="password"
                  className={textInputStyles}
                  placeholder="Password"
                  value={password}
                  onChange={this.updatePassword}
                  required
                />
                <div className="checkbox-label-container">
                  <input
                    type="checkbox"
                    id="checkbox"
                    onChange={this.updatePasswordVisibility}
                  />
                  <label htmlFor="checkbox" className={checkboxLabelStyles}>
                    Show Password
                  </label>
                </div>
                <button
                  type="submit"
                  className="login-button"
                  style={{color: '#ffffff'}}
                >
                  Login
                </button>
                {isErrorMsgShown && (
                  <p className="error-msg">{`*${errorMessage}`}</p>
                )}
              </form>
            </div>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return this.renderingTheLoginPage()
  }
}

export default Login
