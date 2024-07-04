import { ACTIONS } from "../utils/constants.js";

function PickerFooter({ currentPlan, dispatch }) {
  return (
    <div className="picker-footer">
      <div className="picker-footer-price">${currentPlan.price}/month</div>
      <button
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
