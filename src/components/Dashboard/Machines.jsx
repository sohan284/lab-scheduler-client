import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';

const Machines = () => {
    const [showForm, setShowForm] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        
    };

    return (
        <div>
            <div className='flex justify-between'>
                <h1>Machines</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className='p-bg px-2 py-2 flex items-center gap-2 text-white rounded font-bold'
                >
                    Add Machine
                    <FaPlus />
                </button>
            </div>


            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/10 z-50">
                    <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6 animation relative">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Add Machine Details</h2>
                        <button onClick={() => setShowForm(false)} className='absolute top-5 right-5 text-xl p-bg p-1 rounded-full text-white'>
                            <IoClose />
                        </button>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-0 grid grid-cols-1 md:grid-cols-2 gap-5">

                            {/* Machine Name */}
                            <div className='col-span-2'>
                                <label className="block mb-2 text-gray-700 ">Machine Name</label>
                                <input
                                    type="text"
                                    {...register("machineName", { required: "Machine name is required" })}
                                    className=" w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                                />
                                {errors.machineName && <p className="text-red-500 text-sm">{errors.machineName.message}</p>}
                            </div>
                            {/* Tutorial URL */}
                            <div>
                                <label className="block mb-2 text-gray-700">Tutorial URL</label>
                                <input
                                    type="url"
                                    {...register("tutorialUrl", { required: "Tutorial URL is required" })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                                />
                                {errors.tutorialUrl && <p className="text-red-500 text-sm">{errors.tutorialUrl.message}</p>}
                            </div>

                            {/* Author */}
                            <div>
                                <label className="block mb-2 text-gray-700">Author Email</label>
                                <input
                                    type="email"
                                    {...register("author", { required: "Author email is required" })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                                />
                                {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="md:col-span-2  w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition duration-300"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}


            <div className="mt-10 overflow-auto max-w-sm md:max-w-full">
                <table className="min-w-full bg-white border border-gray-300 rounded-md">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">Machine</th>
                            <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">Author Email</th>
                            <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">Approval Status</th>
                            <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">Bg-indigo</td>
                            <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">nafizalturabi@gmail.com</td>
                            <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800 capitalize">need</td>
                            <td className="py-2 px-4 border-b border-gray-300  text-3xl  text-white "><button>
                                <MdDelete className='bg-red-400 border border-red-500 hover:bg-red-500 duration-300 ease-out rounded p-1' />
                            </button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Machines;
