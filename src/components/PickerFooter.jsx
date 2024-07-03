import { ACTIONS } from "../utils/constants.js";

function PickerFooter({ currentPlan, dispatch }) {
  return (
    <div className="picker-footer">
      <div className="picker-footer-price">${currentPlan.price}/month</div>
      <button
        type="button"
        onClick={() => dispatch({ type: ACTIONS.PLAN_ORDERED })}
      >
        Order now
      </button>
    </div>
  );
}

export default PickerFooter;
