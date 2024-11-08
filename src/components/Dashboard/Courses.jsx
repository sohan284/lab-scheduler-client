import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaPen, FaPlus, FaSearch } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import baseUrl from '../../api/apiConfig';
import { useQuery } from '@tanstack/react-query';
import { Button, CircularProgress, Dialog, DialogActions, DialogTitle } from '@mui/material';

const Courses = () => {
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

    // Retrieve the token
    const token = localStorage.getItem('token'); // Adjust if your token is stored differently

    const { isLoading, data = [], refetch } = useQuery({
        queryKey: ['userOrders'],
        queryFn: async () => {
            const response = await axios.get(`${baseUrl.courses}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Add the bearer token here
                },
            });
            return response.data.data;
        },
    });

    const filteredCourses = data.filter(course =>
        course.course?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const onSubmit = async (data) => {
        try {
            if (isEdit) {
                await axios.put(`${baseUrl.courses}/${id}`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add the bearer token here
                    },
                });
                setIsEdit(false);
            } else {
                await axios.post(`${baseUrl.courses}`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add the bearer token here
                    },
                });
            }
            refetch();
            setShowForm(false);
            reset();
        } catch (error) {
            console.log('Error in submitting course data', error);
        }
    };

    const handleRemoveCourse = async (id) => {
        try {
            await axios.delete(`${baseUrl.courses}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Add the bearer token here
                },
            });
            handleClose();
            refetch();
        } catch (error) {
            console.log('Error in deleting course', error);
        }
    };

    const handleEditCourse = (course) => {
        setId(course._id);
        setIsEdit(true);
        setShowForm(true);
        setValue('course', course.course);
    };

    return (
        <div>
            <div className='flex justify-between items-center '>
                <div className='relative'>
                    <input
                        type="text"
                        placeholder='Search Course...'
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
                    Add Course
                    <FaPlus />
                </button>
            </div>

            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/10 z-50">
                    <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6 animation relative">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                            {isEdit ? 'Edit Course Details' : 'Add Course Details'}
                        </h2>
                        <button onClick={() => setShowForm(false)} className='absolute top-5 right-5 text-xl p-bg p-1 rounded-full text-white'>
                            <IoClose />
                        </button>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-0 grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className='col-span-2'>
                                <label className="block mb-2 text-gray-700 ">Course</label>
                                <input
                                    type="text"
                                    {...register("course", { required: "Course name is required" })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                                />
                                {errors.course && <p className="text-red-500 text-sm">{errors.course.message}</p>}
                            </div>
                            <button
                                type="submit"
                                className="md:col-span-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition duration-300"
                            >
                                {isEdit ? 'Update' : 'Add Course'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="mt-10 overflow-auto max-w-sm md:max-w-full max-h-[80vh] custom-scroll">
                <table className="min-w-full bg-white border border-gray-300 rounded-md">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
                                No
                            </th>
                            <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
                                Course
                            </th>
                            <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCourses?.length > 0 ? (
                            filteredCourses?.map((course, i) => (
                                <tr key={course._id}>
                                    <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">
                                        {i + 1}
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">
                                        {course?.course}
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-300 text-3xl text-white">
                                        <button className='flex gap-6'>
                                            <MdDelete onClick={() => handleClickOpen(course?._id)} className='text-red-500 border border-red-500 hover:bg-red-200 duration-300 ease-out rounded p-1' />
                                            <FaPen onClick={() => handleEditCourse(course)} className='text-green-500 border border-green-500 hover:bg-green-200 duration-300 ease-out rounded p-2' />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="py-2 px-4 h-[600px] text-center text-gray-700">
                                    {isLoading ? <CircularProgress /> : "No users found"}
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
                    {"Confirm Course Deletion"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => handleRemoveCourse(id)}
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

export default Courses;
