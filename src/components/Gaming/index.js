import {Component} from 'react'
import {SiYoutubegaming} from 'react-icons/si'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ThemeContext from '../../context/ThemeContext'
import Sidebar from '../Sidebar'
import Header from '../Header'
import GamingVideoCard from '../GamingVideoCard'

import {
  MainContainer,
  SubContainer,
  SidebarContainer,
  DynamicContainer,
  RowContainer,
  Heading,
  LoaderContainer,
  VideosUl,
  NoSearchVideoContainer,
  Image,
  Paragraph,
  FailureView,
} from './styledComponents'

const apiStatusContext = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {apiStatus: apiStatusContext.initial, dataList: []}

  componentDidMount() {
    this.fetchingTheDataFromServer()
  }

  fetchingTheDataFromServer = async () => {
    this.setState({apiStatus: apiStatusContext.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/gaming`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const {videos} = data
      //   console.log(videos)
      const updatedDataList = videos.map(video => ({
        id: video.id,
        title: video.title,
        thumbnailUrl: video.thumbnail_url,
        viewCount: video.view_count,
      }))
      //   console.log(updatedDataList)
      this.setState({
        dataList: updatedDataList,
        apiStatus: apiStatusContext.success,
      })
    } else {
      this.setState({apiStatus: apiStatusContext.failure})
    }
  }

  renderLoader = isDarkTheme => (
    <LoaderContainer className="loader-container" data-testid="loader">
      <Loader
        type="ThreeDots"
        color={isDarkTheme ? '#ffffff' : '#000000'}
        height="50"
        width="50"
      />
    </LoaderContainer>
  )

  renderGamingVideosList = () => {
    const {dataList} = this.state
    return (
      <VideosUl>
        {dataList.map(video => (
          <GamingVideoCard videoDetails={video} key={video.id} />
        ))}
      </VideosUl>
    )
  }

  renderRandomPage = isDarkTheme => (
    <NoSearchVideoContainer>
      <Image
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
        width="325px"
      />
      <Paragraph
        fontSize="20px"
        color={isDarkTheme ? '#ffffff' : '#0f0f0f'}
        style={{fontWeight: 'bold', margin: '7px'}}
      >
        No Search results found
      </Paragraph>
      <Paragraph
        fontSize="16px"
        color={isDarkTheme ? '#ffffff' : '#0f0f0f'}
        style={{margin: '4px'}}
      >
        Try different key words or remove the search filter
      </Paragraph>
      <button
        type="button"
        className="button"
        style={{
          backgroundColor: '#00306e',
          border: 'none',
          outline: 'none',
          padding: '6px 16px 6px 16px',
          color: '#ffffff',
          cursor: 'pointer',
        }}
        onClick={this.fetchingTheDataFromServer}
      >
        Retry
      </button>
    </NoSearchVideoContainer>
  )

  renderResults = isDarkTheme => {
    const {dataList} = this.state
    if (dataList.length !== 0) {
      return this.renderGamingVideosList()
    }
    return this.renderRandomPage(isDarkTheme)
  }

  renderFailureView = isDarkTheme => (
    <FailureView>
      <Image
        src={
          isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        }
        alt="failure view"
        width="300px"
      />
      <Heading
        fontSize="25px"
        color={isDarkTheme ? '#ffffff' : '#0f0f0f'}
        style={{margin: '7px'}}
      >
        Oops! Something Went Wrong
      </Heading>
      <Paragraph
        fontSize="16px"
        color={isDarkTheme ? '#ffffff' : '#0f0f0f'}
        style={{margin: '4px'}}
      >
        We are having some trouble
      </Paragraph>
      <Paragraph
        fontSize="16px"
        color={isDarkTheme ? '#ffffff' : '#0f0f0f'}
        style={{margin: '4px'}}
      >
        Please try again.
      </Paragraph>
      <button
        type="button"
        className="button"
        style={{
          backgroundColor: '#00306e',
          border: 'none',
          outline: 'none',
          padding: '6px 16px 6px 16px',
          color: '#ffffff',
          cursor: 'pointer',
        }}
        onClick={this.fetchingTheDataFromServer}
      >
        Retry
      </button>
    </FailureView>
  )

  renderFinalResult = isDarkTheme => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContext.success:
        return this.renderResults(isDarkTheme)
      case apiStatusContext.inProgress:
        return this.renderLoader(isDarkTheme)
      case apiStatusContext.failure:
        return this.renderFailureView(isDarkTheme)
      default:
        return null
    }
  }

  renderPageInfo = isDarkTheme => (
    <RowContainer bgColor={isDarkTheme ? '#222222' : null}>
      <SiYoutubegaming
        size="40px"
        color="#ff0000"
        style={{margin: '8px 12px 8px 20px'}}
      />
      <Heading fontSize="35px" color={isDarkTheme ? '#ffffff' : '#000000'}>
        Gaming
      </Heading>
    </RowContainer>
  )

  renderGamingPage = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <MainContainer
            bgColor={isDarkTheme ? '#0f0f0f' : '#f9f9f9'}
            data-testid="gaming"
          >
            <Header />
            <SubContainer>
              <SidebarContainer>
                <Sidebar activeTab="Gaming" />
              </SidebarContainer>
              <DynamicContainer bgColor={isDarkTheme ? '#181818' : '#f9f9f9'}>
                {this.renderPageInfo(isDarkTheme)}
                {this.renderFinalResult(isDarkTheme)}
              </DynamicContainer>
            </SubContainer>
          </MainContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  render() {
    return this.renderGamingPage()
  }
}

export default Gaming
