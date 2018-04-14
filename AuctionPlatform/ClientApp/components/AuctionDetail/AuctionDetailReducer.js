import { AuctionDetailActionTypes } from './AuctionDetailActionTypes';

const initialState = {
    isLoading: false, auctionDetail: {},isBidding:false,bidError:'' };

export default (state=initialState, action) => {
    switch (action.type) {
        case AuctionDetailActionTypes.pending:
            return Object.assign({}, state, { isLoading: true, message: '' });
        case AuctionDetailActionTypes.success:
            return Object.assign({}, state, { isLoading: false, auctionDetail: action.payload, bidError: '' });
        case AuctionDetailActionTypes.error:
            return Object.assign({}, state, { isLoading: false, message: '' });
        case AuctionDetailActionTypes.bidPending:
            return Object.assign({}, state, { isBidding: true,message:'' });
        case AuctionDetailActionTypes.bidSuccess:
            return Object.assign({}, state, { isBidding: false, message: action.message, auctionDetail: Object.assign({}, state.auctionDetail, { canBid: false }) });
        case AuctionDetailActionTypes.bidError:
            return Object.assign({}, state, { isBidding: false, message: action.payload });
        default:
            
            return state;
    }
    
};
