import { Provider } from 'react-redux'
import { store } from './index'
import { persistStore } from 'redux-persist'
import React from 'react'

persistStore(store)

export default function ReduxProvider({
  children
}: {
  children: React.ReactNode
}) {
  return <Provider store={store}>{children}</Provider>
}
