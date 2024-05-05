import './index.css'

const CategoryItems = props => {
  const {tabDetails, onClickTab, isActive} = props
  const {tabId, displayText} = tabDetails
  const activeTab = isActive ? 'active-tab' : ''
  const changeTab = () => {
    onClickTab(tabId)
  }

  return (
    <li className="category-item">
      <button
        type="button"
        className={`category-button ${activeTab}`}
        onClick={changeTab}
      >
        {displayText}
      </button>
    </li>
  )
}
export default CategoryItems
