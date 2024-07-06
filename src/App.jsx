import { useEffect, useReducer } from "react";
import PlansPane from "./components/PlansPane";
import PickerPane from "./components/PickerPane";
import LoadingMessage from "./components/LoadingMessage";
import Layout from "./components/Layout";
import { ACTIONS, STATUSES, STATE_CHANGE_TRIGGERS } from "./utils/constants";

const initialState = {
  plans: [],
  currentPlanId: "123123",
  status: STATUSES.LOADING,
  isIncludedOfferData: true,
  isOrderModalOpen: false,
  stateChangedBy: STATE_CHANGE_TRIGGERS.OTHER,
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.DATA_REQUESTED:
      return state;

    case ACTIONS.DATA_RECEIVED:
      return {
        ...state,
        plans: sortPlansBy(action.payload, "data"),
        status: STATUSES.READY,
        stateChangedBy: STATE_CHANGE_TRIGGERS.OTHER,
      };

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
      console.log(action.payload);

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
      status,
      isIncludedOfferData,
      isOrderModalOpen,
      stateChangedBy,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:8000/plans";

      try {
        dispatch({ type: ACTIONS.DATA_REQUESTED });
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
        dispatch({ type: ACTIONS.DATA_RECEIVED, payload: data });
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

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
        {status === STATUSES.LOADING ? (
          <LoadingMessage />
        ) : (
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
        )}
      </Layout>
    </>
  );
}

export default App;
