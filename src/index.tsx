import ReactDOM from 'react-dom/client';
import AppRoute from '@/routes/AppRoute';
import '@/assets/reset.less';
import './index.css';
const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(<AppRoute />);
}
