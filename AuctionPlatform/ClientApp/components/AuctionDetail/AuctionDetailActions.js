import { fetchAuctions, addBid } from '../../api/AuctionsApi';
import { AuctionDetailActionTypes } from './AuctionDetailActionTypes';

export  function fetchAuctionDetail(dispatch) {
    return async (id) => {
        try {
            dispatch({ type: AuctionDetailActionTypes.pending });
            const auction = await fetchAuctions(id);
            dispatch({ type: AuctionDetailActionTypes.success, payload: auction });
        } catch (ex) {
            dispatch({ type: AuctionDetailActionTypes.error});
            throw ex;
        }
        
    }
}

export function bidAuction(dispatch) {
    return async (id,bidAmount) =>{
        try {
            dispatch({ type: AuctionDetailActionTypes.bidPending });
            const result = await addBid(id, bidAmount);
            if (result.success) {
                dispatch({ type: AuctionDetailActionTypes.bidSuccess, message:'Bid successful' });
            }
            else {
                dispatch({ type: AuctionDetailActionTypes.bidError, payload: result.message });
            }
        } catch (ex) {
            dispatch({ type: AuctionDetailActionTypes.bidError,payload:'Something went wrong' });
            throw ex;
        }
    }
}