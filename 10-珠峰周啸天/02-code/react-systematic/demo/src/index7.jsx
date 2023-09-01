import React from 'react';
import ReactDOM from 'react-dom/client';
import Vote from '@/components/Vote2'
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>
        <Vote title="React其实还是很好学的!"></Vote>
    </>
)

setTimeout(()=>{
    root.render(
        <>
            <Vote title="我是5秒后传过来的标题"></Vote>
        </>
    )
},5000)
