import { getAssetRoot } from "../api";
import React from 'react';

function formattedAssetElement(asset) {
    // {
    // "asset_name": "A8985763371986362000",
    // "locked": false,
    // "total": 2000000,
    // "divisible": false,
    // "description_first": {
    //     "tx_index": 1107697,
    //     "block_timestamp_iso": "2017-10-30T08:15:47Z",
    //     "description": "noracoin"
    // },
    // "description_latest": {
    //     "tx_index": 1107697,
    //     "block_timestamp_iso": "2017-10-30T08:15:47Z",
    //     "description": "noracoin"
    // },
    const pretty_name = asset.asset_longname ? asset.asset_longname : asset.asset_name;
    const is_unlocked = asset.locked ? '' : ' (unlocked)'
    return (
        <ul key={asset.asset_name}>
            <li>{pretty_name}</li>
            {/* <li>{asset.asset_name}</li> */}
            <li>{asset.total}{is_unlocked}</li>
        </ul>
    );
}

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
                <h2>Latest</h2>
                {this.state.latest.map((asset) => formattedAssetElement(asset))}
                <h2>Latest Locked</h2>
                {this.state.latest_locked.map((asset) => formattedAssetElement(asset))}
                <h2>Latest Locked NFT</h2>
                {this.state.latest_locked_nft.map((asset) => formattedAssetElement(asset))}
            </main>
        );
    }
}
