import ReactDOM from 'react-dom/client';
import Button from './components/Button';

// component
export { default as DesignedIcon } from './Icons';

// lib
export { default as palette } from './lib/palette';
export { default as media } from './lib/media';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<Button type="error" size="m" />);
