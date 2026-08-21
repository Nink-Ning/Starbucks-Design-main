<template>
  <div class="sb-result-template-page sb-template-page-surface">
    <section class="sb-result-template-page__content" role="alert">
      <Result :status="null" class="sb-result-template-page__result" :title="content.title" :subtitle="content.description">
        <template #icon>
          <span class="sb-result-template-page__status-icon sb-result-template-page__status-icon--failure" aria-hidden="true">
            <span class="sb-result-template-page__status-icon-inner">
              <img :src="iconUrl" alt="" />
            </span>
          </span>
        </template>
        <template #extra>
          <div class="sb-result-template-page__actions">
            <Button type="primary" :loading="submitting" @click="handleSubmit">
              {{ content.primaryAction }}
            </Button>
            <Button type="outline" :disabled="submitting" @click="Message.info(content.secondaryFeedback)">
              {{ content.secondaryAction }}
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

const content = RESULT_PAGE_CONTENT.failure
const iconUrl = `${import.meta.env.BASE_URL}img/templates/result/failure.svg`
const submitting = ref(false)

const handleSubmit = async () => {
  if (submitting.value) return

  submitting.value = true
  await new Promise((resolve) => setTimeout(resolve, RESULT_ACTION_DELAY))
  Message.info(content.primaryFeedback)
  submitting.value = false
}
</script>
