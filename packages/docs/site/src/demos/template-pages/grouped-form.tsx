import { useState } from 'react'
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Message,
  Radio,
  Select,
  Switch,
} from '@sbux/starbucks-design-react'
import {
  FormActions,
  FormControlArea,
  FormGrid,
  FormGridItem,
  FormPageLayout,
  FormSection,
} from '@sbux/starbucks-design-react/pro'
import {
  FORM_TEMPLATE_CHANNEL_OPTIONS,
  FORM_TEMPLATE_MESSAGES,
  FORM_TEMPLATE_STATUS_OPTIONS,
  FORM_TEMPLATE_STORE_TYPES,
  createGroupedFormBaseline,
  type GroupedFormValues,
} from './grouped-step-form.shared'

export default function Demo() {
  const [form] = Form.useForm<GroupedFormValues>()
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async () => {
    if (submitting) return
    setSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    Message.success('门店配置保存成功')
    setSubmitSuccess(true)
    setSubmitting(false)
  }

  const handleReset = () => {
    form.resetFields()
    setSubmitSuccess(false)
  }

  return (
    <div className="sb-grouped-form-page sb-template-page-surface">
      <FormPageLayout>
        <Form
          form={form}
          layout="vertical"
          initialValues={createGroupedFormBaseline()}
          autoComplete="off"
          disabled={submitting}
          scrollToFirstError
          onValuesChange={() => setSubmitSuccess(false)}
          onSubmit={handleSubmit}
          onSubmitFailed={() => setSubmitSuccess(false)}
        >
          <FormSection title="基础信息" description="用于识别和区分门店" divider>
            <FormGrid>
              <FormGridItem>
                <Form.Item label="门店名称" field="storeName" required rules={[{ required: true, message: FORM_TEMPLATE_MESSAGES.storeName }]}>
                  <Input placeholder="请输入门店名称" />
                </Form.Item>
              </FormGridItem>
              <FormGridItem>
                <Form.Item label="门店编号" field="storeCode" required rules={[{ required: true, message: FORM_TEMPLATE_MESSAGES.storeCode }]}>
                  <Input placeholder="请输入门店编号" />
                </Form.Item>
              </FormGridItem>
              <FormGridItem>
                <Form.Item label="门店类型" field="storeType" required rules={[{ required: true, message: FORM_TEMPLATE_MESSAGES.storeType }]}>
                  <Select options={FORM_TEMPLATE_STORE_TYPES} placeholder="请选择门店类型" />
                </Form.Item>
              </FormGridItem>
            </FormGrid>
          </FormSection>

          <FormSection title="营业信息" description="设置营业状态、开业日期和服务渠道" divider>
            <FormGrid>
              <FormGridItem>
                <Form.Item label="营业状态" field="businessStatus" required rules={[{ required: true, message: FORM_TEMPLATE_MESSAGES.businessStatus }]}>
                  <FormControlArea>
                    <Radio.Group>
                      {FORM_TEMPLATE_STATUS_OPTIONS.map((option) => (
                        <Radio key={option.value} value={option.value}>{option.label}</Radio>
                      ))}
                    </Radio.Group>
                  </FormControlArea>
                </Form.Item>
              </FormGridItem>
              <FormGridItem>
                <Form.Item label="开业日期" field="openingDate" required rules={[{ required: true, message: FORM_TEMPLATE_MESSAGES.openingDate }]}>
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </FormGridItem>
              <FormGridItem>
                <Form.Item label="服务渠道" field="serviceChannels">
                  <FormControlArea>
                    <Checkbox.Group>
                      {FORM_TEMPLATE_CHANNEL_OPTIONS.map((option) => (
                        <Checkbox key={option.value} value={option.value}>{option.label}</Checkbox>
                      ))}
                    </Checkbox.Group>
                  </FormControlArea>
                </Form.Item>
              </FormGridItem>
              <FormGridItem>
                <Form.Item label="支持外送" field="deliveryEnabled" triggerPropName="checked">
                  <FormControlArea><Switch /></FormControlArea>
                </Form.Item>
              </FormGridItem>
            </FormGrid>
          </FormSection>

          <FormSection title="负责人信息" description="填写门店负责人和补充说明">
            <FormGrid>
              <FormGridItem>
                <Form.Item label="店长姓名" field="manager" rules={[{ required: true, message: FORM_TEMPLATE_MESSAGES.manager }]}>
                  <Input placeholder="请输入店长姓名" />
                </Form.Item>
              </FormGridItem>
              <FormGridItem span={2}>
                <Form.Item label="备注" field="description">
                  <Input.TextArea
                    style={{ width: '100%' }}
                    maxLength={200}
                    showWordLimit
                    autoSize={{ minRows: 3, maxRows: 6 }}
                    placeholder="请输入备注"
                  />
                </Form.Item>
              </FormGridItem>
            </FormGrid>
          </FormSection>

          <FormGrid>
            <FormGridItem span={2}>
              <FormActions>
                <Button onClick={handleReset}>重置</Button>
                <Button type="primary" htmlType="submit" loading={submitting}>保存配置</Button>
              </FormActions>
            </FormGridItem>
          </FormGrid>
        </Form>

        {submitSuccess && <div className="sb-grouped-form-page__success" role="status">门店配置已保存</div>}
      </FormPageLayout>
    </div>
  )
}
