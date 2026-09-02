<template>
  <div :class="['menu-demo sb-top-nav-demo', { 'sb-top-nav-demo--brand': brand }]">
    <div class="sb-top-nav-demo__viewport">
      <header class="sb-top-nav-demo__header" aria-label="应用顶部导航">
        <div class="sb-top-nav-demo__system-slot">
          <img class="sb-top-nav-demo__logo" :src="logoSrc" alt="" />
          <Trigger
            v-model:popup-visible="switcherVisible"
            trigger="click"
            position="bl"
            :click-to-close="false"
            :blur-to-close="false"
            :auto-fit-position="false"
            content-class="sb-top-nav-system-cascader__popup"
          >
            <button
              type="button"
              :class="['sb-top-nav-demo__system-trigger', { 'is-open': switcherVisible }]"
              aria-haspopup="menu"
              :aria-expanded="switcherVisible"
            >
              <span class="sb-top-nav-demo__system-copy">
                <span class="sb-top-nav-demo__system-name">
                  {{ currentSystemLabel }}
                </span>
              </span>
              <span class="sb-top-nav-demo__system-arrows sb-top-nav-demo__system-arrows--stacked" aria-hidden="true">
                <IconUp />
                <IconDown />
              </span>
            </button>

            <template #content>
              <div class="sb-top-nav-system-cascader__content">
                <div class="sb-top-nav-system-cascader__search-wrap">
                  <Input
                    v-model="query"
                    class="sb-top-nav-system-menu__search"
                    placeholder="搜索系统名称或描述"
                    allow-clear
                    aria-label="搜索系统"
                  >
                    <template #prefix><IconSearch /></template>
                  </Input>
                </div>
                <CascaderPanel
                  v-if="!query.trim()"
                  class="sb-top-nav-system-cascader__panel"
                  :options="systemCascaderOptions"
                  :model-value="currentSystemId"
                  expand-trigger="click"
                  expand-child
                  @change="switchSystem"
                />
                <div v-else class="sb-top-nav-system-cascader__results" role="menu" aria-label="系统搜索结果">
                  <button
                    v-for="system in searchResults"
                    :key="system.id"
                    type="button"
                    :class="['sb-top-nav-system-cascader__result', { 'is-selected': system.id === currentSystemId }]"
                    role="menuitem"
                    @click="switchSystem(system.id)"
                  >
                    <span class="sb-top-nav-system-menu__item-name">{{ system.name }}</span>
                    <IconCheck v-if="system.id === currentSystemId" class="sb-top-nav-system-menu__check" />
                  </button>
                  <div v-if="!searchResults.length" class="sb-top-nav-system-menu__empty" role="status">
                    未找到匹配的系统
                  </div>
                </div>
              </div>
            </template>
          </Trigger>
        </div>

        <div class="sb-top-nav-demo__main">
          <Menu
            class="sb-top-nav-demo__menu sb-top-nav-demo__menu--vue"
            mode="horizontal"
            :selectable="false"
          >
            <MenuItem key="workspace">菜单名称</MenuItem>
          </Menu>

          <div class="sb-top-nav-demo__actions">
            <div class="sb-top-nav-demo__quick-actions">
              <Button class="sb-top-nav-demo__action" type="text" size="default" aria-label="门店切换" title="门店切换">
                <template #icon><IconSwap /></template>
              </Button>
              <Badge class="sb-top-nav-demo__notification" :count="15" :offset="[-6, 2]">
                <Button class="sb-top-nav-demo__action" type="text" size="default" aria-label="消息" title="消息">
                  <template #icon><IconNotification /></template>
                </Button>
              </Badge>
            </div>
            <span class="sb-top-nav-demo__divider" aria-hidden="true" />
            <div class="sb-top-nav-demo__user-area">
              <Avatar class="sb-top-nav-demo__avatar" :size="32">
                <img :src="avatarSrc" alt="" />
              </Avatar>
              <Dropdown position="br" trigger="click" @select="handleUserAction">
                <button class="sb-top-nav-demo__user" type="button" aria-label="用户菜单" aria-haspopup="menu">
                  <span class="sb-top-nav-demo__user-name">Hi！Nink</span>
                  <IconDown class="sb-top-nav-demo__user-arrow" aria-hidden="true" />
                </button>
                <template #content>
                  <Doption value="logout">
                    <template #icon><IconPoweroff /></template>
                    退出登录
                  </Doption>
                </template>
              </Dropdown>
            </div>
          </div>
        </div>
      </header>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue'
import { Message } from '@sbux/starbucks-design-vue'
import {
  IconCheck,
  IconDown,
  IconNotification,
  IconPoweroff,
  IconSearch,
  IconSwap,
  IconUp
} from '@sbux/starbucks-design-vue/icon'
import {
  getSystemById,
  getSystemSearchResults,
  getSystemTriggerLabel,
  systemCascaderOptions
} from './top-nav-menu.shared'
import './top-nav-menu.css'

withDefaults(defineProps<{ brand?: boolean }>(), {
  brand: false
})

const logoSrc = `${import.meta.env.BASE_URL}img/starbucks-system-logo.svg`
const avatarSrc = `${import.meta.env.BASE_URL}landing/nink-avatar.jpg`
const appContext = getCurrentInstance()!.appContext
const currentSystemId = ref('s4')
const query = ref('')
const switcherVisible = ref(false)
const currentSystem = computed(() => getSystemById(currentSystemId.value))
const currentSystemLabel = computed(() => getSystemTriggerLabel(currentSystem.value))
const searchResults = computed(() => getSystemSearchResults(query.value))

function switchSystem(systemId: string | number | Record<string, unknown>) {
  if (typeof systemId !== 'string') return
  currentSystemId.value = systemId
  query.value = ''
  switcherVisible.value = false
}

function handleUserAction(action: string | number | Record<string, unknown>) {
  if (action === 'logout') Message.info('已退出当前账号', appContext)
}
</script>
