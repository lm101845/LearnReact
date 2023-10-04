import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.tsx'
import '@/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/*严格模式只在开发环境有效，打印2次，确保是纯函数(打印2次结果要一样才确保是纯函数)*/}
    <App />
  </React.StrictMode>,
)
