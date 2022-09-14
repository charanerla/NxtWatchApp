import React from 'react'

const ThemeContext = React.createContext({
  isDarkTheme: '',
  changeTheme: () => {},
  likedVideosList: [],
  dislikedVideosList: [],
  updateLikedVideosList: () => {},
  updateDislikedVideosList: () => {},
  savedVideosList: [],
  updateSavedVideosList: () => {},
})

export default ThemeContext
