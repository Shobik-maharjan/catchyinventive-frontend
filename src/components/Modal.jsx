import React from "react";

const Modal = ({
  isOpen,
  closeModal,
  title,
  onSubmit,
  children,
  isLoading,
  error,
}) => {
  return (
    <dialog
      className="modal sm:modal-middle text-base backdrop-blur-[2px] bg-black/30"
      open={isOpen}
    >
      <form method="dialog" className="modal-backdrop">
        <button onClick={closeModal}></button>
      </form>
      <div className="modal-box">
        <form method="dialog" onSubmit={onSubmit}>
          <button
            className="btn btn-sm rounded-md btn-ghost absolute right-2 top-2"
            onClick={closeModal}
          >
            ✕
          </button>
          <h2 className="mb-4 text-lg">{title}</h2>
          <div className="flex flex-col gap-4">
            {children}
            <button
              type="submit"
              className={`btn rounded-md cursor-pointer`}
              disabled={isLoading}
            >
              {isLoading && <span className="loading loading-spinner"></span>}
              {title}
            </button>
            {error && <div className="text-red-500">{error}</div>}
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default Modal;
