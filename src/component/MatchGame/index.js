import {Component} from 'react'
import CategoryItems from '../CategoryItems/index'
import TbItems from '../TbItems/index'
import './index.css'

class MatchGame extends Component {
  constructor(props) {
    super(props)
    const {tabsList, imagesList} = this.props
    this.state = {
      time: 60,
      score: 0,
      imageData: imagesList[0],
      currentTabId: tabsList[0].tabId,
      isGameOver: false,
    }
  }

  componentDidMount() {
    this.timerId = setInterval(this.tick, 1000)
  }

  tick = () => {
    const {time} = this.state
    if (time > 0) {
      this.setState(prevState => ({time: prevState.time - 1}))
    } else {
      clearInterval(this.timerId)
    }
  }

  onClickTab = id => {
    this.setState({currentTabId: id})
  }

  sheffleImageData = () => {
    const {imagesList} = this.props
    const randomNum = Math.floor(Math.random() * imagesList.length)
    return imagesList[randomNum]
  }

  onClickTb = id => {
    const {imageData, score} = this.state
    if (imageData.id === id) {
      const mainimageData = this.sheffleImageData()
      this.setState({score: score + 1, imageData: mainimageData})
    } else {
      this.setState({isGameOver: true})
      clearInterval(this.timerId)
    }
  }

  onRestart = () => {
    const {imagesList, tabsList} = this.props
    this.setState({
      time: 60,
      score: 0,
      imageData: imagesList[0],
      currentTabId: tabsList[0].tabId,
      isGameOver: false,
    })
    this.componentDidMount()
  }

  renderMatchGame = () => {
    const {tabsList, imagesList} = this.props
    const {imageData, currentTabId} = this.state

    const thumbnailsImgsList = imagesList.filter(
      eachItem => eachItem.category === currentTabId,
    )

    return (
      <div className="match-game-container">
        <div>
          <img src={imageData.imageUrl} alt="match" className="match-image" />
        </div>
        <ul className="category-buttons-container">
          {tabsList.map(eachItem => (
            <CategoryItems
              key={eachItem.tabId}
              tabDetails={eachItem}
              isActive={currentTabId === eachItem.tabId}
              onClickTab={this.onClickTab}
            />
          ))}
        </ul>
        <ul className="thumbnails-container">
          {thumbnailsImgsList.map(eachItem => (
            <TbItems
              key={eachItem.id}
              tbDetails={eachItem}
              onClickTb={this.onClickTb}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderGameOver = () => {
    const {score} = this.state
    return (
      <div className="game-over-section">
        <div className="game-over-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
            alt="trophy"
            className="trophy-logo"
          />
          <p className="your-score">Your Score</p>
          <h1 className="final-score">{score}</h1>
          <button
            type="button"
            className="play-again-button"
            onClick={this.onRestart}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
              alt="reset"
              className="reset-img"
            />
            Play Again
          </button>
        </div>
      </div>
    )
  }

  render() {
    const {time, score, isGameOver} = this.state
    return (
      <div className="app-container">
        <nav className="navbar-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website logo"
            className="logo-img"
          />
          <ul className="score-timer-container">
            <li className="list-item ">
              <p className="score-text">
                Score: <span>{score}</span>
              </p>
            </li>
            <li className="list-item">
              <div className="timer-section">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                  alt="timer"
                  className="timer-logo"
                />
                <p className="time-text">{time} sec</p>
              </div>
            </li>
          </ul>
        </nav>
        <div className="match-game-section">
          {isGameOver || time === 0
            ? this.renderGameOver()
            : this.renderMatchGame()}
        </div>
      </div>
    )
  }
}
export default MatchGame
