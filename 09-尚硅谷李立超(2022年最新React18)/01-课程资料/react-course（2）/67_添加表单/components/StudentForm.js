import React, {useState} from 'react';
import './StudentForm.css';

const StudentForm = () => {
    const [inputData, setInputData] = useState({
        name:'',
        age:'',
        gender:'男',
        address:''
    });

    const nameChangeHandler = (e) => {
        setInputData(prevState => ({...prevState, name: e.target.value}));
    };

    const ageChangeHandler = (e) => {
        setInputData(prevState => ({...prevState, age: e.target.value}));
    };

    const genderChangeHandler = (e) => {
        setInputData(prevState => ({...prevState, gender: e.target.value}));
    };

    const addressChangeHandler = (e) => {
        setInputData(prevState => ({...prevState, address: e.target.value}));
    };

    const submitHandler = () => {
        console.log(inputData);
    }



    return (
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
                >添加</button>
            </td>
        </tr>
    );
};

export default StudentForm;
