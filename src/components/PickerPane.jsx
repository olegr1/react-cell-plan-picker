import { formatSpecialOffer, convertMbToGbString } from "../utils/utils.js";

import PickerCallingSection from "./PickerCallingSection.jsx";
import PickerFooter from "./PickerFooter.jsx";
import PickerDataSection from "./PickerDataSection.jsx";
import Modal from "./Modal.jsx";

function PickerPane({
  plans,
  currentPlanId,
  isIncludedOfferData,
  dispatch,
  isOrderModalOpen,
  stateChangedBy,
}) {
  const currentPlan = plans.find((plan) => plan.id === currentPlanId);
  const hasOffer = currentPlan.specialOffer !== "";

  const specialOfferString = formatSpecialOffer(
    currentPlan.specialOffer.description,
    currentPlan.specialOffer.data,
    currentPlan.specialOffer.duration,
    false
  );

  const specialOfferStringAccessible = formatSpecialOffer(
    currentPlan.specialOffer.description,
    currentPlan.specialOffer.data,
    currentPlan.specialOffer.duration,
    true
  );

  const specialOfferMarkup = { __html: specialOfferString };

  return (
    <div className="picker-pane">
      <h2 className="pane-title">Plan picker</h2>
      <div className="picker">
        <div className={hasOffer ? "picker-offer active" : "picker-offer"}>
          {hasOffer && <div dangerouslySetInnerHTML={specialOfferMarkup}></div>}
        </div>
        <PickerDataSection
          plans={plans}
          currentPlan={currentPlan}
          isIncludedOfferData={isIncludedOfferData}
          dispatch={dispatch}
          stateChangedBy={stateChangedBy}
        />

        <PickerCallingSection
          plans={plans}
          currentPlan={currentPlan}
          dispatch={dispatch}
          stateChangedBy={stateChangedBy}
        />

        <PickerFooter
          currentPlan={currentPlan}
          dispatch={dispatch}
          stateChangedBy={stateChangedBy}
          isOrderModalOpen={isOrderModalOpen}
        />
      </div>

      <Modal
        title={"Your plan"}
        dispatch={dispatch}
        isOrderModalOpen={isOrderModalOpen}
      >
        {currentPlan.name}
      </Modal>

      <div aria-live="polite" className="sr-only">
        <p>
          {convertMbToGbString(currentPlan.data, true)} {currentPlan.name},
          {currentPlan.price} dollars per month
        </p>

        {specialOfferString && (
          <p>{` Special offer: ${specialOfferStringAccessible}.`}</p>
        )}

        {currentPlan.specialOffer.data && (
          <p>{`Total data: ${convertMbToGbString(
            Number(currentPlan.data) + Number(currentPlan.specialOffer.data),
            true
          )} including special offer data`}</p>
        )}
      </div>
    </div>
  );
}

export default PickerPane;
