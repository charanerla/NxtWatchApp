import styled from 'styled-components'

export const MainContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.bgColor};
`
export const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
`
export const SidebarContainer = styled.div`
  width: 20%;
`
export const DynamicContainer = styled.div`
  display: flex;
  width: 80%;
  height: 90vh;
  overflow-y: auto;
  background-color: ${props => props.bgColor};
`
export const BannerContainer = styled.div`
  width: 100%;
  height: 26vh;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-family: 'Roboto';
`
export const StandardContainer = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
`
export const Image = styled.img`
  width: ${props => props.width};
`

export const Button = styled.button`
  border: ${props => props.border};
  background-color: transparent;
  outline: none;
  color: #000000;
  font-weight: 400;
  padding: 6px 16px 6px 16px;
  align-self: ${props => props.alignSelf};
  cursor: pointer;
`
export const SearchContainer = styled.div`
  height: 35px;
  width: 30%;
  border: 1px solid #616e7c;
  background-color: transparent;
  align-items: center;
  margin: 10px 0px 10px 20px;
`

export const SearchInput = styled.input`
  height: 33px;
  width: 80%;
  border: transparent;
  outline: none;
  padding: 5px;
  font-size: 15px;
`

export const SearchButton = styled.button`
  height: 100%;
  width: 20%;
  border: transparent;
  outline: none;
  background: transparent;
  font-weight: 20px;
  align-items: center;
  cursor: pointer;
  outline: none;
`
export const RowContainer = styled(StandardContainer)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: ${props => props.bgColor};
`

export const Heading = styled.h1`
  font-size: ${props => props.fontSize};
  font-weight: bold;
  color: ${props => props.color};
  margin: 0px;
`
export const LoaderContainer = styled.div`
  height: 50%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
export const VideoDetailsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 20px;
`
export const Paragraph = styled.p`
  color: ${props => props.color};
  font-size: ${props => props.fontSize};
  font-weight: 400;
  margin: ${props => props.margin};
  width: ${props => props.width};
`
export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
`
export const DescriptionContainer = styled.div`
  padding: 0px 8px 8px 14px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: transparent;
  font-family: 'Roboto';
  cursor: pointer;
  margin-bottom: 35px;
`
export const ViewsPostedAtContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  font-family: 'Roboto';
`
export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
export const HorizontalLine = styled.hr`
  color: ${props => props.color};
  width: 100%;
  margin-top: 16px;
`
export const CardSubContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  font-family: 'Roboto';
`

export const ReactionButton = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  margin-right: 12px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  color: ${props => props.color};
  font-weight: bold;
  padding: 0px;
`
export const NoSearchVideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto';
  width: 100%;
  flex-grow: 1;
`
export const FailureView = styled(NoSearchVideoContainer)``
