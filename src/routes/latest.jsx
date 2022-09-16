import React from 'react';
import { getLatest } from "../api";
// import { getAssetRoot } from "../api";
import { formattedAssetInListElement } from "./shared/elements"
// import { formattedAssetElement } from "./shared/elements"
import IssuanceEvent from "../models/IssuanceEvent";

import { Link } from "react-router-dom";

export default class Latest extends React.Component {
    // export default class Assets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            last: null,

            addresses: [],

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
            last: latest_root.last,
            addresses: latest_root.addresses,
            latest: latest_root.latest,
            latest_locked: latest_root.latest_locked,
            latest_locked_nft: latest_root.latest_locked_nft,
            latest_locked_nftnd: latest_root.latest_locked_nftnd
            // latest_locked_nft_satoshi: latest_root.latest_locked_nft_satoshi
        });
    }

    render() {

        let last_time = ``;
        if (this.state.last) {
            last_time = `Last updated: ${this.state.last.block_timestamp_iso} [block: ${this.state.last.block_index}]`;
            // last_time = `Last updated: ${this.state.last.block_timestamp_iso.split('T')[0]} [block: ${this.state.last.block_index}]`;
            // last_time = ` ${this.state.last.block_timestamp_iso.split('T')[0]} [block: ${this.state.last.block_index}]`;
            // last_time = ` ${this.state.last.block_timestamp_iso} [block: ${this.state.last.block_index}]`;
        }

        return (
            <main style={{ padding: "1rem" }}>
                {/* <main style={{ padding: "1rem 0" }}> */}

                {/* <h1><strong>2022-09-10: Updates to the data have paused, but <Link to="/_all">all</Link> past data is still available.</strong></h1> */}

                {/* <h1>Latest:{last_time}</h1> */}
                <h1>Latest:</h1>

                <p>{last_time}</p>

                <h2>Active addresses:</h2>
                {/* <h1>Latest active addresses:</h1> */}
                {this.state.addresses.length === 0 ? 'loading...' : null}
                {this.state.addresses.map((address) => (
                    <ul key={address}>
                        <li><Link to={`/${address}`}>{address}</Link></li>
                    </ul>
                ))}

                <br />
                <h2>Asset events:</h2>
                {/* <h2>Assets events:</h2> */}
                {/* <h1>Latest assets:</h1> */}
                {/* <h1>Assets</h1> */}

                <h3>Description added NFT [no destroy]:</h3>
                {/* <h2>Description added NFT [no destroy]</h2> */}
                {/* <h2>Description updated NFT [no destroy]</h2> */}
                {/* <h2>[RAREST] Latest Updated Locked NFTND</h2> */}
                {this.state.latest_locked_nftnd.length === 0 ? 'loading...' : null}
                {this.state.latest_locked_nftnd.map((asset) => formattedAssetInListElement(asset, asset.latest_description_issuance, IssuanceEvent.TYPES.UPDATE_DESCRIPTION, true))}
                {/* {this.state.latest_locked_nftnd.map((asset) => formattedAssetElement(asset, asset.latest_description_issuance, IssuanceEvent.TYPES.UPDATE_DESCRIPTION, true))} */}
                {/* <h2>[RAREST] Latest Updated Locked NFTsatoshi NOdestroys</h2>
                {this.state.latest_locked_nft_satoshi.length === 0 ? 'loading...' : null}
                {this.state.latest_locked_nft_satoshi.map((asset) => formattedAssetElement(asset, asset.latest_description_issuance, IssuanceEvent.TYPES.UPDATE_DESCRIPTION, true))} */}

                {/* <h2>Quantity updated NFT [by destroy]</h2> */}
                <h3>Quantity changed NFT [by destroy]:</h3>
                {/* <h2>Quantity changed NFT [by destroy]</h2> */}
                {/* <h2>Latest Updated Locked NFT</h2> */}
                {this.state.latest_locked_nft.length === 0 ? 'loading...' : null}
                {this.state.latest_locked_nft.map((asset) => formattedAssetInListElement(asset, asset.block_event, IssuanceEvent.TYPES.UPDATE_QUANTITY, true))}
                {/* {this.state.latest_locked_nft.map((asset) => formattedAssetElement(asset, asset.block_event, IssuanceEvent.TYPES.UPDATE_QUANTITY, true))} */}
                {/* {this.state.latest_locked_nft.map((asset) => formattedAssetElement(asset, asset.latest_description_issuance, IssuanceEvent.TYPES.UPDATE_QUANTITY, true))} */}
                {/* {this.state.latest_locked_nft.map((asset) => formattedAssetElement(asset, true))} */}

                <h3>Latest Locked:</h3>
                {/* <h2>Latest Locked</h2> */}
                {/* <h2>Locked</h2> */}
                {this.state.latest_locked.length === 0 ? 'loading...' : null}
                {this.state.latest_locked.map((asset) => formattedAssetInListElement(asset, asset.lock_issuance, IssuanceEvent.TYPES.LOCK))}
                {/* {this.state.latest_locked.map((asset) => formattedAssetElement(asset, asset.lock_issuance, IssuanceEvent.TYPES.LOCK))} */}
                {/* {this.state.latest_locked.map((asset) => formattedAssetElement(asset))} */}

                <h3>Created (includes unlocked):</h3>
                {/* <h2>Created (includes unlocked)</h2> */}
                {/* <h2>Latest</h2> */}
                {this.state.latest.length === 0 ? 'loading...' : null}
                {this.state.latest.map((asset) => formattedAssetInListElement(asset, asset.first_issuance, IssuanceEvent.TYPES.GENESIS))}
                {/* {this.state.latest.map((asset) => formattedAssetElement(asset, asset.first_issuance, IssuanceEvent.TYPES.GENESIS))} */}
                {/* {this.state.latest.map((asset) => formattedAssetElement(asset))} */}

            </main>
        );
    }
}
