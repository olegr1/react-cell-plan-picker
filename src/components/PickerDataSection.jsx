import { useEffect, useState } from "react";
import { ACTIONS } from "../utils/constants.js";
import { convertMbToGbString } from "../utils/utils.js";

function PickerDataSection({
  plans,
  currentPlan,
  isIncludedOfferData,
  dispatch,
}) {
  const isLastPlan = plans.indexOf(currentPlan) === plans.length - 1;
  const isFirstPlan = plans.indexOf(currentPlan) === 0;

  const hasSpecialOfferWithData = currentPlan.specialOffer.data !== undefined;

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
    }

    return percentageFinal;
  }

  function getPlanTotalData(plan) {
    const planData = Number(plan.data);
    const offerData = plan.specialOffer?.data
      ? Number(plan.specialOffer.data)
      : 0;

    const planTotalData = isIncludedOfferData ? planData + offerData : planData;

    return planTotalData;
  }

  return (
    <div className="picker-section">
      <h3 className="picker-section-title">Total data</h3>

      <div className="picker-data-bar-wrap">
        <div className="picker-data">
          <span className="picker-data-gb">
            {convertMbToGbString(getPlanTotalData(currentPlan))}
          </span>

          {currentPlan.specialOffer.duration && isIncludedOfferData && (
            <span className="picker-data-duration">
              {`(for ${currentPlan.specialOffer.duration} months)`}
            </span>
          )}
        </div>
        <button
          className="picker-data-btn-less"
          type="button"
          disabled={isFirstPlan}
          onClick={() => dispatch({ type: ACTIONS.PREV_PLAN })}
        >
          <span className="sr-only">Less data</span>
        </button>
        <button
          className="picker-data-btn-more"
          type="button"
          disabled={isLastPlan}
          onClick={() => dispatch({ type: ACTIONS.NEXT_PLAN })}
        >
          <span className="sr-only">More data</span>
        </button>

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

      <div className="picker-data-item active">
        <span className="picker-data-item-desc">Data included in the plan</span>
        <span className="picker-data-item-gb">
          {convertMbToGbString(currentPlan.data)}
        </span>
      </div>

      <div
        className={
          hasSpecialOfferWithData
            ? "picker-data-item active"
            : "picker-data-item"
        }
        aria-hidden={hasSpecialOfferWithData ? null : true}
      >
        <span className="picker-data-item-desc">
          Offer data
          <button
            className="picker-offer-data-toggle"
            type="button"
            aria-pressed={isIncludedOfferData}
            onClick={() => dispatch({ type: ACTIONS.TOGGLE_OFFER_DATA })}
          >
            {isIncludedOfferData ? "Exclude" : "Include"}
          </button>
        </span>
        <span className="picker-data-item-gb">
          {hasSpecialOfferWithData &&
            convertMbToGbString(currentPlan.specialOffer.data)}
        </span>
      </div>
    </div>
  );
}

export default PickerDataSection;
