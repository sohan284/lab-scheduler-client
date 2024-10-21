import React from 'react';

const AddedTasks = () => {
    return (
        <div className='px-4 py-10'>
            <h1 className='md:text-xl font-bold uppercase mb-6 '>Scheduled Tasks</h1>
            <div className='custom-scroll overflow-auto h-[35rem]'>
                <div className='flex justify-between mb-20'>
                    <div className="w-1/2">
                        <h1 className=' py-4 px-10 font-bold'>Task Name </h1>
                        <h1 className='bg-zinc-50 py-4 px-10 '>Machine </h1>
                        <h1 className='py-4 px-10'>Estimated time required to finish the task</h1>
                        <h1 className='bg-zinc-50 py-4 px-10 font-bold'>Available time slot</h1>
                        <h1 className='py-4 px-10'>This machine requires faculty permission/ availability.</h1>
                        <button className='py-4 px-10 underline underline-offset-4'>Tutorial</button>
                        <button className='block py-4 px-10 underline underline-offset-4'>Share</button>
                    </div>
                    <div className='w-1/2'>
                        <p className=' py-4 px-10'>1040</p>
                        <p className='bg-zinc-50 py-4 px-10'>Sohn flexo machine</p>
                        <p className=' py-4 px-10'>45 minutes</p>
                        <p className='bg-zinc-50 py-4 px-10 font-bold'>Monday, October 14, 9:30AM</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddedTasks;