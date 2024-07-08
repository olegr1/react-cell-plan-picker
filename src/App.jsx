import { ACTIONS, STATE_CHANGE_TRIGGERS } from "./utils/constants";
import plansObject from "./data/plans.json";

import { useEffect, useReducer } from "react";
import PlansPane from "./components/PlansPane";
import PickerPane from "./components/PickerPane";
import Layout from "./components/Layout";

const initialState = {
  plans: sortPlansBy(plansObject.plans, "data"),
  currentPlanId: plansObject.defaultPlan,
  isIncludedOfferData: true,
  isOrderModalOpen: false,
  stateChangedBy: STATE_CHANGE_TRIGGERS.OTHER,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.TOGGLE_OFFER_DATA:
      return {
        ...state,
        isIncludedOfferData: !state.isIncludedOfferData,
        stateChangedBy: STATE_CHANGE_TRIGGERS.OFFER_DATA_TOGGLE,
      };

    case ACTIONS.NEXT_PLAN:
      return {
        ...state,
        stateChangedBy: STATE_CHANGE_TRIGGERS.MORE_LESS_BUTTONS,
        currentPlanId: getNextPrevPlanId(
          state.plans,
          state.currentPlanId,
          "next"
        ),
      };

    case ACTIONS.PREV_PLAN:
      return {
        ...state,
        stateChangedBy: STATE_CHANGE_TRIGGERS.MORE_LESS_BUTTONS,
        currentPlanId: getNextPrevPlanId(
          state.plans,
          state.currentPlanId,
          "prev"
        ),
      };

    case ACTIONS.PLAN_ORDER:
      return {
        ...state,
        stateChangedBy: STATE_CHANGE_TRIGGERS.MODAL_OPEN_CLOSE,
        isOrderModalOpen: true,
      };

    case ACTIONS.MODAL_CLOSE:
      return {
        ...state,
        isOrderModalOpen: false,
        isCallingModalOpen: false,
        stateChangedBy: STATE_CHANGE_TRIGGERS.MODAL_OPEN_CLOSE,
      };

    case ACTIONS.SELECT_CALLING_MINUTES:
      return {
        ...state,
        stateChangedBy: STATE_CHANGE_TRIGGERS.CALLING_BUTTONS,
        currentPlanId: action.payload,
      };

    default:
      return state;
  }
}

function sortPlansBy(plans, sortBy) {
  const stortedPlans = plans.sort((planA, planB) => {
    const valueA = planA[sortBy];
    const valueB = planB[sortBy];
    return valueA - valueB;
  });

  return stortedPlans;
}

function getNextPrevPlanId(plans, currentPlanId, direction) {
  const currentPlanIndex = plans.findIndex((plan) => plan.id === currentPlanId);

  let nextPlanId;

  if (direction === "next") {
    if (currentPlanIndex < plans.length - 1) {
      nextPlanId = plans[currentPlanIndex + 1].id;
    } else {
      nextPlanId = currentPlanId;
    }
  } else if (direction === "prev") {
    if (currentPlanIndex > 0) {
      nextPlanId = plans[currentPlanIndex - 1].id;
    } else {
      nextPlanId = currentPlanId;
    }
  }

  return nextPlanId;
}

function App() {
  const [
    {
      plans,
      currentPlanId,
      isIncludedOfferData,
      isOrderModalOpen,
      stateChangedBy,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        dispatch({ type: ACTIONS.MODAL_CLOSE });
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <>
      <Layout>
        <>
          <PickerPane
            plans={plans}
            currentPlanId={currentPlanId}
            isIncludedOfferData={isIncludedOfferData}
            dispatch={dispatch}
            isOrderModalOpen={isOrderModalOpen}
            stateChangedBy={stateChangedBy}
          />
          <PlansPane plans={plans} currentPlanId={currentPlanId} />
        </>
      </Layout>
    </>
  );
}

export default App;
