import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';

const App = () => {
  return (
    <>
      <h1 className='text-center my-8 text-2xl md:text-4xl font-medium'>Welcome to <span className='text-green-600'>Task Manager</span></h1>
      <div className='new-task' onClick={() => window.my_modal_1.showModal()}>
        <FaPlusCircle className='text-6xl mx-auto my-4'></FaPlusCircle>
        <h1>New Task</h1>
      </div>



      {/* Modal */}
      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box w-11/12 max-w-5xl">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text text-xl font-bold">Task Title</span>
            </label>
            <input type="text" placeholder="Task title" className="input input-bordered w-full" />
          </div>
          <div className="form-control my-4">
            <label className="label">
              <span className="text-xl font-bold label-text">Task Description</span>
            </label>
            <textarea className="textarea textarea-bordered text-lg h-36" placeholder="Task Description"></textarea>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text text-xl font-bold">Task Status</span>
            </label>
            <select className="select select-bordered">
              <option disabled selected>Select One</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Denied</option>
            </select>
          </div>
          <div>
            <input type="submit" value="Add"  className="cursor-pointer px-6 text-xl py-2 rounded-md my-4 text-white bg-green-500"/>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default App;