import { useEffect, useReducer } from "react";

const ACTIONS = {
  DATA_REQUESTED: "dataRequested",
  DATA_RECEIVED: "dataReceived",
  NEXT_PLAN: "nextPlan",
  PREV_PLAN: "prevPlan",
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
      return { ...state, plans: action.payload, status: STATUSES.READY };

    case ACTIONS.NEXT_PLAN:
      return { ...state, currentPlanId: getNextPrevPlanId(state, "next") };

    case ACTIONS.PREV_PLAN:
      return { ...state, currentPlanId: getNextPrevPlanId(state, "prev") };

    default:
      return state;
  }
}

function getNextPrevPlanId(state, direction) {
  const currentPlanIndex = state.plans.findIndex(
    (plan) => plan.id === state.currentPlanId
  );

  let nextPlanId;

  if (direction === "next") {
    if (currentPlanIndex < state.plans.length - 1) {
      nextPlanId = state.plans[currentPlanIndex + 1].id;
    } else {
      nextPlanId = state.currentPlanId;
    }
  } else if (direction === "prev") {
    if (currentPlanIndex > 0) {
      nextPlanId = state.plans[currentPlanIndex - 1].id;
    } else {
      nextPlanId = state.currentPlanId;
    }
  }

  return nextPlanId;
}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    plans: [],
    currentPlanId: "123123",
    status: STATUSES.LOADING,
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
        <h1>React Cellphone Plan Picker Demo</h1>

        {state.status === STATUSES.LOADING && <div>Loading...</div>}

        <div className="picker-pane">
          <h2>Plan picker</h2>
          <div className="picker">
            {state.plans
              .filter((plan) => plan.id === state.currentPlanId)
              .map((currentPlan) => currentPlan.name)}
          </div>
          <button
            type="button"
            onClick={() => dispatch({ type: ACTIONS.PREV_PLAN })}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => dispatch({ type: ACTIONS.NEXT_PLAN })}
          >
            Next
          </button>
        </div>
        <div className="list-pane">
          <h2>Cellphone Plans</h2>
          <ul>
            {state.plans.map((plan) => (
              <li
                style={
                  plan.id === state.currentPlanId ? { color: "red" } : null
                }
                key={plan.id}
              >
                {plan.name}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}

export default App;
