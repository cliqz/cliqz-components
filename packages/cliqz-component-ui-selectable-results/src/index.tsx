import React, { useContext, useReducer, ComponentType, useMemo } from 'react';

type Dispatch = (action: Action) => void

type State = {
  results: any[];
  selectableResults: any[];
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
  selectableResults: [],
};

const SelectableResultStateContext = React.createContext<State>(defaultState);
const SelectableResultDispatchContext = React.createContext<Dispatch | undefined>(undefined);

const exhaustiveCheck = (_: never): void => {};

function selectableResultReducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.register: {
      return {
        ...state,
        selectableResults: [
          ...state.selectableResults,
          action.result,
        ],
      };
    }
    case ActionType.next:
      if (state.index >= state.selectableResults.length - 1) {
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
          index: state.selectableResults.length - 1,
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
        selectableResults: [],
      };
    default:
      exhaustiveCheck(action);
      return state;
  }
}

type ResultListControls = {
  selectedResultIndex: number
  results: any
  next(): void
  previous(): void
  clear(): void
  updateResults(results: any): void
}

export const ResultList = (
  { children, results }:
  { children(arg0: ResultListControls): any, results: any[] }
) => {
  const [state, dispatch] = useReducer(selectableResultReducer, {
    ...defaultState,
    results,
  });

  return (
    <SelectableResultStateContext.Provider value={state}>
      <SelectableResultDispatchContext.Provider value={dispatch}>
        {children({
          selectedResultIndex: state.index,
          results: state.results,
          next() {
            dispatch({ type: ActionType.next });
          },
          previous() {
            dispatch({ type: ActionType.previous });
          },
          clear() {
            dispatch({ type: ActionType.clear });
          },
          updateResults(results: any) {
            dispatch({ type: ActionType.updateResults, results })
          },
        })}
      </SelectableResultDispatchContext.Provider>
    </SelectableResultStateContext.Provider>
  );
}

export type SelectableResultProps = {
  isActive?: boolean,
  index?: number,
}

export const SelectableResult = (
  { children, result }:
  { children(arg0: SelectableResultProps): any, result: any }
) => {
  const { index, selectableResults } = useContext(SelectableResultStateContext);
  const dispatch = useContext(SelectableResultDispatchContext)
  if (!dispatch) {
    throw new Error('SelectableResult has to be nested in ResultList');
  }

  let indexOfId = selectableResults.indexOf(result);

  if (indexOfId === -1) {
    dispatch({ type: ActionType.register, result });
  }

  return children({
    isActive: index === indexOfId,
    index: indexOfId,
  });
}

export const withSelectableResult = <P extends object>(Component: ComponentType<P>) => (props: P) => {
  const { index, selectableResults } = useContext(SelectableResultStateContext);
  const dispatch = useContext(SelectableResultDispatchContext)
  if (!dispatch) {
    throw new Error('SelectableResult has to be nested in ResultList');
  }
  const result = useMemo(() => ({}), []);

  let indexOfId = selectableResults.indexOf(result);

  if (indexOfId === -1) {
    dispatch({ type: ActionType.register, result });
  }
  return (
    <Component isActive={index === indexOfId} {...props as P} />
  )
};
