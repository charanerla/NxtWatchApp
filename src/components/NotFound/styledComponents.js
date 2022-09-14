import styled from 'styled-components'

export const NotFoundPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`
export const MainContainer = styled.div`
  min-height: 100vh;
`
export const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
`
export const SidebarContainer = styled.div`
  width: 20%;
`
export const DynamicContainer = styled.div`
  width: 80%;
  height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${props => props.bgColor};
`
export const Image = styled.img`
  width: ${props => props.width};
`
export const Paragraph = styled.p`
  font-size: ${props => props.fontSize};
  color: ${props => props.color};
  font-weight: 400;
`
export const Heading = styled.h1`
  font-size: ${props => props.fontSize};
  font-weight: bold;
  color: ${props => props.color};
`
