import { formatSpecialOffer } from "../utils/utils.js";

import CallMinuteOptions from "./CallMinuteOptions.jsx";
import PickerFooter from "./PickerFooter.jsx";
import DataBar from "./DataBar.jsx";

function PickerPane({ plans, currentPlanId, isIncludedOfferData, dispatch }) {
  const currentPlan = plans.find((plan) => plan.id === currentPlanId);

  const specialOfferString = formatSpecialOffer(
    currentPlan.specialOffer.description,
    currentPlan.specialOffer.data,
    currentPlan.specialOffer.duration
  );

  const specialOfferMarkup = { __html: specialOfferString };

  return (
    <div className="picker-pane">
      <h2 className="pane-title">Plan picker</h2>
      <div className="picker">
        <h3 className="picker-plan-title">{currentPlan.name}</h3>

        {currentPlan.specialOffer !== "" && (
          <div
            className="picker-offer"
            dangerouslySetInnerHTML={specialOfferMarkup}
          ></div>
        )}

        <DataBar
          plans={plans}
          currentPlan={currentPlan}
          isIncludedOfferData={isIncludedOfferData}
          dispatch={dispatch}
        />

        <CallMinuteOptions
          plans={plans}
          currentPlan={currentPlan}
          dispatch={dispatch}
        />

        <PickerFooter currentPlan={currentPlan} dispatch={dispatch} />
      </div>
    </div>
  );
}

export default PickerPane;
