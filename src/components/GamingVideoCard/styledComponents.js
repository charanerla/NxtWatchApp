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
  width: 200px;
  height: 250px;
  margin-bottom: 8px;
  margin-right: 8px;
  border-radius: 6px;
`
export const DescriptionContainer = styled(CardContainer)`
  padding: 0px 8px 8px 0px;
  flex-direction: column;
  margin-bottom: 0px;
`
export const Paragraph = styled.p`
  color: ${props => props.color};
  font-size: ${props => props.fontSize};
  font-weight: 400;
  margin: 0px;
  width: ${props => props.width};
  margin-bottom: 10px;
`
