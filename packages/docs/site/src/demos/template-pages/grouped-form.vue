<template>
  <div class="sb-grouped-form-page sb-template-page-surface">
    <FormPageLayout>
      <Form
        ref="formRef"
        :model="form"
        layout="vertical"
        :rules="rules"
        :disabled="submitting"
        :scroll-to-first-error="true"
        @submit="handleSubmit"
      >
        <FormSection title="基础信息" description="用于识别和区分门店" divider>
          <FormGrid>
            <FormGridItem>
              <FormItem field="storeName" label="门店名称" required>
                <Input v-model="form.storeName" placeholder="请输入门店名称" />
              </FormItem>
            </FormGridItem>
            <FormGridItem>
              <FormItem field="storeCode" label="门店编号" required>
                <Input v-model="form.storeCode" placeholder="请输入门店编号" />
              </FormItem>
            </FormGridItem>
            <FormGridItem>
              <FormItem field="storeType" label="门店类型" required>
                <Select v-model="form.storeType" :options="FORM_TEMPLATE_STORE_TYPES" placeholder="请选择门店类型" />
              </FormItem>
            </FormGridItem>
          </FormGrid>
        </FormSection>

        <FormSection title="营业信息" description="设置营业状态、开业日期和服务渠道" divider>
          <FormGrid>
            <FormGridItem>
              <FormItem field="businessStatus" label="营业状态" required>
                <FormControlArea>
                  <RadioGroup v-model="form.businessStatus" :options="FORM_TEMPLATE_STATUS_OPTIONS" />
                </FormControlArea>
              </FormItem>
            </FormGridItem>
            <FormGridItem>
              <FormItem field="openingDate" label="开业日期" required>
                <DatePicker v-model="form.openingDate" style="width: 100%" />
              </FormItem>
            </FormGridItem>
            <FormGridItem>
              <FormItem field="serviceChannels" label="服务渠道">
                <FormControlArea>
                  <CheckboxGroup v-model="form.serviceChannels" :options="FORM_TEMPLATE_CHANNEL_OPTIONS" />
                </FormControlArea>
              </FormItem>
            </FormGridItem>
            <FormGridItem>
              <FormItem field="deliveryEnabled" label="支持外送">
                <FormControlArea><Switch v-model="form.deliveryEnabled" /></FormControlArea>
              </FormItem>
            </FormGridItem>
          </FormGrid>
        </FormSection>

        <FormSection title="负责人信息" description="填写门店负责人和补充说明">
          <FormGrid>
            <FormGridItem>
              <FormItem field="manager" label="店长姓名" required>
                <Input v-model="form.manager" placeholder="请输入店长姓名" />
              </FormItem>
            </FormGridItem>
            <FormGridItem :span="2">
              <FormItem field="description" label="备注">
                <Textarea
                  v-model="form.description"
                  style="width: 100%"
                  :max-length="200"
                  show-word-limit
                  :auto-size="{ minRows: 3, maxRows: 6 }"
                  placeholder="请输入备注"
                />
              </FormItem>
            </FormGridItem>
          </FormGrid>
        </FormSection>

        <FormGrid>
          <FormGridItem :span="2">
            <FormActions>
              <Button @click="handleReset">重置</Button>
              <Button html-type="submit" type="primary" :loading="submitting">保存配置</Button>
            </FormActions>
          </FormGridItem>
        </FormGrid>
      </Form>

      <div v-if="submitSuccess" class="sb-grouped-form-page__success" role="status">门店配置已保存</div>
    </FormPageLayout>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import {
  Button,
  CheckboxGroup,
  DatePicker,
  Form,
  FormItem,
  Input,
  Message,
  RadioGroup,
  Select,
  Switch,
  Textarea,
} from '@sbux/starbucks-design-vue'
import { FormActions, FormControlArea, FormGrid, FormGridItem, FormPageLayout, FormSection } from '@sbux/starbucks-design-vue/pro'
import {
  FORM_TEMPLATE_CHANNEL_OPTIONS,
  FORM_TEMPLATE_MESSAGES,
  FORM_TEMPLATE_STATUS_OPTIONS,
  FORM_TEMPLATE_STORE_TYPES,
  createGroupedFormBaseline,
} from './grouped-step-form.shared'

const formRef = ref()
const form = reactive(createGroupedFormBaseline())
const submitting = ref(false)
const submitSuccess = ref(false)

const rules = {
  storeName: [{ required: true, message: FORM_TEMPLATE_MESSAGES.storeName }],
  storeCode: [{ required: true, message: FORM_TEMPLATE_MESSAGES.storeCode }],
  storeType: [{ required: true, message: FORM_TEMPLATE_MESSAGES.storeType }],
  businessStatus: [{ required: true, message: FORM_TEMPLATE_MESSAGES.businessStatus }],
  openingDate: [{ required: true, message: FORM_TEMPLATE_MESSAGES.openingDate }],
  manager: [{ required: true, message: FORM_TEMPLATE_MESSAGES.manager }],
}

const handleSubmit = async ({ errors }: { errors?: Record<string, unknown> }) => {
  submitSuccess.value = false
  if (errors || submitting.value) return
  submitting.value = true
  await new Promise((resolve) => setTimeout(resolve, 500))
  Message.success('门店配置保存成功')
  submitSuccess.value = true
  submitting.value = false
}

const handleReset = () => {
  formRef.value?.resetFields()
  submitSuccess.value = false
}
</script>
