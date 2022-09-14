import {Component} from 'react'
import Cookies from 'js-cookie'
import {IoMdClose} from 'react-icons/io'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import ThemeContext from '../../context/ThemeContext'
import Sidebar from '../Sidebar'
import Header from '../Header'
import HomeVideoCard from '../HomeVideoCard'

import {
  MainContainer,
  SubContainer,
  SidebarContainer,
  DynamicContainer,
  BannerContainer,
  StandardContainer,
  Image,
  Paragraph,
  Button,
  SearchContainer,
  SearchInput,
  SearchButton,
  LoaderContainer,
  VideosUl,
  NoSearchVideoContainer,
  FailureView,
  Heading,
} from './styledComponents'

const apiStatusContext = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    isBannerShown: true,
    search: '',
    apiStatus: apiStatusContext.initial,
    dataList: [],
  }

  componentDidMount() {
    this.fetchingTheDataFromServer()
  }

  renderingBanner = () => (
    <BannerContainer data-testid="banner">
      <StandardContainer width="35%">
        <Image
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          width="120px"
          alt="nxt watch logo"
        />
        <Paragraph>Buy Nxt Watch Premium prepaid plans with UPI</Paragraph>
        <Button border="2px solid #000000" type="button">
          GET IT NOW
        </Button>
      </StandardContainer>
      <Button
        type="button"
        border="none"
        alignSelf="flex-start"
        data-testid="close"
        onClick={() => {
          this.setState({isBannerShown: false})
        }}
      >
        <IoMdClose />
      </Button>
    </BannerContainer>
  )

  onChangeSearchInput = e => {
    this.setState({search: e.target.value})
  }

  searchResults = () => {
    this.fetchingTheDataFromServer()
  }

  fetchingTheDataFromServer = async () => {
    const {search} = this.state
    this.setState({apiStatus: apiStatusContext.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${search}`
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
        dataList: updatedDataList,
        apiStatus: apiStatusContext.success,
      })
    } else {
      this.setState({apiStatus: apiStatusContext.failure})
    }
  }

  renderingSearchContainer = isDarkTheme => (
    <SearchContainer>
      <SearchInput
        type="search"
        // eslint-disable-next-line react/destructuring-assignment
        value={this.state.search}
        onChange={this.onChangeSearchInput}
        placeholder="search"
        style={{
          backgroundColor: isDarkTheme ? '#000000' : '#ffffff',
          color: isDarkTheme ? '#ffffff' : '#000000',
        }}
      />
      <SearchButton
        type="button"
        data-testid="searchButton"
        onClick={this.searchResults}
        style={{
          color: isDarkTheme ? '#ffffff' : '#000000',
          backgroundColor: isDarkTheme ? '#313131' : 'transparent',
        }}
      >
        <BsSearch data-testid="searchButton" />
      </SearchButton>
    </SearchContainer>
  )

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

  renderHomeVideosList = () => {
    const {dataList} = this.state

    return (
      <VideosUl>
        {dataList.map(eachData => (
          <HomeVideoCard videoDetails={eachData} key={eachData.id} />
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
      <Heading
        fontSize="20px"
        color={isDarkTheme ? '#ffffff' : '#0f0f0f'}
        style={{margin: '7px'}}
      >
        No Search results found
      </Heading>
      <Paragraph
        fontSize="16px"
        color={isDarkTheme ? '#ffffff' : '#0f0f0f'}
        style={{margin: '4px'}}
      >
        Try different key words or remove search filter
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
      return this.renderHomeVideosList()
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

  renderHomePage = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const {isBannerShown} = this.state
        return (
          <MainContainer
            bgColor={isDarkTheme ? '#181818' : '#f9f9f9'}
            data-testid="home"
          >
            <Header />
            <SubContainer>
              <SidebarContainer>
                <Sidebar activeTab="Home" />
              </SidebarContainer>
              <DynamicContainer bgColor={isDarkTheme ? '#181818' : '#f9f9f9'}>
                {isBannerShown && this.renderingBanner()}
                {this.renderingSearchContainer(isDarkTheme)}
                {this.renderFinalResult(isDarkTheme)}
              </DynamicContainer>
            </SubContainer>
          </MainContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  render() {
    return this.renderHomePage()
  }
}

export default Home
