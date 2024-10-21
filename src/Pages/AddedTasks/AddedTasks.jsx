import React from 'react';

const AddedTasks = () => {
    return (
        <div className='px-4 py-10'>
            <h1 className='md:text-xl font-bold uppercase mb-6 '>Scheduled Tasks</h1>
            <div className='flex justify-between'>
                <div className="w-1/2">
                    <h1 className=' py-2 px-10'>Task Name </h1>
                    <h1 className='bg-zinc-200 py-2 px-10'>Estimated time required to finish the task</h1>
                    <h1 className=' py-2 px-10'>Available time slot</h1>
                    <h1 className='bg-zinc-200 py-2 px-10'>This machine requires faculty permission/ availability.</h1>
                    <h1 className=' py-2 px-10'>Tutorial</h1>
                    <h1 className='bg-zinc-200 py-2 px-10'>Share</h1>
                </div>
                <div className='w-1/2'>
                    <p className=' py-2 px-10'>1040</p>
                    <p className='bg-zinc-200 py-2 px-10'>1040</p>
                    <p className=' py-2 px-10'>1040</p>
                    <p className='bg-zinc-200 py-2 px-10'>1040</p>
                    <p className=' py-2 px-10'>1040</p>
                    <p className='bg-zinc-200 py-2 px-10'>1040</p>
                </div>
            </div>
        </div>
    );
};

export default AddedTasks;