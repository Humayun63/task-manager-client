import React from 'react';

const SingleTask = ({ task, handleDelete }) => {
    const {_id, title, description, status } = task || {}
    return (
        <div className="card bg-base-100 shadow-xl border">
            <div className="card-body">
                <h2 className="card-title text-justify">{title}</h2>
                <p>{description}</p>
                <div>
                    <button className={`btn-xs text-white rounded-md ${status === 'Approved' ? 'bg-green-400' : status === 'Pending' ? 'bg-gray-400' : 'bg-red-400'}`}>{status}</button>
                </div>
                <div>
                    <hr />
                    <button className="mt-4 rounded-md py-2 px-4 bg-yellow-400 me-4">Edit</button>
                    <button className="rounded-md py-2 px-4 bg-red-400" onClick={() => handleDelete(_id)}>Delete</button>
                </div>
            </div>
        </div>

    );
};

export default SingleTask;