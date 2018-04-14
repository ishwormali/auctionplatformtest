import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';

import Main from './components/Main/Main';
import AuctionDetail from './components/AuctionDetail/AuctionDetail';

export const routes = <Layout>
    <Route exact path='/' component={Main} />
    <Route exact path='/auctions/:id' component={AuctionDetail} />
</Layout>;
