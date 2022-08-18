import { getAssetRoot } from "../api";
import React from 'react';
import { Link } from "react-router-dom";

function formattedAssetElement(asset, is_locked_nft = false) {
    const pretty_name = asset.asset_longname ? asset.asset_longname : asset.asset_name;
    const is_unlocked = asset.locked ? '' : ' (unlocked)';
    const last_is_enhanced = asset.description_latest.description.endsWith('.json');
    let total_element = ` [total:${asset.total}${is_unlocked}]`;
    if (is_locked_nft) {
        total_element = '';
    }
    return (
        <ul key={asset.asset_name}>
            <li>{last_is_enhanced ? 'thumb!' : ''}<Link to={`/assets/${pretty_name}`}>{pretty_name}</Link>{total_element}</li>
            {/* <li>{last_is_enhanced ? 'thumb!' : ''}<Link to={`/assets/${pretty_name}`}>{pretty_name}</Link> [total:{asset.total}{is_unlocked}]</li> */}
            <li>{asset.description_first.block_timestamp_iso}</li>
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

                <h2>Latest Locked NFTs</h2>
                {this.state.latest_locked_nft.map((asset) => formattedAssetElement(asset, true))}

                <h2>Latest Locked</h2>
                {this.state.latest_locked.map((asset) => formattedAssetElement(asset))}

                <h2>Latest</h2>
                {this.state.latest.map((asset) => formattedAssetElement(asset))}

            </main>
        );
    }
}
