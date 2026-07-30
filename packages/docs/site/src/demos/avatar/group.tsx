import { Avatar } from '@sbux/starbucks-design-react';

export default function Demo() {
  return (
    <div>
      <Avatar.Group size={32} style={{ margin: 10 }}>
        <Avatar style={{ backgroundColor: 'var(--color-primary)' }}>A</Avatar>
        <Avatar style={{ backgroundColor: 'var(--color-success)' }}>B</Avatar>
        <Avatar style={{ backgroundColor: 'var(--color-warning)' }}>C</Avatar>
        <Avatar style={{ backgroundColor: 'var(--color-danger)' }}>Nink</Avatar>
        <Avatar style={{ backgroundColor: 'var(--color-primary-active)' }}>Starbucks</Avatar>
      </Avatar.Group>
      <br />
      <Avatar.Group size={24} style={{ margin: 10 }}>
        <Avatar style={{ backgroundColor: 'var(--color-primary)' }}>A</Avatar>
        <Avatar style={{ backgroundColor: 'var(--color-success)' }}>B</Avatar>
        <Avatar style={{ backgroundColor: 'var(--color-warning)' }}>C</Avatar>
        <Avatar style={{ backgroundColor: 'var(--color-danger)' }}>Nink</Avatar>
        <Avatar style={{ backgroundColor: 'var(--color-primary-active)' }}>Starbucks</Avatar>
      </Avatar.Group>
    </div>
  );
}
