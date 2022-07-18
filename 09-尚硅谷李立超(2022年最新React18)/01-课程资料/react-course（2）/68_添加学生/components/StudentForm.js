import React, {useCallback, useContext, useState} from 'react';
import './StudentForm.css';
import StuContext from "../store/StuContext";

const StudentForm = () => {
    const [inputData, setInputData] = useState({
        name: '',
        age: '',
        gender: '男',
        address: ''
    });

    const ctx = useContext(StuContext);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    // 创建一个添加学生的方法
    const addStudent = useCallback(async (newStu)=>{

        try{
            setLoading(true);
            setError(null);
            //http://localhost:1337/api/students
            const res = await fetch('http://localhost:1337/api/students', {
                method:'post',
                body:JSON.stringify({data:newStu}),
                headers:{
                    "Content-type":"application/json"
                }
            });

            if(!res.ok){
                throw new Error('添加失败！');
            }

            // 添加成功，刷新列表
            ctx.fetchData();
        }catch (e){
            console.log(e);
            setError(e);
        }finally {
            setLoading(false);
        }

    }, []);

    const nameChangeHandler = (e) => {
        setInputData(prevState => ({...prevState, name: e.target.value}));
    };

    const ageChangeHandler = (e) => {
        setInputData(prevState => ({...prevState, age: +e.target.value}));
    };

    const genderChangeHandler = (e) => {
        setInputData(prevState => ({...prevState, gender: e.target.value}));
    };

    const addressChangeHandler = (e) => {
        setInputData(prevState => ({...prevState, address: e.target.value}));
    };

    const submitHandler = () => {
        //console.log(inputData);
        addStudent(inputData);
    };


    return (
        <>
        <tr className="student-form">
            <td><input
                onChange={nameChangeHandler}
                value={inputData.name}
                type="text"/></td>
            <td>
                <select
                    onChange={genderChangeHandler}
                    value={inputData.gender}
                >
                    <option value="男">男</option>
                    <option value="女">女</option>
                </select>
            </td>
            <td><input
                onChange={ageChangeHandler}
                value={inputData.age}
                type="text"/></td>
            <td><input
                onChange={addressChangeHandler}
                value={inputData.address}
                type="text"/></td>
            <td>
                <button
                    onClick={submitHandler}
                >添加
                </button>
            </td>
        </tr>
            {loading && <tr><td colSpan={5}>添加中...</td></tr>}
            {error && <tr><td colSpan={5}>添加失败</td></tr>}
        </>

    );
};

export default StudentForm;
