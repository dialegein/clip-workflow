import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ConfigProvider } from 'antd'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          // colorPrimary: '#08979c'
        }
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)
