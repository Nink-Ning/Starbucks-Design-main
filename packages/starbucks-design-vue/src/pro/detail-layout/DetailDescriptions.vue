<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Descriptions as ADescriptions } from '@arco-design/web-vue'
import type { DetailDescriptionsProps } from './interface'

defineOptions({ name: 'DetailDescriptions' })

const props = withDefaults(defineProps<DetailDescriptionsProps>(), {
  bordered: false,
})

const containerRef = ref<HTMLElement>()
const autoColumn = ref(3)
let observer: ResizeObserver | undefined

function resolveColumn(width: number) {
  if (width <= 720) return 1
  if (width <= 1200) return 2
  return 3
}

function updateColumn(width: number) {
  if (width > 0) autoColumn.value = resolveColumn(width)
}

function observeContainer() {
  if (props.column !== undefined || !containerRef.value) return
  updateColumn(containerRef.value.getBoundingClientRect().width)
  if (typeof ResizeObserver === 'undefined') return

  observer = new ResizeObserver((entries) => {
    const width = entries[0]?.contentRect.width
    if (width !== undefined) updateColumn(width)
  })
  observer.observe(containerRef.value)
}

onMounted(observeContainer)
onBeforeUnmount(() => observer?.disconnect())

watch(() => props.column, (column) => {
  observer?.disconnect()
  observer = undefined
  if (column === undefined) observeContainer()
})

const normalizedData = computed(() => (props.data ?? []).map((item) => ({
  ...item,
  value: props.emptyValue !== undefined && (item.value == null || item.value === '' || item.value === '--')
    ? props.emptyValue
    : item.value ?? '',
})))

const resolvedColumn = computed(() => props.column ?? autoColumn.value)
</script>

<template>
  <div
    ref="containerRef"
    :class="['sbux-pro-detail-descriptions', props.class]"
    :style="props.style"
  >
    <ADescriptions
      v-if="props.data?.length"
      :data="normalizedData"
      :column="resolvedColumn"
      :title="props.title"
      :layout="props.layout"
      :size="props.size"
      :align="props.align"
      :bordered="props.bordered"
      :label-style="props.labelStyle"
      :value-style="props.valueStyle"
      :table-layout="props.tableLayout"
    />
    <ADescriptions
      v-else
      :column="resolvedColumn"
      :title="props.title"
      :layout="props.layout"
      :size="props.size"
      :align="props.align"
      :bordered="props.bordered"
      :label-style="props.labelStyle"
      :value-style="props.valueStyle"
      :table-layout="props.tableLayout"
    >
      <slot />
    </ADescriptions>
  </div>
</template>
