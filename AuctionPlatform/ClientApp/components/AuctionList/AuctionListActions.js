import { fetchAuctions } from '../../api/AuctionsApi';
import { AuctionListActionTypes } from './AuctionListActionTypes';

export  function fetchAuctionList(dispatch) {
    return async () => {
        dispatch({ type: AuctionListActionTypes.pending });
        const auctions = await fetchAuctions();
        dispatch({ type: AuctionListActionTypes.success, payload: auctions });

    }
}