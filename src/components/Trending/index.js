import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {HiFire} from 'react-icons/hi'
import CommonVideoCard from '../CommonVideoCard'
import ThemeContext from '../../context/ThemeContext'
import Sidebar from '../Sidebar'
import Header from '../Header'

import {
  MainContainer,
  SubContainer,
  SidebarContainer,
  DynamicContainer,
  RowContainer,
  Heading,
  LoaderContainer,
  VideosUl,
  Paragraph,
  Image,
  FailureView,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {apiStatus: apiStatusConstants.initial, trendingVideosList: []}

  componentDidMount() {
    this.fetchDataFromServer()
  }

  fetchDataFromServer = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/trending`
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
        publishedAt: video.published_at,
        channelName: video.channel.name,
        profileImageUrl: video.channel.profile_image_url,
      }))
      //   console.log(updatedDataList)
      this.setState({
        trendingVideosList: updatedDataList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
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

  renderTrendingVideosList = () => {
    const {trendingVideosList} = this.state

    return (
      <VideosUl>
        {trendingVideosList.map(eachData => (
          <CommonVideoCard videoDetails={eachData} key={eachData.id} />
        ))}
      </VideosUl>
    )
  }

  renderResults = () => this.renderTrendingVideosList()

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
        onClick={this.fetchDataFromServer}
      >
        Retry
      </button>
    </FailureView>
  )

  renderFinalResult = isDarkTheme => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderResults()
      case apiStatusConstants.inProgress:
        return this.renderLoader(isDarkTheme)
      case apiStatusConstants.failure:
        return this.renderFailureView(isDarkTheme)
      default:
        return null
    }
  }

  renderPageInfo = isDarkTheme => (
    <RowContainer bgColor={isDarkTheme ? '#222222' : null}>
      <HiFire
        size="40px"
        color="#ff0000"
        style={{margin: '8px 12px 8px 20px'}}
      />
      <Heading fontSize="35px" color={isDarkTheme ? '#ffffff' : '#000000'}>
        Trending
      </Heading>
    </RowContainer>
  )

  renderTrendingPage = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        return (
          <MainContainer
            bgColor={isDarkTheme ? '#0f0f0f' : '#f9f9f9'}
            data-testid="trending"
          >
            <Header />
            <SubContainer>
              <SidebarContainer>
                <Sidebar activeTab="Trending" />
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
    return this.renderTrendingPage()
  }
}

export default Trending
