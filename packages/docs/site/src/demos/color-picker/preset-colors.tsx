import { useState } from 'react';
import { ColorPicker } from '@sbux/starbucks-design-react';

export default function Demo() {
  const [color, setColor] = useState('#165DFF');
  const [history, setHistory] = useState([]);

  const addHistory = (visible) => {
    if (!visible) {
      const newHistory = [...history.slice(-10), color];
      setHistory(newHistory);
    }
  };

  return (
    <div>
      <div>Preset: </div>
      <ColorPicker defaultValue={'#165DFF'} showPreset showText />
      <div style={{ marginTop: 10 }} />
      <div>History & Preset: </div>
      <ColorPicker
        value={color}
        historyColors={history}
        showPreset
        showHistory
        showText
        onChange={setColor}
        onVisibleChange={addHistory}
      />
    </div>
  );
}
