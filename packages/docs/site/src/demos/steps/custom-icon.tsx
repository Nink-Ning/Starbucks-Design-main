import { Steps } from '@sbux/starbucks-design-react';
import { IconHome, IconLoading, IconThumbUp } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  return (
    <Steps current={2}>
      <Steps.Step icon={<IconHome />} title="Succeeded" description="This is a description" />
      <Steps.Step icon={<IconLoading />} title="Processing" description="This is a description" />
      <Steps.Step icon={<IconThumbUp />} title="Pending" description="This is a description" />
    </Steps>
  );
}
