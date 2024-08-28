import Home from '@/pages/Home';
import { testfn } from '@/utils';

function App() {
  const a = 1;
  return (
    <div className='page'>
      我是react-App3
      <Home />
      <button onClick={testfn}>testfn</button>

    </div>
  );
}
export default App;
