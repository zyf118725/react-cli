import ReactDOM from 'react-dom/client';
import AppRoute from '@/routes/AppRoute';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  // root.render(<App />);
  root.render(<AppRoute />);
}