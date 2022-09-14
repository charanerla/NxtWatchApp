import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'

import ThemeContext from '../../context/ThemeContext'
import {
  SidebarContainer,
  UnorderedList,
  ListItem,
  ContactUsContainer,
  SocialMediaLogo,
  Paragraph,
  DefaultContainer,
} from './styledComponents'

// const navItems = [
//   {
//     id: 'Home',
//     value: 'Home',
//     image: <AiFillHome color="red" size="20px" />,
//   },
//   {id: 'Trending', value: 'Trending'},
//   {id: 'Gaming', value: 'Gaming'},
//   {id: 'Saved videos', value: 'Saved videos'},
// ]

const Sidebar = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const {activeTab} = props

      return (
        <SidebarContainer bgColor={isDarkTheme ? '#313131' : '#ffffff'}>
          <UnorderedList>
            <Link to="/" key="Home" style={{textDecoration: 'none'}}>
              <ListItem
                // onClick={() => changeActiveNavLinkId('Home')}
                isActive={activeTab === 'Home'}
                dark={isDarkTheme}
              >
                <AiFillHome
                  color={activeTab === 'Home' ? '#ff0000' : '#606060'}
                  size="20px"
                  style={{margin: '14px'}}
                />
                Home
              </ListItem>
            </Link>
            <Link
              to="/trending"
              key="Trending"
              style={{textDecoration: 'none'}}
            >
              <ListItem
                // onClick={() => changeActiveNavLinkId('Trending')}
                isActive={activeTab === 'Trending'}
                dark={isDarkTheme}
              >
                <HiFire
                  color={activeTab === 'Trending' ? '#ff0000' : '#606060'}
                  size="20px"
                  style={{margin: '14px'}}
                />
                Trending
              </ListItem>
            </Link>
            <Link to="/gaming" key="Gaming" style={{textDecoration: 'none'}}>
              <ListItem
                // onClick={() => changeActiveNavLinkId('Gaming')}
                isActive={activeTab === 'Gaming'}
                dark={isDarkTheme}
              >
                <SiYoutubegaming
                  color={activeTab === 'Gaming' ? '#ff0000' : '#606060'}
                  size="20px"
                  style={{margin: '14px'}}
                />
                Gaming
              </ListItem>
            </Link>
            <Link
              to="/saved-videos"
              key="Saved videos"
              style={{textDecoration: 'none'}}
            >
              <ListItem
                // onClick={() => changeActiveNavLinkId('Saved videos')}
                isActive={activeTab === 'Saved videos'}
                dark={isDarkTheme}
              >
                <MdPlaylistAdd
                  style={{margin: '14px'}}
                  color={activeTab === 'Saved videos' ? '#ff0000' : '#606060'}
                  size="20px"
                />
                Saved videos
              </ListItem>
            </Link>
          </UnorderedList>
          <ContactUsContainer>
            <Paragraph
              color={isDarkTheme ? '#ffffff' : '#000000'}
              fontSize="26px"
            >
              CONTACT US
            </Paragraph>
            <DefaultContainer>
              <SocialMediaLogo
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
              />
              <SocialMediaLogo
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
              />
              <SocialMediaLogo
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
              />
            </DefaultContainer>
            <Paragraph
              color={isDarkTheme ? '#ffffff' : '#000000'}
              fontSize="16pz"
            >
              Enjoy! Now to see your channels and recommendations!
            </Paragraph>
          </ContactUsContainer>
        </SidebarContainer>
      )
    }}
  </ThemeContext.Consumer>
)

export default Sidebar
