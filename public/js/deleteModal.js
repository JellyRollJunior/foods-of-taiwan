const deleteModal = document.querySelector('#delete-modal');
const deleteModalForm = document.querySelector('#delete-modal form');
const deleteModalFoodTitle = document.querySelector('#delete-modal .deleted-item');

const openDeleteModal = (action, title) => {
    deleteModal.classList.remove('hidden');
    deleteModalForm.action = action;
    deleteModalFoodTitle.textContent = title;
};

const closeDeleteModal = () => {
    deleteModal.classList.add('hidden');
};
