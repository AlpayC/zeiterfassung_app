import Modal from "../../components/ui/modals/Modal";

import useProject from "../../hooks/useProject";

export default function DeleteProjectModal({
  closeModal,
  modalOpen,
  id,
  projectTitle,
}) {
  const { deleteProject } = useProject({ id });

  return (
    <>
      <Modal closeModal={closeModal} modalOpen={modalOpen}>
        <div className="flex w-full gap-4 items-center justify-center flex-col">
          <h2 className="text-3xl">
            Willst du wirklich das Projekt {projectTitle} löschen?
          </h2>
          <p>
            Es gehen dabei alle Aufgaben, Fortschritte, Tags und Listen
            verloren!
          </p>
          <div className="flex gap-4 ">
            <button className="btn btn-error" onClick={deleteProject}>
              JA
            </button>
            <button className="btn btn-success" onClick={closeModal}>
              NEIN
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
