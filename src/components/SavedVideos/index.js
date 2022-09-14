import {MdPlaylistAdd} from 'react-icons/md'
import ThemeContext from '../../context/ThemeContext'
import CommonVideoCard from '../CommonVideoCard'
import Sidebar from '../Sidebar'
import Header from '../Header'

import {
  MainContainer,
  SubContainer,
  SidebarContainer,
  DynamicContainer,
  RowContainer,
  Heading,
  VideosUl,
  NoSavedVideosContainer,
  Paragraph,
  Image,
} from './styledComponents'

const SavedVideos = () => {
  const renderPageInfo = isDarkTheme => (
    <RowContainer bgColor={isDarkTheme ? '#222222' : null}>
      <MdPlaylistAdd
        size="40px"
        color="#ff0000"
        style={{margin: '8px 12px 8px 20px'}}
      />
      <Heading fontSize="35px" color={isDarkTheme ? '#ffffff' : '#000000'}>
        Saved Videos
      </Heading>
    </RowContainer>
  )

  const renderSavedVideos = savedVideosList => (
    <VideosUl>
      {savedVideosList.map(eachVideo => (
        <CommonVideoCard videoDetails={eachVideo} key={eachVideo.id} />
      ))}
    </VideosUl>
  )

  const renderNoSavedVideosPage = isDarkTheme => (
    <NoSavedVideosContainer>
      <Image
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
        width="300px"
      />
      <Heading
        style={{margin: '20px'}}
        fontSize="17px"
        color={isDarkTheme ? '#ffffff' : '#010101'}
      >
        No saved videos found
      </Heading>
      <Paragraph fontSize="14px" color="#475569">
        You can save your videos while watching them
      </Paragraph>
    </NoSavedVideosContainer>
  )

  const renderSavedVideosPage = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme, savedVideosList} = value

        return (
          <MainContainer
            bgColor={isDarkTheme ? '#0f0f0f' : '#f9f9f9'}
            data-testid="savedVideos"
          >
            <Header />
            <SubContainer>
              <SidebarContainer>
                <Sidebar activeTab="Saved videos" />
              </SidebarContainer>
              <DynamicContainer bgColor={isDarkTheme ? '#181818' : '#f9f9f9'}>
                {renderPageInfo(isDarkTheme)}
                {savedVideosList.length !== 0
                  ? renderSavedVideos(savedVideosList)
                  : renderNoSavedVideosPage(isDarkTheme)}
              </DynamicContainer>
            </SubContainer>
          </MainContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  return renderSavedVideosPage()
}

export default SavedVideos
