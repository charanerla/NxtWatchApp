import styled from 'styled-components'

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: transparent;
  font-family: 'Roboto';
  cursor: pointer;
`
export const ThumbnailImage = styled.img`
  width: 250px;
  height: 150px;
  margin-bottom: 8px;
`

export const CardSubContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  font-family: 'Roboto';
`
export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
`
export const DescriptionContainer = styled(CardContainer)`
  padding: 0px 8px 8px 14px;
`

export const Paragraph = styled.p`
  color: ${props => props.color};
  font-size: ${props => props.fontSize};
  font-weight: 400;
  margin: 0px;
  width: ${props => props.width};
  margin-bottom: 10px;
`
export const ViewsPostedAtContainer = styled(CardSubContainer)`
  align-items: center;
`
