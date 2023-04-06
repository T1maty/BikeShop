import ReactDOM from 'react-dom/client'
// import './app/_App.css'
import {App} from './app/App'
import 'shared/config/i18n/i18n'
import {ThemeProvider} from "./app/providers/ThemeProvider"

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <ThemeProvider>
        <App/>
    </ThemeProvider>
)

