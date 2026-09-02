<template>
  <div class="sb-result-template-page sb-template-page-surface">
    <section class="sb-result-template-page__content" role="status" aria-live="polite">
      <Result :status="null" class="sb-result-template-page__result" :title="content.title" :subtitle="content.description">
        <template #icon>
          <span class="sb-result-template-page__status-icon sb-result-template-page__status-icon--success" aria-hidden="true">
            <span class="sb-result-template-page__status-icon-inner">
              <img :src="iconUrl" alt="" />
            </span>
          </span>
        </template>
        <template #extra>
          <div class="sb-result-template-page__actions">
            <Button type="primary" @click="Message.info(content.primaryFeedback)">
              {{ content.primaryAction }}
            </Button>
          </div>
        </template>
      </Result>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Button, Message, Result } from '@sbux/starbucks-design-vue'
import { RESULT_PAGE_CONTENT } from './result-pages.shared'

const content = RESULT_PAGE_CONTENT.success
const iconUrl = `${import.meta.env.BASE_URL}img/templates/result/success.svg`
</script>
