const openDeleteModal = (action, title) => {
    const deleteModal = document.querySelector('#delete-modal');
    const deleteModalForm = document.querySelector('#delete-modal form');
    const deleteModalFoodTitle = document.querySelector(
        '#delete-modal .deleted-item'
    );

    deleteModal.classList.remove('hidden');
    deleteModalForm.action = action;
    deleteModalFoodTitle.textContent = title;
};
