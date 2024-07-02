import { convertMbToGbString, formatSpecialOffer } from "../utils/utils.js";

function PickerPane({ plans, currentPlanId, dispatch, ACTIONS }) {
  return (
    <div className="picker-pane">
      <h2 className="pane-title">Plan picker</h2>
      <div className="picker">
        <h3 className="picker-plan-title">
          {plans
            .filter((plan) => plan.id === currentPlanId)
            .map(
              (currentPlan) =>
                `${currentPlan.name} - ${convertMbToGbString(currentPlan.data)}`
            )}
        </h3>
        <div className="picker-data-bar">
          <div className="picker-data-bar-total" style={{ width: "40%" }}>
            <div
              className="picker-data-bar-offer"
              style={{ width: "30%" }}
            ></div>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => dispatch({ type: ACTIONS.PREV_PLAN })}
      >
        Less data
      </button>
      <button
        type="button"
        onClick={() => dispatch({ type: ACTIONS.NEXT_PLAN })}
      >
        More data
      </button>
    </div>
  );
}

export default PickerPane;
