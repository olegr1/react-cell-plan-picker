const ACTIONS = {
  DATA_REQUESTED: "dataRequested",
  DATA_RECEIVED: "dataReceived",
  NEXT_PLAN: "nextPlan",
  PREV_PLAN: "prevPlan",
  TOGGLE_OFFER_DATA: "toggleOfferData",
  MODAL_CLOSE: "modalClose",
  PLAN_ORDER: "planOrder",
  SELECT_CALLING_MINUTES: "selectCallingMinutes",
};

const STATE_CHANGE_TRIGGERS = {
  MORE_LESS_BUTTONS: "moreLessButtons",
  CALLING_BUTTONS: "callingButtons",
  OFFER_DATA_TOGGLE: "offerDataToggle",
  MODAL_OPEN_CLOSE: "modalOpenClose",
  OTHER: "other",
};

export { ACTIONS, STATE_CHANGE_TRIGGERS };
