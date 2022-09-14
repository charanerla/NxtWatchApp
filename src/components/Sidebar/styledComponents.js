import styled from 'styled-components'

// export const NavLink = styled.Link`
//   text-decoration: none;
// `

export const SidebarContainer = styled.div`
  background-color: ${props => props.bgColor};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  font-family: 'Roboto';
  height: 100%;
`
export const UnorderedList = styled.ul`
  list-style-type: none;
  width: 100%;
  padding: 0px;
`
export const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: ${props => {
    if (props.isActive) {
      if (props.dark) {
        return '#424242'
      }
      return '#cccccc'
    }
    return null
  }};
  color: ${props => (props.dark ? '#ffffff' : '#000000')};
  font-weight: ${props => (props.isActive ? 'bold' : 400)};
`
export const Button = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  display: block;
`

export const ContactUsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  font-family: 'Roboto';
  min-height: 25vh;
  padding: 14px;
`

export const Heading = styled.h1`
  color: ${props => props.color};
  font-size: ${props => props.size};
  font-weight: 500;
  font-family: 'Roboto';
  margin: 0px;
`
export const SocialMediaLogo = styled.img`
  width: 35px;
  margin-left: 6px;
`
export const Paragraph = styled.p`
  color: ${props => props.color};
  font-size: ${props => props.fontSize};
  font-weight: 400;
  font-family: 'Roboto';
  margin: 0px;
`
export const DefaultContainer = styled.div``
