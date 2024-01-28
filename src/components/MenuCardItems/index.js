import './index.css'

const MenuCardItems = props => {
  const {tabDetails, currentTab} = props
  const {menu_category} = tabDetails

  const onClickTab = () => {
    currentTab(menu_category)
  }

  return (
    <li className="list-item">
      <button className="tab-button" onClick={onClickTab}>
        {menu_category}
      </button>
    </li>
  )
}

export default MenuCardItems
