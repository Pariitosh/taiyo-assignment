import React, { useEffect, useState } from 'react'
import { editContact } from '../features/slices/contactSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';

interface EditContactFormProps {
    contact: {
        firstName: string;
        lastName: string;
        status: 'active' | 'inactive';
    };
    index: number;
    onClose: () => void;
}
export const EditModal: React.FC<EditContactFormProps> = ({ contact, index, onClose }) => {
    const [firstName, setFirstName] = useState(contact.firstName);
    const [lastName, setLastName] = useState(contact.lastName);
    const [status, setStatus] = useState(contact.status);

    useEffect(() => {
        setFirstName(contact.firstName);
        setLastName(contact.lastName);
        setStatus(contact.status);
    }, [contact]);

    const dispatch: AppDispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(editContact({
          index,
          contact: { firstName, lastName, status }
        }));
        onClose();
      };
    
   
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-72 md:w-96 ">
                <h2 className="text-2xl font-bold mb-4">Edit Contact</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
          onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <span className="block text-sm font-medium text-gray-700 mb-1">Status</span>
                        <div className="flex space-x-4">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="status"
                                    value="active"
                                    checked={status === 'active'}
                                    onChange={() => setStatus('active')}
                                    className="form-radio text-blue-600"
                                />
                                <span className="ml-2">Active</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="status"
                                    value="inactive"
                                    checked={status === 'inactive'}
              onChange={() => setStatus('inactive')}
                                    className="form-radio text-blue-600"
                                />
                                <span className="ml-2">Inactive</span>
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                        <button

                            type="submit"
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}