import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import Swal from 'sweetalert2'

const App = () => {

  const handleSubmit = event => {
    window.my_modal_1.close()
    event.preventDefault()
    const form = event.target;
    const title = form.title.value;
    const description = form.description.value;
    const status = form.status.value;

    const newStatus = { title, description, status }

    fetch('https://task-manager-server-murex.vercel.app/tasks/new', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newStatus)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        form.reset()
        if (data?.insertedId) {
          Swal.fire({
            title: 'Success!',
            text: 'Task added to the database!',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        }
      })
  }

  return (
    <>
      <h1 className='text-center my-8 text-2xl md:text-4xl font-medium'>Welcome to <span className='text-green-600'>Task Manager</span></h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

        <div className="card bg-base-100 shadow-xl border">
          <div className="card-body">
            <h2 className="card-title text-justify">This is my Task Title</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla eum esse qui perspiciatis accusantium adipisci repellendus, atque deserunt quo dolorem soluta alias doloremque voluptatem ullam dicta officia labore ad aspernatur suscipit amet. Excepturi omnis illo, numquam officiis recusandae voluptate natus ex, fugiat mollitia eaque qui. Id maiores ab quisquam provident consequatur. Dolorem quia tenetur excepturi labore expedita vel cupiditate porro corrupti, repellendus a! Nulla numquam tempora quis animi, modi totam odit molestias saepe error, porro, tenetur dolorem. Fuga, laudantium beatae! Voluptate neque expedita libero doloremque voluptatibus magnam vel architecto placeat aut, est eius molestiae quos. Unde natus possimus earum odit.</p>
            <div>
              <button className="btn-xs rounded-md bg-green-600">Approved</button>
            </div>
            <div>
              <hr />
              <button className="mt-4 rounded-md py-2 px-4 bg-yellow-400 me-4">Edit</button>
              <button className="rounded-md py-2 px-4 bg-red-400">Delete</button>
            </div>
          </div>
        </div>


      </div>
      <div className='new-task' onClick={() => window.my_modal_1.showModal()}>
        <FaPlusCircle className='text-6xl mx-auto my-4'></FaPlusCircle>
        <h1>New Task</h1>
      </div>



      {/* Modal */}
      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box w-11/12 max-w-5xl" onSubmit={handleSubmit}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text text-xl font-bold">Task Title</span>
            </label>
            <input type="text" name="title" placeholder="Task title" className="input input-bordered w-full" required />
          </div>
          <div className="form-control my-4">
            <label className="label">
              <span className="text-xl font-bold label-text">Task Description</span>
            </label>
            <textarea className="textarea textarea-bordered text-lg h-36" placeholder="Task Description" name='description' required></textarea>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text text-xl font-bold">Task Status</span>
            </label>
            <select className="select select-bordered" name='status' required>
              <option value={"Pending"} selected>Pending</option>
              <option value={"Approved"}>Approved</option>
              <option value={"Denied"}>Denied</option>
            </select>
          </div>
          <div>
            <input type="submit" value="Add" className="cursor-pointer px-6 text-xl py-2 rounded-md my-4 text-white bg-green-500" />
          </div>
        </form>
      </dialog>
    </>
  );
};

export default App;