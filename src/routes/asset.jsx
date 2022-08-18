import { getAsset } from "../api";
import React from 'react';
import { withRouter } from './util/classhooks';

class Asset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            asset_name: props.router.params.assetName,
            asset_resource: null
        };
    }

    async componentDidMount() {
        const asset_resource = await getAsset(this.state.asset_name);
        this.setState({ asset_resource });
    }

    render() {
        return (
            <main style={{ padding: "1rem 0" }}>
                <h1>Asset:</h1>
                <h2>{JSON.stringify(this.state.asset_resource)}</h2>
            </main>
        );
    }
}

export default withRouter(Asset);
