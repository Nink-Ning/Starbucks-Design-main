import { Image, Space } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <Space size={20}>
      <Image width={400} height={300} src="some-error.png" alt="some-error" />
      <Image
        width={400}
        height={300}
        src="some-error.png"
        alt="This is a picture of humans eating ice cream. The humans on the screen are very happy just now. The ice cream is green, it seems to be flavored with matcha. The gender of the human is unknown. It has very long hair and the human hair is brown."
      />
    </Space>
  );
}
