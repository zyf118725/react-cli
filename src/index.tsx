import ReactDOM from 'react-dom/client';
import AppRoute from '@/routes/AppRoute';
import '@/assets/reset.less';
import ErrorBoundary from '@/components/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ErrorBoundary>
    < AppRoute />
  </ErrorBoundary>
);
