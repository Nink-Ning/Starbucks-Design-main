import { useMemo, useState } from 'react'
import { Avatar, Badge, Button, Cascader, Dropdown, Input, Menu, Message } from '@sbux/starbucks-design-react'
import {
  IconDown,
  IconNotification,
  IconPoweroff,
  IconSearch,
  IconSwap,
  IconUp
} from '@sbux/starbucks-design-react/icon'
import { getSystemById, getSystemPath, getSystemTriggerLabel, systemCascaderOptions } from './top-nav-menu.shared'
import './top-nav-menu.css'

const logoSrc = `${import.meta.env.BASE_URL}img/starbucks-system-logo.svg`
const avatarSrc = `${import.meta.env.BASE_URL}landing/nink-avatar.jpg`

export default function Demo({ brand = false }: { brand?: boolean }) {
  const [currentSystemId, setCurrentSystemId] = useState('s4')
  const [query, setQuery] = useState('')
  const [switcherVisible, setSwitcherVisible] = useState(false)
  const currentSystem = getSystemById(currentSystemId)
  const currentSystemLabel = getSystemTriggerLabel(currentSystem)
  const currentSystemPath = useMemo(() => getSystemPath(currentSystemId), [currentSystemId])

  const switchSystem = (systemId: string) => {
    setCurrentSystemId(systemId)
    setQuery('')
    setSwitcherVisible(false)
  }

  const userMenu = (
    <Menu
      className="sb-top-nav-user-menu"
      onClickMenuItem={(key) => {
        if (key === 'logout') Message.info('已退出当前账号')
      }}
    >
      <Menu.Item key="logout">
        <IconPoweroff />
        退出登录
      </Menu.Item>
    </Menu>
  )

  return (
    <div className={`menu-demo sb-top-nav-demo${brand ? ' sb-top-nav-demo--brand' : ''}`}>
      <div className="sb-top-nav-demo__viewport">
        <header className="sb-top-nav-demo__header" aria-label="应用顶部导航">
          <div className="sb-top-nav-demo__system-slot">
            <img className="sb-top-nav-demo__logo" src={logoSrc} alt="" />
            <Cascader
              className="sb-top-nav-system-cascader"
              dropdownMenuClassName="sb-top-nav-system-cascader__popup"
              options={systemCascaderOptions}
              value={currentSystemPath}
              popupVisible={switcherVisible}
              trigger="click"
              expandTrigger="click"
              showSearch={{
                renderOption: (_inputValue, option) => (
                  <span className="sb-top-nav-system-menu__item-name">{option.label}</span>
                )
              }}
              inputValue={query}
              triggerProps={{ blurToHide: false, position: 'bl', autoFitPosition: false }}
              filterOption={(inputValue, option) =>
                String(option.searchText ?? option.label)
                  .toLocaleLowerCase()
                  .includes(inputValue.trim().toLocaleLowerCase())
              }
              renderOption={(option, level) => (
                <span className={level === 0 ? 'sb-top-nav-system-cascader__group' : undefined}>{option.label}</span>
              )}
              dropdownRender={(panel) => (
                <div className="sb-top-nav-system-cascader__content">
                  <div className="sb-top-nav-system-cascader__search-wrap">
                    <Input
                      className="sb-top-nav-system-menu__search"
                      value={query}
                      placeholder="搜索系统名称或描述"
                      prefix={<IconSearch />}
                      allowClear
                      aria-label="搜索系统"
                      onChange={setQuery}
                    />
                  </div>
                  {panel}
                </div>
              )}
              onInputValueChange={setQuery}
              onChange={(value) => {
                const systemId = Array.isArray(value) ? value[value.length - 1] : value
                if (typeof systemId === 'string') switchSystem(systemId)
              }}
              onVisibleChange={setSwitcherVisible}
            >
              <button
                type="button"
                className={`sb-top-nav-demo__system-trigger${switcherVisible ? ' is-open' : ''}`}
                aria-haspopup="menu"
                aria-expanded={switcherVisible}
              >
                <span className="sb-top-nav-demo__system-copy">
                  <span className="sb-top-nav-demo__system-name">{currentSystemLabel}</span>
                </span>
                <span
                  className="sb-top-nav-demo__system-arrows sb-top-nav-demo__system-arrows--stacked"
                  aria-hidden="true"
                >
                  <IconUp />
                  <IconDown />
                </span>
              </button>
            </Cascader>
          </div>

          <div className="sb-top-nav-demo__main">
            <Menu className="sb-top-nav-demo__menu" mode="horizontal" selectable={false} ellipsis={false}>
              <Menu.Item key="workspace">菜单名称</Menu.Item>
            </Menu>

            <div className="sb-top-nav-demo__actions">
              <div className="sb-top-nav-demo__quick-actions">
                <Button
                  className="sb-top-nav-demo__action"
                  type="text"
                  size="default"
                  icon={<IconSwap />}
                  aria-label="门店切换"
                  title="门店切换"
                />
                <Badge className="sb-top-nav-demo__notification" count={15} offset={[-6, 2]}>
                  <Button
                    className="sb-top-nav-demo__action"
                    type="text"
                    size="default"
                    icon={<IconNotification />}
                    aria-label="消息"
                    title="消息"
                  />
                </Badge>
              </div>
              <span className="sb-top-nav-demo__divider" aria-hidden="true" />
              <div className="sb-top-nav-demo__user-area">
                <Avatar className="sb-top-nav-demo__avatar" size={32}>
                  <img src={avatarSrc} alt="" />
                </Avatar>
                <Dropdown droplist={userMenu} trigger="click" position="br">
                  <button className="sb-top-nav-demo__user" type="button" aria-label="用户菜单" aria-haspopup="menu">
                    <span className="sb-top-nav-demo__user-name">Hi！Nink</span>
                    <IconDown className="sb-top-nav-demo__user-arrow" aria-hidden="true" />
                  </button>
                </Dropdown>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  )
}
