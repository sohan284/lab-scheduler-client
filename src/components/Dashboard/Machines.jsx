import axios from 'axios';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { FaMinus, FaPen, FaPlus, FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import baseUrl from '../../api/apiConfig';
import { useQuery } from '@tanstack/react-query';
import { Button, CircularProgress, Dialog, DialogActions, DialogTitle } from '@mui/material';
import AuthToken from '../../utils/AuthToken';

const Machines = () => {
    const token = AuthToken()
    const [showForm, setShowForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [id, setId] = useState(null);
    const [open, setOpen] = useState(false);

    const { register, handleSubmit, reset, control, setValue, formState: { errors } } = useForm();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "tutorials"  // Array to store multiple tutorial URLs
    });

    const { isLoading, data = [], refetch } = useQuery({
        queryKey: ['userOrders'],
        queryFn: async () => {
            const response = await axios.get(`${baseUrl.machines}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Add the bearer token here
                }
            });
            return response.data.data;
        },
    });

    const filteredMachines = data.filter(machine =>
        machine.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleClickOpen = (machineId) => {
        setOpen(true);
        setId(machineId);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = async (formData) => {
        try {
            if (isEdit) {
                await axios.put(`${baseUrl.machines}/${id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add the bearer token here
                    }
                });
                setIsEdit(false);
            } else {
                await axios.post(`${baseUrl.machines}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add the bearer token here
                    }
                });
            }
            refetch();
            setShowForm(false);
            reset();
        } catch (error) {
            console.error('Error in submitting machine data:', error);
        }
    };


    const handleRemoveMachine = async (machineId) => {
        try {
            await axios.delete(`${baseUrl.machines}/${machineId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Add the bearer token here
                }
            });
            handleClose();
            refetch();
        } catch (error) {
            console.error('Error in deleting machine:', error);
        }
    };

    const handleEditMachine = (machine) => {
        setId(machine._id);
        setIsEdit(true);
        setShowForm(true);
        setValue('title', machine.title);
        setValue('author', machine.author);
        setValue('tutorials', machine.tutorials || []);
    };


    return (
        <div>
            <div className='flex justify-between items-center '>
                <div className='relative'>
                    <input
                        type="text"
                        placeholder='Search Machine...'
                        className='md:w-96 py-1.5 pl-10 border border-zinc-300 rounded-md focus:outline-none focus:border-orange-400'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
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
                    Add Machine
                    <FaPlus />
                </button>
            </div>
            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/10 z-50">
                    <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6 animation relative">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                            {isEdit ? 'Edit Machine Details' : 'Add Machine Details'}
                        </h2>
                        <button onClick={() => setShowForm(false)} className='absolute top-5 right-5 text-xl p-bg p-1 rounded-full text-white'>
                            <IoClose />
                        </button>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-0 grid grid-cols-1 gap-5">
                            <div className=''>
                                <label className="block mb-2 text-gray-700 ">Machine Name</label>
                                <input
                                    type="text"
                                    {...register("title", { required: "Machine name is required" })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                                />
                                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                            </div>

                            <div>
                                <label className="block text-gray-700">Tutorial URLs</label>
                                {fields.map((item, index) => (
                                    <div key={item.id} className="flex items-center gap-2 sp">
                                        <input
                                            type="url"
                                            {...register(`tutorials.${index}.url`, { required: "URL is required" })}
                                            placeholder="Enter tutorial URL"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500 mb-2"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="text-red-500 p-2 hover:bg-red-100 rounded"
                                        >
                                            <FaMinus />
                                        </button>
                                    </div>
                                ))}
                                <button type="button" onClick={() => append({})} className="text-blue-500 mt-2">Add URL</button>
                            </div>

                            <div>
                                <label className="block mb-2 text-gray-700">Author Email</label>
                                <input
                                    type="email"
                                    {...register("author")}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                                />
                                {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
                            </div>

                            {/* <div className="flex items-center gap-5">
                                <label htmlFor="duration" className="block font-medium text-[15px] px-10">
                                    Duration:
                                </label>
                                <select
                                    {...register("duration")}
                                    className="border text-[15px] border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Duration</option>
                                    <option value="15 minutes">15 minutes</option>
                                    <option value="30 minutes">30 minutes</option>
                                    <option value="45 minutes">45 minutes</option>
                                    <option value="1 hour">1 hour</option>
                                    <option value="2 hours">2 hours</option>
                                    <option value="3 hours">3 hours</option>
                                    <option value="4 hours">4 hours</option>
                                    <option value="5 hours">5 hours</option>
                                    <option value="6 hours">6 hours</option>
                                </select>
                                {errors.duration && <p className="text-red-500 text-sm">{errors.duration.message}</p>}
                            </div> */}

                            <button
                                type="submit"
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition duration-300"
                            >
                                {isEdit ? 'Update' : 'Add Machine'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="mt-10 overflow-auto max-w-sm md:max-w-full max-h-[80vh] custom-scroll">
                <table className="min-w-full bg-white border border-gray-300 rounded-md">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">Machine</th>
                            <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">Author Email</th>
                            {/* <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">Duration</th> */}
                            <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMachines.length > 0 ? (
                            filteredMachines.map(machine => (
                                <tr key={machine._id}>
                                    <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">{machine?.title}</td>
                                    <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">{machine?.author}</td>
                                    {/* <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">{machine?.duration}</td> */}
                                    <td className="py-2 px-4 border-b border-gray-300 text-3xl text-white">
                                        <button className='flex gap-6'>
                                            <MdDelete onClick={() => handleClickOpen(machine?._id)} className='text-red-500 border border-red-500 hover:bg-red-200 duration-300 ease-out rounded p-1' />
                                            <FaPen onClick={() => handleEditMachine(machine)} className='text-green-500 border border-green-500 hover:bg-green-200 duration-300 ease-out rounded p-2' />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="py-2 px-4 h-[600px] text-center text-gray-700">
                                    {isLoading ? <CircularProgress /> : "No machines found"}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Machine Deletion"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => handleRemoveMachine(id)}
                        color="error"
                        autoFocus
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Machines;
