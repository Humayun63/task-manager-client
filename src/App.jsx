import React, { useEffect, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import Swal from 'sweetalert2'
import SingleTask from './components/SingleTask';
import UpdateTask from './components/UpdateTask';

const App = () => {
  const [allTasks, setAllTasks] = useState([])
  const [isUpdate, setIsUpdate] = useState(false)
  const [selectedTask, setSelectedTask] = useState({})

  useEffect(() => {
    fetch('https://task-manager-server-murex.vercel.app/all-tasks')
      .then(res => res.json())
      .then(data => setAllTasks(data))
      .catch(error => console.log(error))
  }, [])

  const handleAdd = newTask => {
    fetch('https://task-manager-server-murex.vercel.app/tasks/new', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newTask)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data?.insertedId) {
          setAllTasks([newTask, ...allTasks])
          Swal.fire({
            title: 'Success!',
            text: 'Task added to the database!',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        }
      })
  }

  const handleUpdate = (id, newTask) => {
    fetch(`https://task-manager-server-murex.vercel.app/tasks/update/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newTask)
    })
      .then(res => res.json())
      .then(data => {
        if (data?.modifiedCount) {
          Swal.fire({
            title: 'Success!',
            text: 'Your Task has updated',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
          const updatedTasks = allTasks.map(task => (task._id === id ? newTask : task))
          setAllTasks(updatedTasks)
        }
      })

  }

  const handleSubmit = event => {
    window.my_modal_1.close()
    event.preventDefault()
    const form = event.target;
    const title = form.title.value;
    const description = form.description.value;
    const status = form.status.value;

    const newTask = { title, description, status }

    form.reset()

    if (isUpdate) {
      const id = form.id.value;
      console.log(id)
      handleUpdate(id, newTask)
    } else {
      handleAdd(newTask)
    }


  }

  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result?.isConfirmed) {

        fetch(`https://task-manager-server-murex.vercel.app/tasks/delete/${id}`, {
          method: "DELETE"
        })
          .then(res => res.json())
          .then(data => {
            if (parseInt(data?.deletedCount) > 0) {
              Swal.fire(
                'Deleted!',
                'Your task has been deleted.',
                'success'
              )
              const remainingTasks = allTasks.filter(task => task._id !== id);
              setAllTasks(remainingTasks)
            }
          })
          .catch(error => console.log(error));
      }
    })
  }

  const openNewTaskModal = () => {
    setIsUpdate(false)
    window.my_modal_1.showModal()
  }

  const openUpdateModal = id => {
    setIsUpdate(true)
    setSelectedTask(allTasks.find(task => task._id === id))
    console.log(selectedTask);
    window.my_modal_1.showModal()
  }


  return (
    <>
      {/* <UpdateTask></UpdateTask> */}
      <h1 className='text-center my-8 text-2xl md:text-4xl font-medium'>Welcome to <span className='text-green-600'>Task Manager</span></h1>
      {/* Add Task */}
      <div className='new-task' onClick={openNewTaskModal}>
        <FaPlusCircle className='text-6xl mx-auto my-4'></FaPlusCircle>
        <h1>New Task</h1>
      </div>
      <hr />
      <h2 className='text-center my-8 text-2xl md:text-3xl font-semibold'>Your Previous tasks</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {
          allTasks.map(task => <SingleTask
            key={task._id}
            task={task}
            openUpdateModal={openUpdateModal}
            handleDelete={handleDelete}
          ></SingleTask>)
        }
      </div>




      {/* Modal */}
      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box w-11/12 max-w-5xl" onSubmit={handleSubmit}>
          {isUpdate && <>
            <input className='hidden' type="text" name="id" value={selectedTask._id} readOnly />
          </>}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text text-xl font-bold">Task Title</span>
            </label>
            <input type="text" defaultValue={isUpdate ? selectedTask.title : ''} name="title" placeholder="Task title" className="input input-bordered w-full" required />
          </div>
          <div className="form-control my-4">
            <label className="label">
              <span className="text-xl font-bold label-text">Task Description</span>
            </label>
            <textarea defaultValue={isUpdate ? selectedTask.description : ''} className="textarea textarea-bordered text-lg h-36" placeholder="Task Description" name='description' required></textarea>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text text-xl font-bold">Task Status</span>
            </label>
            <select defaultValue={isUpdate ? selectedTask.status : ''} className="select select-bordered" name='status' required>
              <option value={"Pending"} selected>Pending</option>
              <option value={"Approved"}>Approved</option>
              <option value={"Denied"}>Denied</option>
            </select>
          </div>
          <div>
            <input type="submit" value={isUpdate ? 'Update' : 'Add'} className="cursor-pointer px-6 text-xl py-2 rounded-md my-4 text-white bg-green-500" />
          </div>
          <p className='text-gray-400'><small>Type 'ESC' For Cancel</small></p>
        </form>
      </dialog>
    </>
  );
};

export default App;