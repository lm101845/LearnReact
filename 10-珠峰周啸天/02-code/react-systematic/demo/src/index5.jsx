import React from 'react';
import ReactDOM from 'react-dom/client';
import Dialog from '@/components/Dialog'
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>
        <Dialog title="友情提示" content="大家出门做好个人防护!"/>
        <Dialog content="我们一定要好好学习React!">
            <button>确定</button>
            <button>一定</button>
        </Dialog>
    </>
)
