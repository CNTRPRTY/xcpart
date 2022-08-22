import React from 'react';
import { getAssetRoot } from "../api";
import { formattedAssetElement } from "./shared/elements"
import IssuanceEvent from "../models/IssuanceEvent";

export default class Rarest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latest: [],
            latest_locked: [],
            latest_locked_nft: [],
            latest_locked_nftnd: []
            // latest_locked_nft_satoshi: []
        };
    }

    async componentDidMount() {
        const asset_root = await getAssetRoot();
        this.setState({
            latest: asset_root.latest,
            latest_locked: asset_root.latest_locked,
            latest_locked_nft: asset_root.latest_locked_nft,
            latest_locked_nftnd: asset_root.latest_locked_nftnd
            // latest_locked_nft_satoshi: asset_root.latest_locked_nft_satoshi
        });
    }

    render() {
        return (
            <main style={{ padding: "1rem 0" }}>
                <h1>Rarest assets:</h1>

                <h2>First locked NFT [no destroy] divisibility:satoshi</h2>
                {/* <h2>[RAREST] Latest Updated Locked NFTND</h2> */}
                {this.state.latest_locked_nftnd.length === 0 ? 'loading...' : null}
                {this.state.latest_locked_nftnd.map((asset) => formattedAssetElement(asset, asset.latest_description_issuance, IssuanceEvent.TYPES.UPDATE_DESCRIPTION, true))}
                {/* <h2>[RAREST] Latest Updated Locked NFTsatoshi NOdestroys</h2>
                {this.state.latest_locked_nft_satoshi.length === 0 ? 'loading...' : null}
                {this.state.latest_locked_nft_satoshi.map((asset) => formattedAssetElement(asset, asset.latest_description_issuance, IssuanceEvent.TYPES.UPDATE_DESCRIPTION, true))} */}

            </main>
        );
    }
}
