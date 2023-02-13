import ReactDOM from 'react-dom/client';
import './app/index.css';
// import './app/_index.scss';
import App from './app';
import 'shared/config/i18n/i18n';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App/>);
