<template>
  <div class="sb-result-template-page sb-template-page-surface">
    <section class="sb-result-template-page__content" role="alert">
      <Result :status="null" class="sb-result-template-page__result" :title="content.title" :subtitle="content.description">
        <template #icon>
          <span class="sb-result-template-page__status-icon sb-result-template-page__status-icon--network" aria-hidden="true">
            <span class="sb-result-template-page__status-icon-inner">
              <img :src="iconUrl" alt="" />
            </span>
          </span>
        </template>
        <template #extra>
          <div class="sb-result-template-page__actions">
            <Button type="primary" :loading="reloading" @click="handleReload">
              {{ content.primaryAction }}
            </Button>
          </div>
        </template>
      </Result>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Message, Result } from '@sbux/starbucks-design-vue'
import { RESULT_ACTION_DELAY, RESULT_PAGE_CONTENT } from './result-pages.shared'

const content = RESULT_PAGE_CONTENT.networkError
const iconUrl = `${import.meta.env.BASE_URL}img/templates/result/network.svg`
const reloading = ref(false)

const handleReload = async () => {
  if (reloading.value) return

  reloading.value = true
  await new Promise((resolve) => setTimeout(resolve, RESULT_ACTION_DELAY))
  Message.warning(content.primaryFeedback)
  reloading.value = false
}
</script>
