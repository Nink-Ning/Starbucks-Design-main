<template>
  <div class="sb-basic-form-page sb-template-page-surface">
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
        <FormGrid>
          <FormGridItem>
            <FormItem field="storeName" label="门店名称" required>
              <Input v-model="form.storeName" :max-length="40" placeholder="请输入门店名称" />
            </FormItem>
          </FormGridItem>

          <FormGridItem>
            <FormItem field="storeCode" label="门店编号" required>
              <Input v-model="form.storeCode" :max-length="20" placeholder="请输入门店编号" />
            </FormItem>
          </FormGridItem>

          <FormGridItem>
            <FormItem field="storeType" label="门店类型" required>
              <Select v-model="form.storeType" :options="STORE_TYPE_OPTIONS" placeholder="请选择门店类型" />
            </FormItem>
          </FormGridItem>

          <FormGridItem>
            <FormItem field="businessStatus" label="营业状态" required>
              <FormControlArea>
                <RadioGroup v-model="form.businessStatus" :options="BUSINESS_STATUS_OPTIONS" />
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
                <CheckboxGroup v-model="form.serviceChannels" :options="SERVICE_CHANNEL_OPTIONS" />
              </FormControlArea>
            </FormItem>
          </FormGridItem>

          <FormGridItem>
            <FormItem field="deliveryEnabled" label="支持外送">
              <FormControlArea><Switch v-model="form.deliveryEnabled" /></FormControlArea>
            </FormItem>
          </FormGridItem>

          <FormGridItem>
            <FormItem field="manager" label="店长姓名">
              <Input v-model="form.manager" :max-length="20" placeholder="请输入店长姓名" />
            </FormItem>
          </FormGridItem>

          <FormGridItem :span="2" class="sb-basic-form-page__full-row">
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

          <FormGridItem :span="2" class="sb-basic-form-page__full-row">
            <FormActions>
              <Button :disabled="submitting" @click="handleReset">重置</Button>
              <Button html-type="submit" type="primary" :loading="submitting">保存</Button>
            </FormActions>
          </FormGridItem>
        </FormGrid>
      </Form>

      <div v-if="submitSuccess" class="sb-basic-form-page__success" role="status" aria-live="polite">
        门店信息已保存
      </div>
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
import { FormActions, FormControlArea, FormGrid, FormGridItem, FormPageLayout } from '@sbux/starbucks-design-vue/pro'
import {
  BASIC_FORM_MESSAGES,
  BUSINESS_STATUS_OPTIONS,
  createBasicFormBaseline,
  SERVICE_CHANNEL_OPTIONS,
  STORE_CODE_PATTERN,
  STORE_TYPE_OPTIONS,
} from './basic-form.shared'

const formRef = ref()
const form = reactive(createBasicFormBaseline())
const submitting = ref(false)
const submitSuccess = ref(false)

const rules = {
  storeName: [
    { required: true, message: BASIC_FORM_MESSAGES.storeNameRequired },
    { minLength: 2, maxLength: 40, message: BASIC_FORM_MESSAGES.storeNameLength },
  ],
  storeCode: [
    { required: true, message: BASIC_FORM_MESSAGES.storeCodeRequired },
    { minLength: 2, maxLength: 20, message: BASIC_FORM_MESSAGES.storeCodeLength },
    { match: STORE_CODE_PATTERN, message: BASIC_FORM_MESSAGES.storeCodeFormat },
  ],
  storeType: [{ required: true, message: BASIC_FORM_MESSAGES.storeTypeRequired }],
  businessStatus: [{ required: true, message: BASIC_FORM_MESSAGES.businessStatusRequired }],
  openingDate: [{ required: true, message: BASIC_FORM_MESSAGES.openingDateRequired }],
  manager: [{ maxLength: 20, message: BASIC_FORM_MESSAGES.managerLength }],
  description: [{ maxLength: 200, message: BASIC_FORM_MESSAGES.descriptionLength }],
}

const handleSubmit = async ({ errors }: { errors?: Record<string, unknown> }) => {
  submitSuccess.value = false
  if (errors || submitting.value) return

  submitting.value = true
  await new Promise((resolve) => setTimeout(resolve, 500))
  Message.success('门店保存成功')
  submitSuccess.value = true
  submitting.value = false
}

const handleReset = () => {
  formRef.value?.resetFields()
  submitting.value = false
  submitSuccess.value = false
}
</script>
