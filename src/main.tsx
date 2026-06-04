import { App } from '@/app';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { store } from '@/app/store';
import { Provider } from 'react-redux';

import '@app/styles/style.scss';

const rootElement = document.querySelector('#root');

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  );
} else {
  console.error('Failed to find the root element in index.html');
}
