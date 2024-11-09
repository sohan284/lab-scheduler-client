import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import baseUrl from '../../api/apiConfig';
import axios from 'axios';
import ReactPlayer from 'react-player';

const AddTutorial = () => {
    const [showForm, setShowForm] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const [tutorials, setTutorials] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // New state for search query
    const [id, setId] = useState(null);

    // Fetch all tutorials
    const allTutorials = async () => {
        try {
            const response = await axios.get(`${baseUrl.tutorials}`);
            setTutorials(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        allTutorials();
    }, []);

    // Handle form submission
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
            allTutorials(); // Refresh tutorial list
        } catch (error) {
            console.log('Error in submitting tutorial data', error);
        }
    };

    // Edit a tutorial
    const handleEdit = (tutorial) => {
        setShowForm(true);
        setIsEdit(true);
        setId(tutorial._id); // Set the ID for editing
        setValue("title", tutorial.title);
        setValue("url", tutorial.url);
    };

    // Delete a tutorial
    const handleDelete = async (tutorialId) => {
        try {
            await axios.delete(`${baseUrl.tutorials}/${tutorialId}`);
            allTutorials(); // Refresh the tutorial list
        } catch (error) {
            console.log('Error deleting tutorial', error);
        }
    };

    // Filter tutorials based on search query
    const filteredTutorials = tutorials.filter(tutorial => 
        tutorial.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <div className='flex justify-between items-center'>
                <div className='relative'>
                    <input
                        type="text"
                        placeholder='Search tutorials...'
                        value={searchQuery}  // Bind the searchQuery state
                        onChange={(e) => setSearchQuery(e.target.value)}  // Update the state when the user types
                        className='md:w-96 py-1.5 pl-10 border border-zinc-300 rounded-md focus:outline-none focus:border-orange-400'
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

            {/* Form modal */}
            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/10 z-50">
                    <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6 relative">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                            {isEdit ? 'Edit Tutorial Details' : 'Add Tutorial'}
                        </h2>
                        <button onClick={() => setShowForm(false)} className='absolute top-5 right-5 text-xl p-bg p-1 rounded-full text-white'>
                            <IoClose />
                        </button>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-0 grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className='col-span-2'>
                                <label className="block mb-2 text-gray-700">Title of Tutorial</label>
                                <input
                                    type="text"
                                    {...register("title", { required: "Tutorial name is required" })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                                />
                                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                            </div>
                            <div className='col-span-2'>
                                <label className="block mb-2 text-gray-700">Youtube Share URL</label>
                                <input
                                    type="text"
                                    {...register("url", { required: "Tutorial URL is required" })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                                />
                                {errors.url && <p className="text-red-500 text-sm">{errors.url.message}</p>}
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

            {/* Tutorial List */}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {filteredTutorials.map(item => (
                    <div key={item._id} className='bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 p-4'>
                        <div className="text-sm font-semibold text-gray-700 mb-3">
                            {item.title}
                        </div>
                        <div className="relative rounded-lg overflow-hidden">
                            <ReactPlayer
                                url={item.url}
                                width="100%"
                                height="200px"
                                controls={false}
                                light={true}
                                className="rounded-lg"
                            />
                        </div>
                        <div className="flex justify-between mt-3">
                            <button
                                onClick={() => handleEdit(item)}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => handleDelete(item._id)}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddTutorial;
