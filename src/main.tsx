import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { scan } from 'react-scan';
import Auth from './components/layout/auth';
import './index.css';

scan({
	enabled: true,
});
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Auth />
	</StrictMode>,
);
