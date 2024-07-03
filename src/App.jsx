import { useEffect, useReducer } from "react";
import PlansPane from "./components/PlansPane";
import PickerPane from "./components/PickerPane";
import LoadingMessage from "./components/LoadingMessage";

const ACTIONS = {
  DATA_REQUESTED: "dataRequested",
  DATA_RECEIVED: "dataReceived",
  NEXT_PLAN: "nextPlan",
  PREV_PLAN: "prevPlan",
  TOGGLE_OFFER_DATA: "toggleOfferData",
};

const STATUSES = {
  LOADING: "loading",
  READY: "ready",
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
      };

    case ACTIONS.TOGGLE_OFFER_DATA:
      return {
        ...state,
        isIncludedOfferData: !state.isIncludedOfferData,
      };

    case ACTIONS.NEXT_PLAN:
      return {
        ...state,
        currentPlanId: getNextPrevPlanId(
          state.plans,
          state.currentPlanId,
          "next"
        ),
      };

    case ACTIONS.PREV_PLAN:
      return {
        ...state,
        currentPlanId: getNextPrevPlanId(
          state.plans,
          state.currentPlanId,
          "prev"
        ),
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
  const [{ plans, currentPlanId, status, isIncludedOfferData }, dispatch] =
    useReducer(reducer, {
      plans: [],
      currentPlanId: "123123",
      status: STATUSES.LOADING,
      isIncludedOfferData: true,
    });

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

  return (
    <>
      <main>
        <div className="container">
          <h1 className="page-title">React Cellphone Plan Picker Demo</h1>
        </div>

        <div className="panes">
          <div className="container">
            <div className="panes-content">
              {status === STATUSES.LOADING ? (
                <LoadingMessage />
              ) : (
                <>
                  <PickerPane
                    plans={plans}
                    currentPlanId={currentPlanId}
                    isIncludedOfferData={isIncludedOfferData}
                    dispatch={dispatch}
                    ACTIONS={ACTIONS}
                  />
                  <PlansPane plans={plans} currentPlanId={currentPlanId} />
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
