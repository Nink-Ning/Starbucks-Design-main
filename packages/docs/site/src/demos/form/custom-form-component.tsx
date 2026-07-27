import { useRef, useState } from 'react';
import { Form, Input, Select, Typography } from '@sbux/starbucks-design-react';

export default function Demo() {
  const formRef = useRef();
  const [values, setValues] = useState({});

  function CustomInput(props) {
    const value = props.value || {};

    const handleChange = (newValue) => {
      props.onChange && props.onChange(newValue);
    };

    return (
      <Input
        value={value.input}
        onChange={(v) => {
          handleChange({ ...value, input: v });
        }}
        addBefore={
          <Select // select component has defined error style
            error={props.error}
            placeholder="Please select ..."
            style={{ width: 100 }}
            value={value.select}
            options={['aaa', 'bbb']}
            onChange={(v) => {
              handleChange({ ...value, select: v });
            }}
          />
        }
      />
    );
  }

  return (
    <div>
      <Form ref={formRef} style={{ maxWidth: 650 }} autoComplete="off" onValuesChange={(_, v) => setValues(v)}>
        <Form.Item
          rules={[
            {
              required: true,
            },
            {
              validator: (val, cb) => {
                console.log(val);

                if (val.select !== 'bbb') {
                  cb('Please select bbb');
                }

                cb();
              },
            },
          ]}
          label="Custom"
          field="customInput"
        >
          <CustomInput />
        </Form.Item>
      </Form>
      <Typography.Paragraph>
        <p>Form Data:</p>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </Typography.Paragraph>
    </div>
  );
}
