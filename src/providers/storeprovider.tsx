'use client';

import { Provider, useStore } from 'react-redux';

export default function StoreProvider({ children }) {
  // Normal initialisation Redux on client side
  const reduxStore = useStore();

  return (
    <Provider store={reduxStore}>
      {children}
    </Provider>
  );
}