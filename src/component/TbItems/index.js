import './index.css'

const TbItem = props => {
  const {tbDetails, onClickTb} = props
  const {id, thumbnailUrl} = tbDetails
  const onClickTbItem = () => {
    onClickTb(id)
  }
  return (
    <li className="thumbnail-item">
      <button type="button" className="tb-button" onClick={onClickTbItem}>
        <img src={thumbnailUrl} alt="thumbnail" className="tb-img" />
      </button>
    </li>
  )
}
export default TbItem
