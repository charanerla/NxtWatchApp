import ThemeContext from '../../context/ThemeContext'
import Sidebar from '../Sidebar'
import Header from '../Header'
import {
  MainContainer,
  SubContainer,
  SidebarContainer,
  DynamicContainer,
  Image,
  Paragraph,
  NotFoundPageContainer,
  Heading,
} from './styledComponents'

const NotFound = () => {
  const renderNotFoundPage = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        return (
          <MainContainer>
            <Header />
            <SubContainer>
              <SidebarContainer>
                <Sidebar />
              </SidebarContainer>
              <DynamicContainer bgColor={isDarkTheme ? '#181818' : '#f9f9f9'}>
                <NotFoundPageContainer>
                  <Image
                    src={
                      isDarkTheme
                        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
                    }
                    width="350px"
                    alt="not found"
                  />
                  <Heading
                    fontSize="20px"
                    color={isDarkTheme ? '#ffffff' : '#101010'}
                  >
                    Page Not Found
                  </Heading>
                  <Paragraph fontSize="16px" color="#475569">
                    We are sorry, the page you requested could not be found.
                  </Paragraph>
                </NotFoundPageContainer>
              </DynamicContainer>
            </SubContainer>
          </MainContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  return renderNotFoundPage()
}

export default NotFound
