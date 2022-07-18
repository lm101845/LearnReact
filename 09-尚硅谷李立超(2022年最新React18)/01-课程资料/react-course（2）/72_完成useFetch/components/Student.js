import React, {useCallback, useContext, useState} from 'react';
import StuContext from "../store/StuContext";
import StudentForm from "./StudentForm";
import useFetch from "../hooks/useFetch";

const Student = (props) => {
    // {stu:{name, age, gender, address}} = props
    // props {stu:{id:xxx, attributes:{name:xxx, age:xxx}}}
    // {stu:{id, attributes:{name, age, gender, address}}}
    const [isEdit, setIsEdit] = useState(false);


    const ctx = useContext(StuContext);

    const {loading, error, fetchData:delStu} = useFetch({
        url:`students/${props.stu.id}`,
        method:'delete'
    }, ctx.fetchData);

    const deleteHandler = () => {
        // 删除学生
        // http://localhost:1337/api/students/4
        // props.stu.id
        delStu();

    };

    const cancelEdit = () => {
        setIsEdit(false);
    };

    return (
        <>
            {!isEdit &&
                <tr>
                    <td>{props.stu.attributes.name}</td>
                    <td>{props.stu.attributes.gender}</td>
                    <td>{props.stu.attributes.age}</td>
                    <td>{props.stu.attributes.address}</td>
                    <td>
                        <button onClick={deleteHandler}>删除</button>
                        <button onClick={() => setIsEdit(true)}>修改</button>

                    </td>
                </tr>
            }

            {isEdit && <StudentForm stu={props.stu} onCancel={cancelEdit}/>}

            {loading && <tr>
                <td colSpan={5}>正在删除数据...</td>
            </tr>}
            {error && <tr>
                <td colSpan={5}>删除失败...</td>
            </tr>}
        </>

    );
};

export default Student;
