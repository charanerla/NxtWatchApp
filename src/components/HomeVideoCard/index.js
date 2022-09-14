import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import {BsDot} from 'react-icons/bs'
import ThemeContext from '../../context/ThemeContext'

import {
  CardContainer,
  ThumbnailImage,
  CardSubContainer,
  ProfileImage,
  DescriptionContainer,
  Paragraph,
  ViewsPostedAtContainer,
} from './styledComponents'

const HomeVideoCard = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const {videoDetails} = props
      const {
        id,
        title,
        thumbnailUrl,
        channelName,
        profileImageUrl,
        viewCount,
        publishedAt,
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
        <Link
          to={`/videos/${id}`}
          style={{textDecoration: 'none', marginBottom: '45px'}}
        >
          <CardContainer>
            <ThumbnailImage src={thumbnailUrl} alt="video thumbnail" />
            <CardSubContainer>
              <ProfileImage src={profileImageUrl} alt="channel logo" />
              <DescriptionContainer>
                <Paragraph
                  fontSize="14px"
                  color={isDarkTheme ? '#ffffff' : '#0f0f0f'}
                  width="195px"
                >
                  {title}
                </Paragraph>
                <Paragraph fontSize="12px" color="#475569">
                  {channelName}
                </Paragraph>
                <ViewsPostedAtContainer style={{width: '150px'}}>
                  <Paragraph
                    fontSize="12px"
                    color="#475569"
                    style={{marginRight: '16px'}}
                  >
                    {viewCount}
                  </Paragraph>
                  <BsDot
                    size="16px"
                    color="#475569"
                    style={{marginTop: '-10px'}}
                  />
                  <Paragraph fontSize="12px" color="#475569">
                    {calculatingPublishedDuration()}
                  </Paragraph>
                </ViewsPostedAtContainer>
              </DescriptionContainer>
            </CardSubContainer>
          </CardContainer>
        </Link>
      )
    }}
  </ThemeContext.Consumer>
)

export default HomeVideoCard
