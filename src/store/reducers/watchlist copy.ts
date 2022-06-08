import { AnyAction } from 'redux';
import Stock from '../../models/Stock';
//import Coin from '../../models/Coin copy';
import { SET_WATCHLISTCOPY_DATA } from '../actions/watchlist copy';
import Coincopy from '../../models/Coin copy';

export interface WatchlistcopyState {
  watchlistcopyData: Coincopy[];
}

const initialState: WatchlistcopyState = {
  watchlistcopyData: [],
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_WATCHLISTCOPY_DATA:
      return {
        watchlistcopyData: action.coinData,
      };
  }
  return state;
};
