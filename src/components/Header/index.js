import {withRouter, Link} from 'react-router-dom'
import {HiMoon} from 'react-icons/hi'
import {BiSun} from 'react-icons/bi'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const Header = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme, changeTheme} = value
      const headerStyles = isDarkTheme
        ? 'header-container dark-header'
        : 'header-container light-header'

      const logout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      return (
        <div className={headerStyles}>
          <div className="header-items-container">
            <Link to="/" style={{textDecoration: 'none'}}>
              <img
                src={
                  isDarkTheme
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                }
                alt="website logo"
                className="header-app-logo"
                style={{cursor: 'pointer'}}
              />
            </Link>
            <div className="header-buttons-container">
              <button
                type="button"
                className="theme-button"
                data-testid="theme"
                onClick={() => {
                  changeTheme()
                }}
              >
                {isDarkTheme ? (
                  <BiSun size="25px" color="#ffffff" />
                ) : (
                  <HiMoon size="25px" />
                )}
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
                className="profile-img"
              />
              <div className="popup-container">
                <Popup
                  modal
                  trigger={
                    <button
                      type="button"
                      className={
                        isDarkTheme
                          ? 'dark-logout-button'
                          : 'light-logout-button'
                      }
                    >
                      Logout
                    </button>
                  }
                >
                  {close => (
                    <div
                      className={
                        isDarkTheme
                          ? 'popup-box dark-popup'
                          : 'popup-box light-popup'
                      }
                    >
                      <div>
                        <p>Are you sure, you want to logout</p>
                      </div>
                      <div className="popup-buttons-container">
                        <button
                          type="button"
                          className="cancel-button"
                          onClick={() => close()}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="confirm-button"
                          onClick={logout}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </div>
            </div>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default withRouter(Header)
