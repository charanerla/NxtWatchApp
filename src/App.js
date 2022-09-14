import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import ThemeContext from './context/ThemeContext'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'

import './App.css'

// Replace your code here
class App extends Component {
  state = {
    isDarkTheme: false,
    likedVideosList: [],
    dislikedVideosList: [],
    savedVideosList: [],
  }

  changeTheme = () => {
    this.setState(prevSt => ({isDarkTheme: !prevSt.isDarkTheme}))
  }

  updateLikedVideosList = id => {
    const {likedVideosList, dislikedVideosList} = this.state
    if (likedVideosList.includes(id)) {
      const updatedList = likedVideosList.filter(eachId => eachId !== id)
      this.setState({likedVideosList: updatedList})
    } else {
      const updatedDislikeList = dislikedVideosList.filter(
        eachId => eachId !== id,
      )
      this.setState({
        likedVideosList: [...likedVideosList, id],
        dislikedVideosList: updatedDislikeList,
      })
    }
  }

  updateDislikedVideosList = id => {
    const {likedVideosList, dislikedVideosList} = this.state
    if (dislikedVideosList.includes(id)) {
      const updatedList = dislikedVideosList.filter(eachId => eachId !== id)
      this.setState({dislikedVideosList: updatedList})
    } else {
      const updatedLikedList = likedVideosList.filter(eachId => eachId !== id)
      this.setState({
        likedVideosList: updatedLikedList,
        dislikedVideosList: [...dislikedVideosList, id],
      })
    }
  }

  updateSavedVideosList = obb => {
    const {savedVideosList} = this.state
    const savedVideosIdsList = savedVideosList.map(eachVideo => eachVideo.id)
    if (savedVideosIdsList.includes(obb.id)) {
      const updatedList = savedVideosList.filter(eachId => eachId.id !== obb.id)
      this.setState({savedVideosList: updatedList})
    } else {
      this.setState({savedVideosList: [...savedVideosList, obb]})
    }
  }

  renderRoute = () => (
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/trending" component={Trending} />
      <ProtectedRoute exact path="/gaming" component={Gaming} />
      <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
      <ProtectedRoute exact path="/videos/:id" component={VideoItemDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  )

  render() {
    const {
      isDarkTheme,
      likedVideosList,
      dislikedVideosList,
      savedVideosList,
    } = this.state
    return (
      <ThemeContext.Provider
        value={{
          isDarkTheme,
          changeTheme: this.changeTheme,
          likedVideosList,
          dislikedVideosList,
          updateLikedVideosList: this.updateLikedVideosList,
          updateDislikedVideosList: this.updateDislikedVideosList,
          savedVideosList,
          updateSavedVideosList: this.updateSavedVideosList,
        }}
      >
        {this.renderRoute()}
      </ThemeContext.Provider>
    )
  }
}

export default App
