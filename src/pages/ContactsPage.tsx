import React, { useState } from 'react'
import { deleteContact } from '../features/slices/contactSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { EditModal } from '../components/EditModal';
import AddModal from '../components/AddModal';
export const ContactsPage: React.FC = () => {
    const contacts = useSelector((state: RootState) => state.contacts.contacts);
    const dispatch: AppDispatch = useDispatch();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const handleEditClick = (index: number) => {
        setEditingIndex(index);
    };

    const handleCloseEdit = () => {
        setEditingIndex(null);
    };


    const handleDeleteContact = (index: number) => {
        dispatch(deleteContact(index));
    };

    const handleOpenAddModal = () => {
        setIsAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    };


    return (
        <>

            <h1 className="text-3xl font-bold mb-5">Contacts</h1>
            <button
                className="bg-red-500  hover:bg-red-800 text-white font-bold py-2 px-4 rounded-lg mb-5  h-25"
                onClick={handleOpenAddModal}
            >
                Create Contact
            </button>

            {/* Contact grid */}
            {contacts.length === 0 &&
                <div className="bg-white shadow-md rounded-lg p-6 text-center">
                    <p className="text-xl text-gray-600">No contacts found</p>
                    <p className="text-xl text-gray-600">Please add contacts from Create contact button</p>
                </div>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {contacts.map((contact, idx) => (
                    <div key={idx} className="bg-white shadow-md rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">{contact.firstName} {contact.lastName}</h2>

                                <span
                                    className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded-full ${contact.status === 'active'
                                        ? 'bg-green-200 text-green-800'
                                        : 'bg-red-200 text-red-800'
                                        }`}
                                >
                                    {contact.status}
                                </span>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <button
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded text-sm"
                                    onClick={() => handleEditClick(idx)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-sm"
                                    onClick={() => handleDeleteContact(idx)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {editingIndex !== null && (
                <div className="modal">
                    <EditModal
                        contact={contacts[editingIndex]}
                        index={editingIndex}
                        onClose={handleCloseEdit}
                    />
                </div>
            )}

            <AddModal
                isOpen={isAddModalOpen}
                onClose={handleCloseAddModal}
            />
        </>
    )
}