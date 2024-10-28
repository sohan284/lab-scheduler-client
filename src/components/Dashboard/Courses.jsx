import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';

const Courses = () => {
    const [showForm, setShowForm] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        try {
            const resposne = await axios.post(`${baseUrl.courses}`,data)
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div>
            <div>
                <div className='flex justify-between items-center '>
                    <div className='relative'>
                    </div>
                    <button
                        onClick={() => {
                            setShowForm(true);
                            setIsEdit(false);
                            reset();
                        }}
                        className='p-bg px-2 py-2 flex items-center gap-2 text-white rounded font-bold'
                    >
                        Course
                        <FaPlus />
                    </button>
                </div>
                {
                    showForm && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/10 z-50">
                            <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6 animation relative">
                                <button onClick={() => setShowForm(false)} className='absolute top-5 right-5 text-xl p-bg p-1 rounded-full text-white'>
                                    <IoClose />
                                </button>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-0 grid grid-cols-1 md:grid-cols-2 gap-5 my-5">
                                    <div className='col-span-2'>
                                        <label className="block mb-2 text-gray-700 ">Cource Name</label>
                                        <input
                                            type="text"
                                            {...register("title", { required: "Machine name is required" })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                                        />
                                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                                    </div>
                                    <button
                                        type="submit"
                                        className="md:col-span-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition duration-300"
                                    >
                                        Add Course
                                    </button>
                                </form>
                            </div>
                        </div>
                    )
                }
                <ul className='mt-10 grid md:grid-cols-5 xl:grid-cols-6 gap-5'>
                    <li className='flex justify-between items-center bg-zinc-400 text-white font-bold px-4 py-1.5 rounded-md'>GCS-5456
                        <button className='text-xl text-red-500'>
                            <MdDelete />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Courses;