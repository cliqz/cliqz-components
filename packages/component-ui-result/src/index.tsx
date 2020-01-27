import React, { useContext, useReducer, useMemo, useEffect } from 'react';

type Dispatch = (action: Action) => void

type State = {
  results: any[];
  index: number;
}

enum ActionType {
  next = "next",
  previous = "previous",
  register = "register",
  clear = "clear",
  updateResults = "updateResuls"
}

type Action =
  {
    type: ActionType.next
  } |
  {
    type: ActionType.previous
  } |
  {
    type: ActionType.register
    result: any
  } |
  {
    type: ActionType.clear,
  } |
  {
    type: ActionType.updateResults,
    results: any[],
  };

const defaultState = {
  index: -1,
  results: [],
};

const SelectableResultStateContext = React.createContext<State>(defaultState);
const SelectableResultDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const exhaustiveCheck = (_: never): void => {};

function selectableResultReducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.register: {
      return {
        ...state,
        results: [
          ...state.results,
          action.result,
        ],
      };
    }
    case ActionType.next:
      if (state.index >= state.results.length - 1) {
        return {
          ...state,
          index: -1,
        };
      }
      return {
        ...state,
        index: state.index + 1,
      };
    case ActionType.previous:
      if (state.index === - 1) {
        return {
          ...state,
          index: state.results.length - 1,
        };
      }
      return {
        ...state,
        index: state.index - 1,
      };
    case ActionType.clear:
      return {
        ...defaultState
      };
    case ActionType.updateResults:
      return {
        ...state,
        results: action.results,
      };
    default:
      exhaustiveCheck(action);
      return state;
  }
}

type ResultListControls = {
  selectedResultIndex: number
  next(): void
  previous(): void
  clear(): void
}

export const ResultList = (
  { children, results }:
  { children(arg0: ResultListControls): any, results: any }
) => {
  const [state, dispatch] = useReducer(selectableResultReducer, defaultState);

  useEffect(() => {
    dispatch({ type: ActionType.updateResults, results })
  }, results)

  return (
    <SelectableResultStateContext.Provider value={state}>
      <SelectableResultDispatchContext.Provider value={dispatch}>
        {children({
          selectedResultIndex: state.index,
          next() {
            dispatch({ type: ActionType.next });
          },
          previous() {
            dispatch({ type: ActionType.previous });
          },
          clear() {
            dispatch({ type: ActionType.clear });
          }
        })}
      </SelectableResultDispatchContext.Provider>
    </SelectableResultStateContext.Provider>
  );
}

type SelectableResultContext = {
  isActive: boolean,
  index: number,
}

export const SelectableResult = (
  { children, result }:
  { children(arg0: SelectableResultContext): any, result: any }
) => {
  const { index, results } = useContext(SelectableResultStateContext);
  const dispatch = useContext(SelectableResultDispatchContext)
  if (!dispatch) {
    throw new Error('SelectableResult has to be nested in ResultList');
  }
  const indexOfId = results.indexOf(result);

  return children({
    isActive: index === indexOfId,
    index: indexOfId,
  });
}
