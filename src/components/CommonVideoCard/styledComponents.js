import styled from 'styled-components'

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: transparent;
  font-family: 'Roboto';
  cursor: pointer;
`
export const ThumbnailImage = styled.img`
  width: 350px;
  height: 200px;
  margin-bottom: 8px;
  margin-right: 8px;
`
export const DescriptionContainer = styled(CardContainer)`
  padding: 0px 8px 8px 14px;
  flex-direction: column;
`
export const Paragraph = styled.p`
  color: ${props => props.color};
  font-size: ${props => props.fontSize};
  font-weight: 400;
  margin: 0px;
  width: ${props => props.width};
  margin-bottom: 10px;
`
export const CardSubContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  font-family: 'Roboto';
`
export const ViewsPostedAtContainer = styled(CardSubContainer)`
  align-items: center;
`
