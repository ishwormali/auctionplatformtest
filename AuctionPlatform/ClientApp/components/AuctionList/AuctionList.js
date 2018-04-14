import * as React from 'react';
import { NavLink, Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAuctionList } from './AuctionListActions';
import { Button } from 'react-bootstrap';

class AuctionList extends React.Component {

    async componentWillMount() {
        this.props.fetchAuctionList();
    }

    render() {
        const { auctionList } = this.props;
        return <div>
            {this.renderTable()}
            </div>
        
    }

    renderTable() {
        let { auctionList } = this.props;
        auctionList = auctionList || [];
        return <table className='table'>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Created</th>
                    <th>Ends on</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {auctionList.map(auctionItem =>
                    <tr key={auctionItem.id }>
                        <td>{auctionItem.title }</td>
                        <td>{auctionItem.description}</td>
                        <td>{auctionItem.createdDateFormat }</td>
                        <td>{auctionItem.auctionEndDateFormat}</td>
                        <td> <NavLink to={`/auctions/${auctionItem.id}`} ><Button bsStyle="primary">View</Button></NavLink></td>
                </tr>
            )}
            </tbody>
        </table>;
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchAuctionList: fetchAuctionList(dispatch)
    };
}

export default connect(
    (state) => state.auctionList,
    mapDispatchToProps               
)(AuctionList) ;
