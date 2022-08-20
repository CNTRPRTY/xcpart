import React from 'react';
import { getAssetRoot } from "../api";
import { formattedAssetElement } from "./shared/elements"
import IssuanceEvent from "../models/IssuanceEvent";

export default class Assets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latest: [],
            latest_locked: [],
            latest_locked_nft: []
        };
    }

    async componentDidMount() {
        const asset_root = await getAssetRoot();
        this.setState({
            latest: asset_root.latest,
            latest_locked: asset_root.latest_locked,
            latest_locked_nft: asset_root.latest_locked_nft
        });
    }

    render() {
        return (
            <main style={{ padding: "1rem 0" }}>
                <h1>Assets</h1>

                <h2>Latest Updated Locked NFT</h2>
                {this.state.latest_locked_nft.length === 0 ? 'loading...' : null}
                {this.state.latest_locked_nft.map((asset) => formattedAssetElement(asset, asset.latest_description_issuance, IssuanceEvent.TYPES.UPDATE_QUANTITY, true))}
                {/* {this.state.latest_locked_nft.map((asset) => formattedAssetElement(asset, true))} */}

                <h2>Latest Locked</h2>
                {this.state.latest_locked.length === 0 ? 'loading...' : null}
                {this.state.latest_locked.map((asset) => formattedAssetElement(asset, asset.lock_issuance, IssuanceEvent.TYPES.LOCK))}
                {/* {this.state.latest_locked.map((asset) => formattedAssetElement(asset))} */}

                <h2>Latest</h2>
                {this.state.latest.length === 0 ? 'loading...' : null}
                {this.state.latest.map((asset) => formattedAssetElement(asset, asset.first_issuance, IssuanceEvent.TYPES.GENESIS))}
                {/* {this.state.latest.map((asset) => formattedAssetElement(asset))} */}

            </main>
        );
    }
}
