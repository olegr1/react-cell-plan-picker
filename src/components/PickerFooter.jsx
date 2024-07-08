import { useEffect, useRef } from "react";
import { ACTIONS, STATE_CHANGE_TRIGGERS } from "../utils/constants.js";

function PickerFooter({
  currentPlan,
  dispatch,
  isOrderModalOpen,
  stateChangedBy,
}) {
  const orderCtaRef = useRef(null);

  useEffect(() => {
    if (
      stateChangedBy === STATE_CHANGE_TRIGGERS.MODAL_OPEN_CLOSE &&
      !isOrderModalOpen
    ) {
      orderCtaRef.current.focus();
    }
  }, [isOrderModalOpen, stateChangedBy]);

  return (
    <div className="picker-footer">
      <div className="picker-footer-price">
        <span aria-hidden="true">${currentPlan.price}/month</span>
        <span className="sr-only">{currentPlan.price} dollars per month</span>
      </div>
      <button
        ref={orderCtaRef}
        className="picker-order-cta"
        type="button"
        onClick={() => dispatch({ type: ACTIONS.PLAN_ORDER })}
      >
        Order now
      </button>
    </div>
  );
}

export default PickerFooter;
