import React, { useState } from 'react'
import './style.css'
import { useEffect } from 'react';

const Todo = () => {
    const [task, setTask] = useState("")
    const [allTask, setAllTask] = useState([]);
    const [editid,setEditId] = useState("");
    const [single,setSingle] = useState("");

    useEffect(()=>{
        setTask(single.task)
    },[single]);

    const hendelSubmit = (event) => {
        event.preventDefault();
        if(!task){
            alert("please enter a task");
            return false;
        }
        let exist = allTask.find((f => f.task==task))

    if(exist){
        alert("task already exist");
        return false;
    }
        let obj = {
            userid: Date.now(),
            task,
            status: "pending"
        }
        if(editid){
          
          obj.userid = editid;

        }else{         
        let NewRecord = ([...allTask, obj])
        setAllTask(NewRecord);
        alert("task Add")
        setTask("")
        }
    }
    const CompletTodo = (id) => {
        let UpdetR = allTask.map((item) => {
            if (item.userid == id) {
                item.status = "completed"
            }
            return item
        })
        setAllTask(UpdetR);
        alert("Updeted...")
    }
    const DeletR = (id) => {
        setAllTask(allTask.filter(item => item.userid !== id))
        alert("Delet..")
    }

    const EditR =(id) =>{
        setSingle(allTask.find(val => val.userid == id))
        setEditId(id);

    }

    const UpdateR = (d) =>{
        let UpdetR = allTask.map((item) => {
            if (item.userid == editid) {
                item.task = d.task
            }
            return item;
        })
        setAllTask(UpdetR);
        setEditId("")
        alert("Updeted...")


    }

    return (
        <div align="center" className='todo'>
            <h1>ToDo -list</h1>
            <form onSubmit={hendelSubmit} className='p-4 w-100'>
              
                Task : <input type="text" onChange={(e) => setTask(e.target.value)} value={task}  />
                <input type='submit' className='submit ms-3 bg-success text-white' />
            </form>

            <h1 className='pt-3'>List</h1>
            <table className="table table-primary table-striped" border={1}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Task</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                        allTask.map((i) => {
                            const { userid, task, status } = i
                            return (
                                <tr key={userid}>
                                    <td>{userid}</td>
                                    <td>{task}</td>
                                    <td>{status}</td>
                                    <td>
                                        <button className='comp' disabled={status == "completed"} onClick={() => CompletTodo(userid)}>complete</button>
                                        <button onClick={() => DeletR(userid)}>Delet</button>
                                        <button className='bg-primary' onClick={() => EditR(userid)}>Edit</button >
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
           
        </div>
    )
}

export default Todo
