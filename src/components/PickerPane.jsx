import { convertMbToGbString } from "../utils/utils.js";

function PickerPane({
  plans,
  currentPlanId,
  isIncludedOfferData,
  dispatch,
  ACTIONS,
}) {
  const currentPlan = plans.find((plan) => plan.id === currentPlanId);
  const isLastPlan = plans.indexOf(currentPlan) === plans.length - 1;
  const isFirstPlan = plans.indexOf(currentPlan) === 0;

  function getDataBarWidth() {
    const maxData = Math.max(...plans.map((plan) => getPlanTotalData(plan)));

    const percentage = (getPlanTotalData(currentPlan) / maxData) * 100;
    const percentageRounded = Math.ceil(percentage);

    return percentageRounded;
  }

  function getOfferDataBarWidth() {
    let percentageFinal = 0;

    if (isIncludedOfferData) {
      const maxData = getPlanTotalData(currentPlan);
      const offerData = currentPlan.specialOffer?.data
        ? Number(currentPlan.specialOffer.data)
        : 0;

      if (offerData !== 0) {
        const percentage = (offerData / maxData) * 100;
        percentageFinal = Math.ceil(percentage);
      }

      console.log(percentageFinal);
    }

    return percentageFinal;
  }

  function getPlanTotalData(plan) {
    const planData = Number(plan.data);
    const offerData = plan.specialOffer?.data
      ? Number(plan.specialOffer.data)
      : 0;

    const planTotalData = isIncludedOfferData ? planData + offerData : planData;

    // console.log("planData: ", planData);
    // console.log("offerData: ", offerData);
    // console.log("planTotalData: ", planTotalData);
    // console.log("-------");

    return planTotalData;
  }

  return (
    <div className="picker-pane">
      <h2 className="pane-title">Plan picker</h2>
      <div className="picker">
        <h3 className="picker-plan-title">
          {`${currentPlan.name} - ${convertMbToGbString(
            getPlanTotalData(currentPlan)
          )}`}
        </h3>
        <div className="picker-data-bar">
          <div
            className="picker-data-bar-total"
            style={{ width: getDataBarWidth() + "%" }}
          >
            <div
              className="picker-data-bar-offer"
              style={{ width: getOfferDataBarWidth() + "%" }}
            ></div>
          </div>
        </div>
      </div>
      <button
        type="button"
        disabled={isFirstPlan}
        onClick={() => dispatch({ type: ACTIONS.PREV_PLAN })}
      >
        Less data
      </button>
      <button
        type="button"
        disabled={isLastPlan}
        onClick={() => dispatch({ type: ACTIONS.NEXT_PLAN })}
      >
        More data
      </button>

      <button
        className="picker-offer-data-toggle"
        type="button"
        aria-pressed={isIncludedOfferData}
        onClick={() => dispatch({ type: ACTIONS.TOGGLE_OFFER_DATA })}
      >
        Include offer data
      </button>
    </div>
  );
}

export default PickerPane;
