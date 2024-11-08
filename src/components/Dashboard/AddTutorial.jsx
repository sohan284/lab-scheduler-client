import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import baseUrl from '../../api/apiConfig';
import axios from 'axios';

const AddTutorial = () => {
    const [showForm, setShowForm] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
let id;
    const onSubmit = async (data) => {
        try {
            if (isEdit) {
                await axios.put(`${baseUrl.tutorials}/${id}`, data);
                setIsEdit(false);
            } else {
                await axios.post(`${baseUrl.tutorials}`, data);
            }
            setShowForm(false);
            reset();
        } catch (error) {
            console.log('Error in submitting tutorials data', error);
        }
    };
    return (
        <div>
            <div className='flex justify-between items-center '>
                <div className='relative'>
                    <input
                        type="text"
                        placeholder='Search tutorials...'
                        className='md:w-96 py-1.5 pl-10 border border-zinc-300 rounded-md focus:outline-none focus:border-orange-400'
                    // value={searchQuery}
                    // onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <FaSearch className='absolute top-3 left-3 text-zinc-400' />
                </div>
                <button
                    onClick={() => {
                        setShowForm(true);
                        setIsEdit(false);
                        reset();
                    }}
                    className='p-bg px-2 py-2 flex items-center gap-2 text-white rounded font-bold'
                >
                    Add Tutorial
                    <FaPlus />
                </button>
            </div>
            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/10 z-50">
                    <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6 animation relative">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                            {isEdit ? 'Edit Tutorial Details' : 'Add Tutorial'}
                        </h2>
                        <button onClick={() => setShowForm(false)} className='absolute top-5 right-5 text-xl p-bg p-1 rounded-full text-white'>
                            <IoClose />
                        </button>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-0 grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className='col-span-2'>
                                <label className="block mb-2 text-gray-700 ">Title of Tutorial</label>
                                <input
                                    type="text"
                                    {...register("title", { required: "Tutorial name is required" })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                                />
                                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                            </div>
                            <div className='col-span-2'>
                                <label className="block mb-2 text-gray-700 ">Youtube Iframe URL</label>
                                <input
                                    type="text"
                                    {...register("url", { required: "Tutorial url is required" })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                                />
                                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                            </div>
                            <button
                                type="submit"
                                className="md:col-span-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition duration-300"
                            >
                                {isEdit ? 'Update' : 'Add Tutorial'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div>
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto my-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Video titles</h3>
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                        {/* <div dangerouslySetInnerHTML={{ __html: video.url }} /> */}
                    </div>
                    <div className="flex justify-between">
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Update
                        </button>
                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTutorial;