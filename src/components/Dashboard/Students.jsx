import React from 'react';
import { FaUserGraduate } from 'react-icons/fa';

const Students = () => {
    return (
        <div>
            <div className="rounded-lg bg-white p-4 shadow">
                <div className="flex items-center space-x-3">
                    <div className="rounded-full bg-blue-100 p-2">
                        <FaUserGraduate className="text-blue-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Student </h3>
                        <p className="text-sm text-gray-500">ID: STU-4578</p>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Students;