import { createPortal } from "react-dom";
import { ACTIONS } from "../utils/constants";
import { useEffect, useRef } from "react";

const modalContainer = document.getElementById("modalContainer");

function Modal({ children, dispatch, isOrderModalOpen, title }) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle("modal-open", isOrderModalOpen);

    if (isOrderModalOpen) {
      closeBtnRef.current.focus();
    }
  }, [isOrderModalOpen]);

  return isOrderModalOpen
    ? createPortal(
        <div
          className="modal-dialog"
          role="dialog"
          aria-labelledby="modalTitle"
        >
          <span
            tabIndex="0"
            aria-hidden="true"
            style={{ opacity: 0 }}
            onFocus={() => document.getElementById("modalCloseBtn").focus()}
          ></span>
          <div className="modal-content">
            <div className="modal-header">
              <h3 id="modalTitle">{title}</h3>
              <button
                type="button"
                id="modalCloseBtn"
                ref={closeBtnRef}
                className="modal-close-btn"
                onClick={() => dispatch({ type: ACTIONS.MODAL_CLOSE })}
              >
                <span aria-hidden="true">&times;</span>
                <span className="sr-only">Close</span>
              </button>
            </div>
            <div className="modal-body">{children}</div>
          </div>
          <span
            tabIndex="0"
            aria-hidden="true"
            style={{ opacity: 0 }}
            onFocus={() => document.getElementById("modalCloseBtn").focus()}
          ></span>
        </div>,
        modalContainer
      )
    : null;
}

export default Modal;
