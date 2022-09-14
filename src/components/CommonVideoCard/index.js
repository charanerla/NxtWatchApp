import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import {BsDot} from 'react-icons/bs'
import ThemeContext from '../../context/ThemeContext'

import {
  CardContainer,
  ThumbnailImage,
  DescriptionContainer,
  Paragraph,
  ViewsPostedAtContainer,
} from './styledComponents'

const CommonVideoCard = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const {videoDetails} = props
      const {
        id,
        title,
        thumbnailUrl,
        channelName,
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
        <Link to={`/videos/${id}`} style={{textDecoration: 'none'}}>
          <CardContainer style={{marginBottom: '40px'}}>
            <ThumbnailImage src={thumbnailUrl} alt="video thumbnail" />

            <DescriptionContainer>
              <Paragraph
                fontSize="14px"
                color={isDarkTheme ? '#ffffff' : '#0f0f0f'}
              >
                {title}
              </Paragraph>
              <Paragraph fontSize="12px" color="#475569">
                {channelName}
              </Paragraph>
              <ViewsPostedAtContainer>
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
          </CardContainer>
        </Link>
      )
    }}
  </ThemeContext.Consumer>
)

export default CommonVideoCard
