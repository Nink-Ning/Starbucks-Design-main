import { Rate } from '@sbux/starbucks-design-react';
import { IconHeartFill } from '@sbux/starbucks-design-react/icon';

export default function Demo() {
  function TextWrapper(props) {
    return (
      <div
        style={{
          width: 24,
          lineHeight: '24px',
          textAlign: 'center',
          fontSize: 16,
          fontWeight: 'bold',
        }}
      >
        {props.text}
      </div>
    );
  }

  return (
    <div>
      <Rate
        style={{ display: 'block', margin: '10px 0' }}
        defaultValue={3}
        character={<TextWrapper text="A" />}
      />
      <Rate
        style={{ display: 'block', margin: '10px 0' }}
        defaultValue={3}
        character={(index) => <TextWrapper text={index + 1} />}
      />
      <Rate
        style={{ display: 'block', margin: '10px 0' }}
        defaultValue={2.5}
        allowHalf
        character={<TextWrapper text="好" />}
      />
      <Rate
        style={{ display: 'block', margin: '10px 0' }}
        defaultValue={2.5}
        allowHalf
        character={
          <TextWrapper
            text={
              <IconHeartFill
                style={{
                  fontSize: 18,
                }}
              />
            }
          />
        }
      />
    </div>
  );
}
