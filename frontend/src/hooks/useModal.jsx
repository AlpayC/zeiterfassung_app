import { useState } from "react";

export default function useModal() {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [tagsModalOpen, setTagsModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  const openTagsModal = () => {
    setTagsModalOpen(true);
  };

  const closeTagsModal = () => {
    setTagsModalOpen(false);
  };

  return {
    modalOpen,
    closeModal,
    openModal,
    deleteModalOpen,
    closeDeleteModal,
    openDeleteModal,
    tagsModalOpen,
    closeTagsModal,
    openTagsModal,
  };
}
