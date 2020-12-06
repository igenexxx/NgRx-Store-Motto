import * as fromToppings from '../actions/toppings.action';
import {Topping} from '../../models/topping.model';
import {Pizza} from "../../models/pizza.model";
import {PizzaState} from "./pizzas.reducer";
import {createSelector} from "@ngrx/store";
import {getToppingsState} from "../selectors/toppings.selectors";

export interface ToppingsState {
  entities: { [id: number]: Topping };
  loading: boolean;
  loaded: boolean;
  selectedToppings: number[];
}

export const initialState: ToppingsState = {
  entities: {},
  loaded: false,
  loading: false,
  selectedToppings: [],
};

export function reducer(
  state = initialState,
  action: fromToppings.ToppingsAction
): ToppingsState {
  switch (action.type) {
    case fromToppings.VISUALISE_TOPPINGS:
      const selectedToppings = action.payload;

      return {
        ...state,
        selectedToppings,
      };
    case fromToppings.LOAD_TOPPINGS:
      return {
        ...state,
        loading: true,
      };
    case fromToppings.LOAD_TOPPINGS_SUCCESS:
      const toppings = action.payload;
      const entities = toppings.reduce((entities: Pick<ToppingsState, 'entities'>, topping: Topping) => {
        return {
          ...entities,
          [topping.id]: topping,
        }
      }, {
        ...state.entities,
      });

      return {
        ...state,
        entities,
        loading: false,
        loaded: true
      };
    case fromToppings.LOAD_TOPPINGS_FAIL:
      return {
        ...state,
        loaded: false,
        loading: false,
      };
  }
  return state;
}

export const getToppingEntities = (state: ToppingsState) => state.entities;
export const getToppingLoaded = (state: ToppingsState) => state.loading;
export const getToppingLoading = (state: ToppingsState) => state.loaded;
export const getSelectedToppings = (state: ToppingsState) => state.selectedToppings;
