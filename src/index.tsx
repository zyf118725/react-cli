import ReactDOM from 'react-dom/client';
import AppRoute from '@/routes/AppRoute';
import '@/assets/reset.less';
import './index.css';
const rootEl: any = document.getElementById('root');
const root = ReactDOM.createRoot(rootEl);
root.render(<AppRoute />);
