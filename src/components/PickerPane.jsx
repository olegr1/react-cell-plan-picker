import { formatSpecialOffer } from "../utils/utils.js";

import CallMinuteOptions from "./CallMinuteOptions.jsx";
import PickerFooter from "./PickerFooter.jsx";
import PickerDataSection from "./PickerDataSection.jsx";
import Modal from "./Modal.jsx";

function PickerPane({
  plans,
  currentPlanId,
  isIncludedOfferData,
  dispatch,
  isOrderModalOpen,
}) {
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
        {currentPlan.specialOffer !== "" && (
          <div
            className="picker-offer"
            dangerouslySetInnerHTML={specialOfferMarkup}
          ></div>
        )}

        <PickerDataSection
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

      <Modal
        title={"Your order"}
        dispatch={dispatch}
        isModalOpen={isOrderModalOpen}
      >
        {currentPlan.name}
      </Modal>
    </div>
  );
}

export default PickerPane;
