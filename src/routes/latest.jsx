import React from 'react';
import { getLatest } from "../api";
// import { getAssetRoot } from "../api";
import { formattedAssetElement } from "./shared/elements"
import IssuanceEvent from "../models/IssuanceEvent";

export default class Latest extends React.Component {
    // export default class Assets extends React.Component {
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
        const latest_root = await getLatest();
        this.setState({
            latest: latest_root.latest,
            latest_locked: latest_root.latest_locked,
            latest_locked_nft: latest_root.latest_locked_nft,
            latest_locked_nftnd: latest_root.latest_locked_nftnd
            // latest_locked_nft_satoshi: latest_root.latest_locked_nft_satoshi
        });
    }

    render() {
        return (
            <main style={{ padding: "1rem 0" }}>
                <h1>Latest assets:</h1>
                {/* <h1>Assets</h1> */}

                <h2>Description added NFT [no destroy]</h2>
                {/* <h2>Description updated NFT [no destroy]</h2> */}
                {/* <h2>[RAREST] Latest Updated Locked NFTND</h2> */}
                {this.state.latest_locked_nftnd.length === 0 ? 'loading...' : null}
                {this.state.latest_locked_nftnd.map((asset) => formattedAssetElement(asset, asset.latest_description_issuance, IssuanceEvent.TYPES.UPDATE_DESCRIPTION, true))}
                {/* <h2>[RAREST] Latest Updated Locked NFTsatoshi NOdestroys</h2>
                {this.state.latest_locked_nft_satoshi.length === 0 ? 'loading...' : null}
                {this.state.latest_locked_nft_satoshi.map((asset) => formattedAssetElement(asset, asset.latest_description_issuance, IssuanceEvent.TYPES.UPDATE_DESCRIPTION, true))} */}

                {/* <h2>Quantity updated NFT [by destroy]</h2> */}
                <h2>Quantity changed NFT [by destroy]</h2>
                {/* <h2>Latest Updated Locked NFT</h2> */}
                {this.state.latest_locked_nft.length === 0 ? 'loading...' : null}
                {this.state.latest_locked_nft.map((asset) => formattedAssetElement(asset, asset.block_event, IssuanceEvent.TYPES.UPDATE_QUANTITY, true))}
                {/* {this.state.latest_locked_nft.map((asset) => formattedAssetElement(asset, asset.latest_description_issuance, IssuanceEvent.TYPES.UPDATE_QUANTITY, true))} */}
                {/* {this.state.latest_locked_nft.map((asset) => formattedAssetElement(asset, true))} */}

                <h2>Latest Locked</h2>
                {/* <h2>Locked</h2> */}
                {this.state.latest_locked.length === 0 ? 'loading...' : null}
                {this.state.latest_locked.map((asset) => formattedAssetElement(asset, asset.lock_issuance, IssuanceEvent.TYPES.LOCK))}
                {/* {this.state.latest_locked.map((asset) => formattedAssetElement(asset))} */}

                <h2>Created (includes unlocked)</h2>
                {/* <h2>Latest</h2> */}
                {this.state.latest.length === 0 ? 'loading...' : null}
                {this.state.latest.map((asset) => formattedAssetElement(asset, asset.first_issuance, IssuanceEvent.TYPES.GENESIS))}
                {/* {this.state.latest.map((asset) => formattedAssetElement(asset))} */}

            </main>
        );
    }
}
