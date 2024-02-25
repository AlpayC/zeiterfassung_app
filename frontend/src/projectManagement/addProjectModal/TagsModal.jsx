import { useState } from "react";
import Modal from "../../components/ui/modals/Modal";
import useProject from "../../hooks/useProject";

export default function TagsModal({ closeModal, modalOpen, id, oldTags }) {
  const [tags, setTags] = useState(oldTags);
  const { updateProject } = useProject({
    tags,
    id,
  });

  const handleTagChange = (e) => {
    const newTag = e.target.value;

    setTags([...oldTags, newTag]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      updateProject(e);
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
