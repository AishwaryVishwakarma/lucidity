import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store';

// Provides the Redux store to the application.

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
