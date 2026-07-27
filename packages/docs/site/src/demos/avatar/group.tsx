import { Avatar } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Avatar.Group size={32} style={{ margin: 10 }}>
        <Avatar style={{ backgroundColor: '#7BC616' }}>A</Avatar>
        <Avatar style={{ backgroundColor: '#14C9C9' }}>B</Avatar>
        <Avatar style={{ backgroundColor: '#168CFF' }}>C</Avatar>
        <Avatar style={{ backgroundColor: '#FF7D00' }}>Arco</Avatar>
        <Avatar style={{ backgroundColor: '#FFC72E' }}>Design</Avatar>
      </Avatar.Group>
      <br />
      <Avatar.Group size={24} style={{ margin: 10 }}>
        <Avatar style={{ backgroundColor: '#7BC616' }}>A</Avatar>
        <Avatar style={{ backgroundColor: '#14C9C9' }}>B</Avatar>
        <Avatar style={{ backgroundColor: '#168CFF' }}>C</Avatar>
        <Avatar style={{ backgroundColor: '#FF7D00' }}>Arco</Avatar>
        <Avatar style={{ backgroundColor: '#FFC72E' }}>Design</Avatar>
      </Avatar.Group>
    </div>
  );
}
