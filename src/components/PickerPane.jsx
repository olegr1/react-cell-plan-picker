import { formatSpecialOffer } from "../utils/utils.js";

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
}) {
  const currentPlan = plans.find((plan) => plan.id === currentPlanId);
  const hasOffer = currentPlan.specialOffer !== "";

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
        <div className={hasOffer ? "picker-offer active" : "picker-offer"}>
          {hasOffer && <div dangerouslySetInnerHTML={specialOfferMarkup}></div>}
        </div>
        <PickerDataSection
          plans={plans}
          currentPlan={currentPlan}
          isIncludedOfferData={isIncludedOfferData}
          dispatch={dispatch}
        />

        <PickerCallingSection
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
