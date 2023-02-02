'use client';

import { Provider, useStore } from 'react-redux';

// Normal initialisation Redux on client side
const reduxStore = useStore();

export default function StoreProvider({ children }) {
  return (
    <Provider store={reduxStore}>
      {children}
    </Provider>
  );
}