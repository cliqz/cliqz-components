import React, { useContext, useReducer, useMemo } from 'react';

type Dispatch = (action: Action) => void

type State = {
  results: any[];
  index: number;
}

enum ActionType {
  next = "next",
  previous = "previous",
  register = "register",
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
  };

const SelectableResultStateContext = React.createContext<State>({
  index: -1,
  results: [],
});
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
    default:
      exhaustiveCheck(action);
      return state;
  }
}

type ResultListControls = {
  selectedResultIndex: number
  next(): void
  previous(): void
}

export const ResultList = ({ children }: { children(arg0: ResultListControls): any }) => {
  const [state, dispatch] = useReducer(selectableResultReducer, {
    index: -1,
    results: [],
  });

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
        })}
      </SelectableResultDispatchContext.Provider>
    </SelectableResultStateContext.Provider>
  );
}

type SelectableResultContext = {
  isActive: boolean,
  index: number,
}

export const SelectableResult = ({ children }: { children(arg0: SelectableResultContext): any }) => {
  const { index, results } = useContext(SelectableResultStateContext);
  const dispatch = useContext(SelectableResultDispatchContext)
  if (!dispatch) {
    throw new Error('SelectableResult has to be nested in ResultList');
  }

  const id = useMemo(() => {
    const id = {};
    dispatch && dispatch({ type: ActionType.register, result: id });
    return id;
  }, []);
  const indexOfId = results.indexOf(id);

  return children({
    isActive: index === indexOfId,
    index: indexOfId,
  });
}
