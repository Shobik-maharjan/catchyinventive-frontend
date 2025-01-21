import React, { useState } from "react";

const ConformationBox = ({ closeModal, isModalOpen, id }) => {
  const [click, setClick] = useState("");

  const deleteProduct = () => {
    setClick(`product ${id} deleted`);
    setTimeout(() => closeModal(), [1000]);
  };

  console.log("🚀 ~ Products ~ click:", click);

  return (
    <>
      <dialog
        id="my_modal_5"
        open={isModalOpen}
        className="modal modal-bottom sm:modal-middle backdrop-blur-[2px] bg-black/40"
      >
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm hover:bg-red-500 hover:text-white btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
          </form>
          <p className="py-4">Are you sure you want to delete this product</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn hover:btn-error" onClick={deleteProduct}>
                Yes
              </button>
            </form>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn" onClick={closeModal}>
                No
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={closeModal}>close</button>
        </form>
      </dialog>
    </>
  );
};

export default ConformationBox;
