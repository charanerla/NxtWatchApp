import {Link} from 'react-router-dom'
import ThemeContext from '../../context/ThemeContext'

import {
  CardContainer,
  ThumbnailImage,
  DescriptionContainer,
  Paragraph,
} from './styledComponents'

const GamingVideoCard = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const {videoDetails} = props
      const {id, title, thumbnailUrl, viewCount} = videoDetails

      return (
        <Link
          to={`/videos/${id}`}
          style={{textDecoration: 'none', marginBottom: '35px'}}
        >
          <CardContainer>
            <ThumbnailImage src={thumbnailUrl} alt="video thumbnail" />

            <DescriptionContainer>
              <Paragraph
                fontSize="14px"
                color={isDarkTheme ? '#ffffff' : '#0f0f0f'}
                width="195px"
              >
                {title}
              </Paragraph>
              <Paragraph
                fontSize="12px"
                color="#475569"
                style={{marginRight: '16px'}}
              >
                {`${viewCount} Watching Worldwide`}
              </Paragraph>
            </DescriptionContainer>
          </CardContainer>
        </Link>
      )
    }}
  </ThemeContext.Consumer>
)

export default GamingVideoCard
