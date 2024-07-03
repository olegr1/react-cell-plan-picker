import { createPortal } from "react-dom";
import { ACTIONS } from "../utils/constants";
import { useEffect } from "react";

const modalContainer = document.getElementById("modalContainer");

function Modal({ children, dispatch, isModalOpen, title }) {
  useEffect(() => {
    document.body.classList.toggle("modal-open", isModalOpen);
  }, [isModalOpen]);

  return isModalOpen
    ? createPortal(
        <div className="modal-dialog" role="dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{title}</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => dispatch({ type: ACTIONS.MODAL_CLOSE })}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>,
        modalContainer
      )
    : null;
}

export default Modal;
