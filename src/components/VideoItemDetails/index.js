import {Component} from 'react'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'
import {BsDot} from 'react-icons/bs'
import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'
import Cookies from 'js-cookie'
import ThemeContext from '../../context/ThemeContext'
import Sidebar from '../Sidebar'
import Header from '../Header'

import {
  MainContainer,
  SubContainer,
  SidebarContainer,
  DynamicContainer,
  LoaderContainer,
  VideoDetailsContainer,
  Paragraph,
  ViewsPostedAtContainer,
  ButtonsContainer,
  HorizontalLine,
  CardSubContainer,
  ProfileImage,
  DescriptionContainer,
  ReactionButton,
  FailureView,
  Image,
  Heading,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

let likedVideos
let dislikedVideos
let savedVideos
let foo1
let foo2
let foo3

class VideoItemDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, videoDetails: {}}

  componentDidMount = () => {
    this.fetchingVideoDetails()
  }

  fetchingVideoDetails = async () => {
    const {match} = this.props
    const {id} = match.params
    // console.log(id)
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    // console.log(response)
    if (response.ok) {
      const data = await response.json()
      const details = data.video_details
      const updatedVideoDetails = {
        id: details.id,
        title: details.title,
        videoUrl: details.video_url,
        thumbnailUrl: details.thumbnail_url,
        channelName: details.channel.name,
        profileImageUrl: details.channel.profile_image_url,
        channelSubscriberCount: details.channel.subscriber_count,
        viewCount: details.view_count,
        publishedAt: details.published_at,
        description: details.description,
      }
      //   console.log(updatedVideoDetails)
      this.setState({
        videoDetails: updatedVideoDetails,
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

  renderResults = isDarkTheme => {
    const {videoDetails} = this.state

    const {
      id,
      title,
      videoUrl,
      channelName,
      profileImageUrl,
      channelSubscriberCount,
      viewCount,
      publishedAt,
      description,
    } = videoDetails

    const calculatingPublishedDuration = () => {
      const date = new Date(publishedAt)
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()
      return formatDistanceToNow(new Date(year, month, day), {
        addSuffix: true,
      }).replace('over', '')
    }
    return (
      <VideoDetailsContainer>
        <ReactPlayer url={videoUrl} controls width="100%" height="60%" />
        <Paragraph
          color={isDarkTheme ? '#ffffff' : '#010101'}
          fontSize="17px"
          margin="16px 0px 18px 0px"
        >
          {title}
        </Paragraph>
        <SubContainer
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <ViewsPostedAtContainer>
            <Paragraph
              fontSize="16px"
              color="#475569"
              margin="0px 16px 0px 0px"
            >
              {viewCount}
            </Paragraph>
            <BsDot size="16px" color="#475569" style={{marginTop: '2px'}} />
            <Paragraph fontSize="16px" color="#475569" margin="0px">
              {calculatingPublishedDuration()}
            </Paragraph>
          </ViewsPostedAtContainer>
          <ButtonsContainer>
            <ReactionButton
              type="button"
              color={likedVideos.includes(id) ? '#2563eb' : '#64748b'}
              onClick={() => foo1(id)}
            >
              <BiLike size="20px" />
              Like
            </ReactionButton>
            <ReactionButton
              type="button"
              color={dislikedVideos.includes(id) ? '#2563eb' : '#64748b'}
              onClick={() => foo2(id)}
            >
              <BiDislike size="20px" />
              Dislike
            </ReactionButton>
            <ReactionButton
              type="button"
              color={savedVideos.includes(id) ? '#2563eb' : '#64748b'}
              onClick={() => foo3(videoDetails)}
            >
              <MdPlaylistAdd size="20px" />
              Saved
            </ReactionButton>
          </ButtonsContainer>
        </SubContainer>
        <HorizontalLine color={isDarkTheme ? '#ffffff' : '#010101'} />
        <CardSubContainer>
          <ProfileImage src={profileImageUrl} alt="channel logo" />
          <DescriptionContainer>
            <Paragraph
              fontSize="14px"
              color={isDarkTheme ? '#ffffff' : '#010101'}
              margin="0px 0px 8px 0px"
            >
              {channelName}
            </Paragraph>
            <Paragraph
              fontSize="14px"
              color="#475569"
              margin="0px 0px 30px 0px"
            >
              {channelSubscriberCount}
            </Paragraph>
            <Paragraph
              fontSize="16px"
              color={isDarkTheme ? '#ffffff' : '#010101'}
              margin="0px 0px 8px 0px"
            >
              {description}
            </Paragraph>
          </DescriptionContainer>
        </CardSubContainer>
      </VideoDetailsContainer>
    )
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
        We are having some trouble to complete your request. Please try again.
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
        style={{
          backgroundColor: '#00306e',
          border: 'none',
          outline: 'none',
          padding: '6px 16px 6px 16px',
          color: '#ffffff',
          cursor: 'pointer',
        }}
        onClick={this.fetchingVideoDetails}
      >
        Retry
      </button>
    </FailureView>
  )

  renderFinalResult = isDarkTheme => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderResults(isDarkTheme)
      case apiStatusConstants.inProgress:
        return this.renderLoader(isDarkTheme)
      case apiStatusConstants.failure:
        return this.renderFailureView(isDarkTheme)
      default:
        return null
    }
  }

  renderVideoPlayerPage = () => (
    <ThemeContext.Consumer>
      {value => {
        const {
          isDarkTheme,
          likedVideosList,
          dislikedVideosList,
          updateLikedVideosList,
          updateDislikedVideosList,
          savedVideosList,
          updateSavedVideosList,
        } = value
        likedVideos = likedVideosList
        dislikedVideos = dislikedVideosList
        savedVideos = savedVideosList.map(video => video.id)
        foo1 = updateLikedVideosList
        foo2 = updateDislikedVideosList
        foo3 = updateSavedVideosList
        return (
          <MainContainer
            bgColor={isDarkTheme ? '#0f0f0f' : '#f9f9f9'}
            data-testid="videoItemDetails"
          >
            <Header />
            <SubContainer>
              <SidebarContainer>
                <Sidebar />
              </SidebarContainer>
              <DynamicContainer bgColor={isDarkTheme ? '#0f0f0f' : '#f9f9f9'}>
                {this.renderFinalResult(isDarkTheme)}
              </DynamicContainer>
            </SubContainer>
          </MainContainer>
        )
      }}
    </ThemeContext.Consumer>
  )

  render() {
    return this.renderVideoPlayerPage()
  }
}

export default VideoItemDetails
