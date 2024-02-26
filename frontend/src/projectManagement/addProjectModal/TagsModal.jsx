import { useState } from "react";
import Modal from "../../components/ui/modals/Modal";
import useProject from "../../hooks/useProject";

export default function TagsModal({ closeModal, modalOpen, id, oldTags }) {
  const [newTags, setNewTags] = useState(oldTags);
  const { updateProject } = useProject({
    newTags,
    id,
  });

  const handleTagChange = (e) => {
    const newTag = e.target.value;

    setNewTags([...oldTags, newTag]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      updateProject({ newTags });
      closeModal();
      e.target.value = "";
    }
  };

  return (
    <>
      <Modal closeModal={closeModal} modalOpen={modalOpen}>
        <input
          type="text"
          className="input input-ghost bg-base-100 w-full text-3xl"
          placeholder="Neue Tags hinzufügen"
          onChange={handleTagChange}
          onKeyDown={handleKeyDown}
        />
      </Modal>
    </>
  );
}
