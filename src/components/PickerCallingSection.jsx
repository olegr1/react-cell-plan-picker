import { ACTIONS } from "../utils/constants";

function PickerCallingSection({ plans, currentPlan, dispatch }) {
  function getAvailableCallMinuteOptions() {
    const options = plans.map((plan) => {
      if (plan.callMinutes === "") {
        return Infinity;
      }

      return plan.callMinutes;
    });

    const uniqueOptions = [...new Set(options)];
    const sortedUniqueOptions = uniqueOptions.sort((a, b) => a - b);

    return sortedUniqueOptions;
  }

  function getNearestPlanWithCallingOption(option) {
    console.log(option);

    const currentPlanNumeric =
      currentPlan.callMinutes === ""
        ? Infinity
        : Number(currentPlan.callMinutes);

    const isLesserPlan = currentPlanNumeric > option;

    const optionOriginal = option === Infinity ? "" : option;
    const matchingPlans = plans.filter(
      (plan) => plan.callMinutes === optionOriginal
    );

    let plan = isLesserPlan
      ? matchingPlans[matchingPlans.length - 1]
      : matchingPlans[0];

    console.log(isLesserPlan, plan);

    return plan.id;
  }

  return (
    <div className="picker-section">
      <h3 className="picker-section-title">Calling</h3>
      <ul className="picker-calling-options">
        {getAvailableCallMinuteOptions().map((option) => (
          <li key={option}>
            <button
              type="button"
              onClick={() =>
                dispatch({
                  type: ACTIONS.SELECT_CALLING_MINUTES,
                  payload: getNearestPlanWithCallingOption(option),
                })
              }
              disabled={
                currentPlan.callMinutes === option ||
                (currentPlan.callMinutes === "" && option === Infinity)
                  ? true
                  : null
              }
              className={
                currentPlan.callMinutes === option ||
                (currentPlan.callMinutes === "" && option === Infinity)
                  ? "active"
                  : null
              }
            >
              {option === Infinity ? (
                <div className="picker-calling-option-number">Unlimited</div>
              ) : (
                <>
                  <div className="picker-calling-option-number">{option}</div>
                  <div className="picker-calling-option-unit">minutes</div>
                </>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PickerCallingSection;
