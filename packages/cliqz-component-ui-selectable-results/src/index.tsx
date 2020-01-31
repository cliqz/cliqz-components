import React, { useContext, useReducer, ComponentType, useMemo, useImperativeHandle, Ref, forwardRef, useState, useCallback, RefObject } from 'react';

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

export type ResultListValues = {
  selectedResultIndex: number,
  results: any[],
}

export type ResultListControls = {
  next(): void
  previous(): void
  clear(): void
  updateResults(results: any): void
}

export const ResultList = forwardRef((
  { children }:
  { children(arg0: ResultListValues): any },
  ref: Ref<ResultListControls>
) => {
  const [state, dispatch] = useReducer(selectableResultReducer, defaultState);

  const api: ResultListControls = {
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
  };

  if (ref) {
    useImperativeHandle(ref, () => api);
  }

  return (
    <SelectableResultStateContext.Provider value={state}>
      <SelectableResultDispatchContext.Provider value={dispatch}>
        {children({
          selectedResultIndex: state.index,
          results: state.results,
        })}
      </SelectableResultDispatchContext.Provider>
    </SelectableResultStateContext.Provider>
  );
});

export type SelectableResultProps = {
  isActive?: boolean,
  index?: number,
}

export const withSelectableResult = <T extends SelectableResultProps = SelectableResultProps>(WrappedComponent: ComponentType<T>) => (props: T) => {
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
    <WrappedComponent isActive={index === indexOfId} index={indexOfId} {...props as T} />
  )
};

export const useResults = (ref: RefObject<ResultListControls>, defaultResults: any[]): [any[], any] => {
  let [results, setResults] = useState(defaultResults);
  const updateResults = useCallback((newResults: any[]) => {
    setResults(newResults);
    if (ref.current) {
      ref.current.updateResults(newResults);
    }
  }, [setResults, ref.current]);

  return [results, updateResults];
}