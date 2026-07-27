import { Tooltip, Button } from '@sbux/starbucks-design-react';

export default function Demo() {
  const colors = ['#3491FA', '#165DFF', '#722ED1'];

  return (
    <div>
      {colors.map((color) => {
        return (
          <Tooltip key={color} color={color} content="tooltip text">
            <Button
              style={{
                marginRight: 20,
                background: color,
                color: '#fff',
              }}
            >
              {color}
            </Button>
          </Tooltip>
        );
      })}
    </div>
  );
}
