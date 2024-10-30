import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPen, FaPlus, FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import baseUrl from '../../api/apiConfig';
import { useQuery } from '@tanstack/react-query';
import { Button, CircularProgress, Dialog, DialogActions, DialogTitle } from '@mui/material';

const Machines = () => {
    const [showForm, setShowForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isEdit, setIsEdit] = useState(false); 
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);

    const handleClickOpen = (id) => {
        setOpen(true);
        setId(id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { isLoading, isError, data = [], error, refetch } = useQuery({
        queryKey: ['userOrders'],
        queryFn: async () => {
            const response = await axios.get(`${baseUrl.machines}`);
            return response.data.data;
        },
    });

    const filteredMachines = data.filter(machine =>
        machine.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const onSubmit = async (data) => {
        try {
            if (isEdit) {
                await axios.put(`${baseUrl.machines}/${id}`, data);
                setIsEdit(false);
            } else {
                await axios.post(`${baseUrl.machines}`, data);
            }
            refetch();
            setShowForm(false);
            reset();
        } catch (error) {
            console.log('Error in submitting machine data', error);
        }
    };

    const handleRemoveMachine = async (id) => {
        try {
            await axios.delete(`${baseUrl.machines}/${id}`);
            handleClose();
            refetch();
        } catch (error) {
            console.log('Error in deleting machine', error);
        }
    };

    const handleEditMachine = (machine) => {
        setId(machine._id);
        setIsEdit(true);
        setShowForm(true);
        setValue('title', machine.title); 
        setValue('tutorial', machine.tutorial);
        setValue('author', machine.author);
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
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-0 grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className='col-span-2'>
                                <label className="block mb-2 text-gray-700 ">Machine Name</label>
                                <input
                                    type="text"
                                    {...register("title", { required: "Machine name is required" })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                                />
                                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                            </div>
                            <div>
                                <label className="block mb-2 text-gray-700">Tutorial URL</label>
                                <input
                                    type="url"
                                    {...register("tutorial", { required: "Tutorial URL is required" })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                                />
                                {errors.tutorial && <p className="text-red-500 text-sm">{errors.tutorial.message}</p>}
                            </div>

                            <div>
                                <label className="block mb-2 text-gray-700">Author Email</label>
                                <input
                                    type="email"
                                    {...register("author", { required: "Author email is required" })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                                />
                                {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
                            </div>
                            <button
                                type="submit"
                                className="md:col-span-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition duration-300"
                            >
                                {isEdit ? 'Update' : 'Add Machine'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="mt-10 overflow-auto max-w-sm md:max-w-full max-h-[80vh]">
                <table className="min-w-full bg-white border border-gray-300 rounded-md">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">Machine</th>
                            <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">Author Email</th>
                            <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMachines.length > 0 ? (
                            filteredMachines.map(machine => (
                                <tr key={machine._id}>
                                    <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">{machine?.title}</td>
                                    <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">{machine?.author}</td>
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
                            <td colSpan="3" className="py-2 px-4 h-[600px] text-center text-gray-700">
                  {isLoading ? <CircularProgress/> : "No machines found"}
                </td> </tr>
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
