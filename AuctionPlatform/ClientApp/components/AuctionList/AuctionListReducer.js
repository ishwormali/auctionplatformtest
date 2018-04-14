import { AuctionListActionTypes } from './AuctionListActionTypes';

const initialState = { isLoading: false, auctionList: [] };

export default (state=initialState, action) => {
    switch (action.type) {
        case AuctionListActionTypes.pending:
            return Object.assign({}, state, { isLoading: true });
        case AuctionListActionTypes.success:
            return Object.assign({}, state, {isLoading: false, auctionList: action.payload });
        case AuctionListActionTypes.error:
            return Object.assign({}, state, {isLoading: false });
        default:
            
            return state;
    }
    
};
