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
} from '@sbux/starbucks-design-react/pro'
import {
  BASIC_FORM_MESSAGES,
  BUSINESS_STATUS_OPTIONS,
  createBasicFormBaseline,
  SERVICE_CHANNEL_OPTIONS,
  STORE_CODE_PATTERN,
  STORE_TYPE_OPTIONS,
  type BasicFormValues,
} from './basic-form.shared'

export default function Demo() {
  const [form] = Form.useForm<BasicFormValues>()
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async () => {
    if (submitting) return

    setSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    Message.success('门店保存成功')
    setSubmitSuccess(true)
    setSubmitting(false)
  }

  const handleReset = () => {
    form.resetFields()
    setSubmitting(false)
    setSubmitSuccess(false)
  }

  return (
    <div className="sb-basic-form-page sb-template-page-surface">
      <FormPageLayout>
        <Form
          form={form}
          layout="vertical"
          initialValues={createBasicFormBaseline()}
          autoComplete="off"
          disabled={submitting}
          scrollToFirstError
          onValuesChange={() => setSubmitSuccess(false)}
          onSubmit={handleSubmit}
          onSubmitFailed={() => setSubmitSuccess(false)}
        >
          <FormGrid>
            <FormGridItem>
              <Form.Item
                label="门店名称"
                field="storeName"
                required
                rules={[
                  { required: true, message: BASIC_FORM_MESSAGES.storeNameRequired },
                  { minLength: 2, maxLength: 40, message: BASIC_FORM_MESSAGES.storeNameLength },
                ]}
              >
                <Input maxLength={40} placeholder="请输入门店名称" />
              </Form.Item>
            </FormGridItem>

            <FormGridItem>
              <Form.Item
                label="门店编号"
                field="storeCode"
                required
                rules={[
                  { required: true, message: BASIC_FORM_MESSAGES.storeCodeRequired },
                  { minLength: 2, maxLength: 20, message: BASIC_FORM_MESSAGES.storeCodeLength },
                  { match: STORE_CODE_PATTERN, message: BASIC_FORM_MESSAGES.storeCodeFormat },
                ]}
              >
                <Input maxLength={20} placeholder="请输入门店编号" />
              </Form.Item>
            </FormGridItem>

            <FormGridItem>
              <Form.Item
                label="门店类型"
                field="storeType"
                required
                rules={[{ required: true, message: BASIC_FORM_MESSAGES.storeTypeRequired }]}
              >
                <Select options={STORE_TYPE_OPTIONS} placeholder="请选择门店类型" />
              </Form.Item>
            </FormGridItem>

            <FormGridItem>
              <Form.Item
                label="营业状态"
                field="businessStatus"
                required
                rules={[{ required: true, message: BASIC_FORM_MESSAGES.businessStatusRequired }]}
              >
                <FormControlArea>
                  <Radio.Group>
                    {BUSINESS_STATUS_OPTIONS.map((option) => (
                      <Radio key={option.value} value={option.value}>{option.label}</Radio>
                    ))}
                  </Radio.Group>
                </FormControlArea>
              </Form.Item>
            </FormGridItem>

            <FormGridItem>
              <Form.Item
                label="开业日期"
                field="openingDate"
                required
                rules={[{ required: true, message: BASIC_FORM_MESSAGES.openingDateRequired }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </FormGridItem>

            <FormGridItem>
              <Form.Item label="服务渠道" field="serviceChannels">
                <FormControlArea>
                  <Checkbox.Group>
                    {SERVICE_CHANNEL_OPTIONS.map((option) => (
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

            <FormGridItem>
              <Form.Item
                label="店长姓名"
                field="manager"
                rules={[{ maxLength: 20, message: BASIC_FORM_MESSAGES.managerLength }]}
              >
                <Input maxLength={20} placeholder="请输入店长姓名" />
              </Form.Item>
            </FormGridItem>

            <FormGridItem span={2} className="sb-basic-form-page__full-row">
              <Form.Item
                label="备注"
                field="description"
                rules={[{ maxLength: 200, message: BASIC_FORM_MESSAGES.descriptionLength }]}
              >
                <Input.TextArea
                  style={{ resize: 'none' }}
                  wrapperStyle={{ width: '100%' }}
                  maxLength={200}
                  showWordLimit
                  autoSize={{ minRows: 3, maxRows: 6 }}
                  placeholder="请输入备注"
                />
              </Form.Item>
            </FormGridItem>

            <FormGridItem span={2} className="sb-basic-form-page__full-row">
              <FormActions>
                <Button disabled={submitting} onClick={handleReset}>重置</Button>
                <Button type="primary" htmlType="submit" loading={submitting}>保存</Button>
              </FormActions>
            </FormGridItem>
          </FormGrid>
        </Form>

        {submitSuccess && (
          <div className="sb-basic-form-page__success" role="status" aria-live="polite">
            门店信息已保存
          </div>
        )}
      </FormPageLayout>
    </div>
  )
}
