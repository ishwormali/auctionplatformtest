import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchAuctionDetail,bidAuction } from './AuctionDetailActions';
import { Button,Panel,Alert,FormControl,Form,FormGroup,ControlLabel } from 'react-bootstrap';

class AuctionDetail extends React.Component {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            
        }
    }

    async componentDidMount() {
        this.props.fetchAuctionDetail(this.props.match.params.id);
        
    }
    async bid() {
        const auctionDetail = this.props.auctionDetail;
        const bidAmount = this.state.bidAmount;
        if (bidAmount >= auctionDetail.highestBid) {
            try {
                await this.props.bidAuction(auctionDetail.id, bidAmount);

            } catch (ex) {

            }
        }
        
        
    }
    handleChange(e) {
        this.setState({ bidAmount: e.target.value });
    }
    render() {
        const { auctionDetail, isBidding, message } = this.props;
        let { bidAmount } = this.state;
        bidAmount = bidAmount || auctionDetail.highestBid+1;

        return <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6">
                {auctionDetail && <Panel bsStyle="primary">
                    <Panel.Heading>
                        <h4>{auctionDetail.title}</h4>
                    </Panel.Heading>
                    <Panel.Body>
                        <p>{auctionDetail.description}</p>
                        <p>Highest bid : {auctionDetail.highestBid} </p>
                        <Form inline>
                            {auctionDetail.canBid && <div>
                                <ControlLabel>Bid Amount</ControlLabel>
                                <FormControl
                                    type="number"
                                    value={bidAmount}
                                    placeholder="Amount"
                                    onChange={this.handleChange} min={auctionDetail.highestBid}
                                    disabled={isBidding}

                                /></div>}
                                <Button bsStyle="primary" disabled={isBidding || (auctionDetail.canBid == false)} onClick={this.bid.bind(this)}>Bid</Button>

                            </Form>
                           
                        
                        {message && <p>
                            <Alert >
                                {message}
                            </Alert>
                        </p>}
                    </Panel.Body>
                </Panel>}
            </div>
            
            <div className="col-sm-3"></div>
        </div>

    }

    
}

function mapDispatchToProps(dispatch) {
    return {
        fetchAuctionDetail: fetchAuctionDetail(dispatch),
        bidAuction: bidAuction(dispatch)
    };
}

export default connect(
    (state) => state.auctionDetail,
    mapDispatchToProps
)(AuctionDetail);
