import React, {useCallback, useContext, useState} from 'react';
import StuContext from "../store/StuContext";
import StudentForm from "./StudentForm";

const Student = (props) => {
    // {stu:{name, age, gender, address}} = props
    // props {stu:{id:xxx, attributes:{name:xxx, age:xxx}}}
    // {stu:{id, attributes:{name, age, gender, address}}}
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    const ctx = useContext(StuContext);

    const delStu = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch(`http://localhost:1337/api/students/${props.stu.id}`, {
                method: 'delete'
            });

            // 判断是否成功
            if (!res.ok) {
                throw new Error('删除失败！');
            }

            // const data = await res.json(); // 被删除的学生
            // 修改成功后，需要触发列表刷新
            ctx.fetchData();
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }

    }, []);


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
