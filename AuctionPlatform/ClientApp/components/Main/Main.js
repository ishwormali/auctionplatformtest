import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import AuctionList from '../AuctionList/AuctionList';
export default class Main extends React.Component {
    render() {
        return <div>
            <h1>Auction List</h1>
            <p>Select on any auction below to see details and bid.</p>
            <AuctionList></AuctionList>
        </div>;
    }
}
