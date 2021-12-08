import { useRoutes } from 'react-router-dom';

import './App.css';
import routes from './Routes';

function App() {
  const content = useRoutes(routes);

  return (
    <div>
      {content}
    </div>
  )
}

export default App
