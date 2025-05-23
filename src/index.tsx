import ReactDOM from 'react-dom/client';
import '@ant-design/v5-patch-for-react-19';
import AppRoute from '@/routes';
import '@/assets/reset.less';
import './index.css';

const rootEl: any = document.getElementById('root');
const root = ReactDOM.createRoot(rootEl);
root.render(<AppRoute />);
