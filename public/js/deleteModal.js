const deleteModal = document.querySelector('#delete-modal');

const openDeleteModal = () => {
    deleteModal.classList.remove('hidden');
};

const closeDeleteModal = () => {
    deleteModal.classList.add('hidden');
};
