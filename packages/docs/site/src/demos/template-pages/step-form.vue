<template>
  <div class="sb-step-form-page sb-template-page-surface">
    <PageHeader
      v-if="!pageHeaderInDocs"
      title="新建活动"
      help-text="按步骤完成活动配置"
      backable
      @back="handleBack"
    />
    <Teleport v-if="pageHeaderInDocs" :to="pageHeaderTarget">
      <PageHeader
        title="新建活动"
        help-text="按步骤完成活动配置"
        backable
        @back="handleBack"
      />
    </Teleport>
    <FormPageLayout>
      <Form ref="formRef" :model="form" layout="vertical" :rules="rules" :disabled="submitting">
        <StepFormLayout :sticky-actions="true">
          <template #steps>
            <Steps :current="currentStep">
              <Step>活动基础信息</Step>
              <Step>活动准入规则</Step>
              <Step>活动任务内容</Step>
            </Steps>
          </template>

          <FormSection v-if="currentStep === 1">
            <FormGrid>
              <FormGridItem>
                <FormItem field="activityName" label="活动名称" required>
                  <Input v-model="form.activityName" :max-length="80" placeholder="请输入活动名称" />
                </FormItem>
              </FormGridItem>

              <FormGridItem>
                <FormItem field="activityTime" label="活动时间" required>
                  <RangePicker v-model="form.activityTime" show-time format="YYYY-MM-DD HH:mm:ss" style="width: 100%" />
                </FormItem>
              </FormGridItem>

              <FormGridItem>
                <FormItem field="team" label="所属团队" required>
                  <Select v-model="form.team" :options="ACTIVITY_TEAM_OPTIONS" placeholder="请选择所属团队" />
                </FormItem>
              </FormGridItem>

              <FormGridItem>
                <FormItem field="deadlineDays" label="活动完成期限" required>
                  <div class="sb-step-form-page__inline-field">
                    <span>用户在准入后的 T+</span>
                    <Input v-model.number="form.deadlineDays" type="number" :min="-1" style="width: 120px" />
                    <span>天结束活动</span>
                  </div>
                </FormItem>
              </FormGridItem>
            </FormGrid>
          </FormSection>

          <FormSection v-else-if="currentStep === 2">
            <FormGrid>
              <FormGridItem :span="2">
                <FormItem field="memberLimit" label="参与限制" required>
                  <FormControlArea>
                    <RadioGroup v-model="form.memberLimit" :options="ACTIVITY_MEMBER_LIMIT_OPTIONS" />
                  </FormControlArea>
                </FormItem>
              </FormGridItem>

              <FormGridItem :span="2">
                <FormItem field="memberLevels" label="会员等级" required>
                  <FormControlArea>
                    <CheckboxGroup v-model="form.memberLevels" :options="ACTIVITY_MEMBER_LEVEL_OPTIONS" />
                  </FormControlArea>
                </FormItem>
              </FormGridItem>

              <FormGridItem :span="2">
                <FormItem field="cities" label="选择活动城市" required>
                  <FormControlArea>
                    <Select
                      v-model="form.cities"
                      multiple
                      :options="ACTIVITY_CITY_OPTIONS"
                      placeholder="请选择活动城市"
                      style="width: 100%"
                    />
                  </FormControlArea>
                </FormItem>
              </FormGridItem>

              <FormGridItem :span="2">
                <FormItem field="targetAudience" label="指定人群" required>
                  <FormControlArea>
                    <RadioGroup v-model="form.targetAudience" :options="ACTIVITY_TARGET_AUDIENCE_OPTIONS" />
                  </FormControlArea>
                </FormItem>
              </FormGridItem>
            </FormGrid>
          </FormSection>

          <FormSection v-else>
            <FormGrid>
              <FormGridItem>
                <FormItem field="taskType" label="任务类型" required>
                  <Select v-model="form.taskType" :options="ACTIVITY_TASK_TYPE_OPTIONS" placeholder="请选择任务类型" />
                </FormItem>
              </FormGridItem>

              <FormGridItem>
                <FormItem field="eventFilter" label="事件是否过滤" required>
                  <FormControlArea>
                    <RadioGroup v-model="form.eventFilter" :options="[
                      { label: '过滤', value: 'filter' },
                      { label: '不过滤', value: 'no-filter' },
                    ]" />
                  </FormControlArea>
                </FormItem>
              </FormGridItem>

              <FormGridItem>
                <FormItem field="couponType" label="券类型" required>
                  <Select v-model="form.couponType" :options="ACTIVITY_COUPON_TYPE_OPTIONS" placeholder="请选择券类型" />
                </FormItem>
              </FormGridItem>

              <FormGridItem>
                <FormItem field="couponScope" label="券号与券名" required>
                  <FormControlArea>
                    <RadioGroup v-model="form.couponScope" :options="[
                      { label: '不限', value: 'all' },
                      { label: '选择指定券', value: 'specified' },
                    ]" />
                  </FormControlArea>
                </FormItem>
              </FormGridItem>

              <FormGridItem :span="2">
                <FormItem field="selectedCoupons" label="选择活动券" required>
                  <Select
                    v-model="form.selectedCoupons"
                    multiple
                    :options="ACTIVITY_COUPON_SELECT_OPTIONS"
                    placeholder="请选择活动券"
                    style="width: 100%"
                  />
                </FormItem>
              </FormGridItem>

              <FormGridItem :span="2">
                <div class="sb-step-form-page__output-divider" />
              </FormGridItem>

              <FormGridItem :span="2">
                <div class="sb-step-form-page__dynamic-results">
                  <div v-for="(result, index) in form.outputResults" :key="index" class="sb-step-form-page__dynamic-result">
                    <FormItem :field="`outputResults[${index}]`" :label="`输出结果${index + 1}`" required>
                      <div class="sb-step-form-page__inline-field">
                        <span>用户核销</span>
                        <Input v-model.number="form.outputResults[index]" type="number" style="width: 120px" />
                        <span>张</span>
                      </div>
                    </FormItem>
                    <Button v-if="form.outputResults.length > 1" type="text" status="danger" @click="removeOutputResult(index)">删除</Button>
                  </div>
                  <Button type="text" @click="addOutputResult">＋新增输出结果</Button>
                </div>
              </FormGridItem>
            </FormGrid>
          </FormSection>

          <template #actions>
            <FormActions align="between">
              <Button html-type="button" :disabled="submitting" @click="handleCancel">取消</Button>
              <Space>
                <Button html-type="button" :disabled="currentStep === 1 || submitting" @click="handlePrevious">上一步</Button>
                <Button html-type="button" type="primary" :loading="submitting" @click="handleNext">
                  {{ currentStep === STEP_FIELDS.length ? '提交' : '下一步' }}
                </Button>
              </Space>
            </FormActions>
          </template>
        </StepFormLayout>
      </Form>

      <div v-if="submitSuccess" class="sb-step-form-page__success" role="status">活动创建成功</div>
    </FormPageLayout>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  Button,
  CheckboxGroup,
  Form,
  FormItem,
  Input,
  Message,
  RadioGroup,
  RangePicker,
  Select,
  Space,
  Step,
  Steps,
} from '@sbux/starbucks-design-vue'
import { FormActions, FormControlArea, FormGrid, FormGridItem, FormPageLayout, FormSection, PageHeader, StepFormLayout } from '@sbux/starbucks-design-vue/pro'
import {
  ACTIVITY_COUPON_SELECT_OPTIONS,
  ACTIVITY_COUPON_TYPE_OPTIONS,
  ACTIVITY_CITY_OPTIONS,
  ACTIVITY_MEMBER_LEVEL_OPTIONS,
  ACTIVITY_MEMBER_LIMIT_OPTIONS,
  ACTIVITY_MESSAGES,
  ACTIVITY_TARGET_AUDIENCE_OPTIONS,
  ACTIVITY_TASK_TYPE_OPTIONS,
  ACTIVITY_TEAM_OPTIONS,
  createStepFormBaseline,
} from './grouped-step-form.shared'

const STEP_FIELDS = [
  ['activityName', 'activityTime', 'team', 'deadlineDays'],
  ['memberLimit', 'memberLevels', 'cities', 'targetAudience'],
  ['taskType', 'eventFilter', 'couponType', 'couponScope', 'selectedCoupons', 'outputResults'],
] as const

const formRef = ref()
const form = reactive(createStepFormBaseline())
const currentStep = ref(1)
const submitting = ref(false)
const submitSuccess = ref(false)

const rules = {
  activityName: [{ required: true, message: ACTIVITY_MESSAGES.activityName }],
  activityTime: [{ required: true, message: ACTIVITY_MESSAGES.activityTime }],
  team: [{ required: true, message: ACTIVITY_MESSAGES.team }],
  deadlineDays: [{ required: true, message: ACTIVITY_MESSAGES.deadlineDays }],
  memberLimit: [{ required: true, message: ACTIVITY_MESSAGES.memberLimit }],
  memberLevels: [{ required: true, minLength: 1, message: ACTIVITY_MESSAGES.memberLevels }],
  cities: [{ required: true, minLength: 1, message: ACTIVITY_MESSAGES.city }],
  targetAudience: [{ required: true, message: ACTIVITY_MESSAGES.targetAudience }],
  taskType: [{ required: true, message: ACTIVITY_MESSAGES.taskType }],
  eventFilter: [{ required: true, message: ACTIVITY_MESSAGES.eventFilter }],
  couponType: [{ required: true, message: ACTIVITY_MESSAGES.couponType }],
  couponScope: [{ required: true, message: ACTIVITY_MESSAGES.couponScope }],
  selectedCoupons: [{ required: true, minLength: 1, message: ACTIVITY_MESSAGES.selectedCoupons }],
  outputResults: [{ required: true, minLength: 1, message: ACTIVITY_MESSAGES.outputResults }],
}

const addOutputResult = () => {
  form.outputResults.push(1)
}

const removeOutputResult = (index: number) => {
  if (form.outputResults.length > 1) form.outputResults.splice(index, 1)
}

const handleNext = async () => {
  if (submitting.value) return
  const errors = await formRef.value?.validateField(STEP_FIELDS[currentStep.value - 1])
  if (errors) return

  if (currentStep.value < STEP_FIELDS.length) {
    currentStep.value += 1
    return
  }

  submitting.value = true
  await new Promise((resolve) => setTimeout(resolve, 500))
  Message.success('活动创建成功')
  submitSuccess.value = true
  submitting.value = false
}

const handlePrevious = () => {
  if (!submitting.value) currentStep.value = Math.max(1, currentStep.value - 1)
}

const handleCancel = () => {
  formRef.value?.resetFields()
  currentStep.value = 1
  submitSuccess.value = false
}

const handleBack = () => Message.info('返回活动列表')
const pageHeaderTarget = '[data-template-page-header-host="step-form"]'
const pageHeaderInDocs = typeof document !== 'undefined' && Boolean(document.querySelector(pageHeaderTarget))
</script>
