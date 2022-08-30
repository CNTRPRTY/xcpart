import { getAsset } from "../api";
import React from 'react';
import { withRouter } from './shared/classhooks';
import { formattedAssetEventElement, formattedAssetTitleElement } from "./shared/elements"
// import { formattedAssetEventElement, formattedAssetElement } from "./shared/elements"
import { Link } from "react-router-dom";
import AssetDescriptionMedia from "../models/AssetDescriptionMedia"
import AssetDescriptionEnhancedMedia from "../models/AssetDescriptionEnhancedMedia"

// export default class Asset extends React.Component {
class Asset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anyname: props.anyName, // BUT withRouter still needed for this.props.router.navigate
            // anyname: props.router.params.anyName,
            // asset_name: props.router.params.assetName,

            asset_not_found: null,
            asset_btc_xcp: null,

            asset_resource: null,

            enhanced_media_element: null
        };
    }

    async fetchData(anyname) {
        // async fetchData(asset_name) {
        const asset_resource = await getAsset(anyname);
        // const asset_resource = await getAsset(asset_name);

        if (!asset_resource) {
            this.setState({ asset_not_found: true });
        }
        else if (
            asset_resource.asset_name === 'BTC' ||
            asset_resource.asset_name === 'XCP'
        ) {
            this.setState({ asset_btc_xcp: true });
        }
        else {

            const asset_name = asset_resource.asset_name;

            // this one redirects to longnames if their assetname was received
            if (asset_resource.asset_longname && (asset_resource.asset_longname !== anyname)) {
                // go to url (https://reactrouter.com/docs/en/v6/hooks/use-navigate)
                // replace: the navigation will replace the current entry in the history stack instead of adding a new one
                this.props.router.navigate(`/${asset_resource.asset_longname}`, { replace: true });
            }
            // this one fixes the casing for assetname
            else if (!asset_resource.asset_longname && (asset_resource.asset_name !== anyname)) {
                this.props.router.navigate(`/${asset_resource.asset_name}`, { replace: true });
            }
            else {
                ///////////////////////////////
                this.setState({ asset_resource });

                // then do the enhanced if applies
                // first reset
                this.setState({ enhanced_media_element: null });
                // then try it
                if (AssetDescriptionEnhancedMedia.checkIfDescriptionEnhancedMedia(asset_resource.latest_description_issuance.description)) {
                    // if (asset_resource.latest_description_issuance.description.endsWith('.json')) {
                    // const asset_name = asset_resource.asset_name;

                    this.setState({ enhanced_media_element: (<p>loading...</p>) });

                    const issuance_tx_index = asset_resource.latest_description_issuance.tx_index;
                    try {
                        const try_enhanced_media_element = await AssetDescriptionEnhancedMedia.getElementIfSuccessWithEnhancedMedia(asset_name, issuance_tx_index);
                        if (try_enhanced_media_element) {
                            this.setState({ enhanced_media_element: try_enhanced_media_element });
                        }
                        else {
                            this.setState({ enhanced_media_element: (<p>(unable to load content)</p>) });
                        }
                    } catch (err) {
                        // console.log(err);
                        this.setState({ enhanced_media_element: (<p>(unable to load content)</p>) });
                    }
                    // const try_enhanced_media_element = await AssetDescriptionEnhancedMedia.getElementIfSuccessWithEnhancedMedia(asset_name, issuance_tx_index);
                    // if (try_enhanced_media_element) {
                    //     this.setState({ enhanced_media_element: try_enhanced_media_element });
                    // }
                    // else {
                    //     this.setState({ enhanced_media_element: (<p>(unable to load content)</p>) });
                    // }
                }
                ///////////////////////////////
            }

        }

        // const asset_name = asset_resource.asset_name;

        // if (asset_resource.asset_longname && (asset_resource.asset_longname !== anyname)) {
        //     // go to url (https://reactrouter.com/docs/en/v6/hooks/use-navigate)
        //     // replace: the navigation will replace the current entry in the history stack instead of adding a new one
        //     this.props.router.navigate(`/${asset_resource.asset_longname}`, { replace: true });
        // }
        // else {
        //     ///////////////////////////////
        //     this.setState({ asset_resource });

        //     // then do the enhanced if applies
        //     // first reset
        //     this.setState({ enhanced_media_element: null });
        //     // then try it
        //     if (AssetDescriptionEnhancedMedia.checkIfDescriptionEnhancedMedia(asset_resource.latest_description_issuance.description)) {
        //         // if (asset_resource.latest_description_issuance.description.endsWith('.json')) {
        //         // const asset_name = asset_resource.asset_name;
        //         const issuance_tx_index = asset_resource.latest_description_issuance.tx_index;
        //         const try_enhanced_media_element = await AssetDescriptionEnhancedMedia.getElementIfSuccessWithEnhancedMedia(asset_name, issuance_tx_index);
        //         if (try_enhanced_media_element) {
        //             this.setState({ enhanced_media_element: try_enhanced_media_element });
        //         }
        //     }
        //     ///////////////////////////////
        // }

        // this.setState({ asset_resource });

        // // then do the enhanced if applies
        // // first reset
        // this.setState({ enhanced_media_element: null });
        // // then try it
        // if (AssetDescriptionEnhancedMedia.checkIfDescriptionEnhancedMedia(asset_resource.latest_description_issuance.description)) {
        //     // if (asset_resource.latest_description_issuance.description.endsWith('.json')) {
        //     // const asset_name = asset_resource.asset_name;
        //     const issuance_tx_index = asset_resource.latest_description_issuance.tx_index;
        //     const try_enhanced_media_element = await AssetDescriptionEnhancedMedia.getElementIfSuccessWithEnhancedMedia(asset_name, issuance_tx_index);
        //     if (try_enhanced_media_element) {
        //         this.setState({ enhanced_media_element: try_enhanced_media_element });
        //     }
        // }
    }

    async componentDidMount() {
        // const asset_resource = await getAsset(this.state.asset_name);
        // this.setState({ asset_resource });
        await this.fetchData(this.state.anyname);
        // await this.fetchData(this.state.asset_name);
    }

    // This method is not called for the initial render (https://reactjs.org/docs/react-component.html#componentdidupdate)
    async componentDidUpdate(prevProps) {
        const updatedAssetAnyame = this.props.anyName;
        // const updatedAssetAnyame = this.props.router.params.anyName;
        // Typical usage (don't forget to compare props):
        if (updatedAssetAnyame !== prevProps.anyName) {
            // if (updatedAssetAnyame !== prevProps.router.params.anyName) {
            // const updatedAssetName = this.props.router.params.assetName;
            // // Typical usage (don't forget to compare props):
            // if (updatedAssetName !== prevProps.router.params.assetName) {
            await this.fetchData(updatedAssetAnyame);
            // await this.fetchData(updatedAssetName);
        }
    }

    render() {
        if (this.state.asset_not_found) {
            return (
                <main style={{ padding: "1rem" }}>
                    {/* <main style={{ padding: "1rem 0" }}> */}
                    <h2>No asset found</h2>
                </main>
            );
        }
        else if (this.state.asset_btc_xcp) {
            // TODO: this was implemented very quickly to keep moving forward...
            return (
                <main style={{ padding: "1rem" }}>
                    {/* <main style={{ padding: "1rem 0" }}> */}
                    <h2>No BTC / XPC page...</h2>
                </main>
            );
        }
        else if (this.state.asset_resource) {
            // if (this.state.asset_resource) {


            let rarest_element = null;
            if (this.state.asset_resource.rarest) {
                // TODO make cooler

                rarest_element = (<p><b><Link to={`/_rarest`}>RAREST</Link>: {this.state.asset_resource.rarest}</b></p>);
                // rarest_element = (<p><b>RAREST: {this.state.asset_resource.rarest}</b></p>);
            }


            /////////
            let media_or_none = null; // done like this to be clear the next command can be null
            media_or_none = AssetDescriptionMedia.getElementIfDescriptionMedia(this.state.asset_resource.latest_description_issuance.description);

            if (this.state.enhanced_media_element) {
                media_or_none = this.state.enhanced_media_element;
            }
            // if (this.state.asset_resource.latest_description_issuance.description.endsWith('.json')) {
            //     media_or_none = (<li><a href={`https://7x9p9r8ln2.execute-api.us-east-1.amazonaws.com/mainnet/asset_name/${this.state.asset_resource.asset_name}/_enhanced/${this.state.asset_resource.latest_description_issuance.tx_index}`} target="_blank">+ see enhanced</a></li>);
            // }
            // const last_is_enhanced_element = this.state.asset_resource.latest_description_issuance.description.endsWith('.json') ? (<li><a href={`https://7x9p9r8ln2.execute-api.us-east-1.amazonaws.com/mainnet/asset_name/${this.state.asset_resource.asset_name}/_enhanced/${this.state.asset_resource.latest_description_issuance.tx_index}`} target="_blank">+ see enhanced</a></li>) : null;
            // // const last_is_enhanced_element = asset.latest_description_issuance.description.endsWith('.json') ? (<li><a href={`https://xchain.io/asset/${asset.asset_name}`} target="_blank">+ see enhanced</a></li>) : null;

            const superasset_element = this.state.asset_resource.superasset ? (<li>superasset: <Link to={`/${this.state.asset_resource.superasset}`}>{this.state.asset_resource.superasset}</Link></li>) : null;
            const subassets_list_element = this.state.asset_resource.subassets ? (<li>subassets:<ul>{this.state.asset_resource.subassets.map((subasset) => (<li key={subasset}><Link to={`/${subasset}`}>{subasset}</Link></li>))}</ul></li>) : null;
            // const superasset_element = asset.superasset ? (<li>superasset: <Link to={`/assets/${asset.superasset}`}>{asset.superasset}</Link></li>) : null;
            // const subassets_list_element = asset.subassets ? (<li>subassets:<ul>{asset.subassets.map((subasset) => (<li key={subasset}><Link to={`/assets/${subasset}`}>{subasset}</Link></li>))}</ul></li>) : null;        
            /////////

            // not convinced... kinda goes against the point of BEING PURE! ideally, A SINGLE LOCKED ISSUANCE!
            // /////////////
            // const genesis_event = this.state.asset_resource.events[0];
            // const genesis_element = (<li>genesis: {genesis_event.block_timestamp_iso} [block: {genesis_event.block_index}]</li>);
            // /////////////

            return (
                <main style={{ padding: "1rem" }}>
                    {/* <main style={{ padding: "1rem 0" }}> */}
                    <h1>Asset:</h1>
                    <h2>{formattedAssetTitleElement(this.state.asset_resource, null, null, false)}</h2>
                    {/* <h2>{formattedAssetElement(this.state.asset_resource, null, null, false)}</h2> */}
                    {/* <h2>{formattedAssetElement(this.state.asset_resource)}</h2> */}
                    {/* <h2>{JSON.stringify(this.state.asset_resource)}</h2> */}
                    {/* {formattedAssetPageDetailsElement(this.state.asset_resource)} */}


                    <ul>
                        {rarest_element}
                        {/* <li>[locked:{`${asset.locked}`}]</li> */}
                        {/* <li>[locked:{`${asset.locked}`}][divisible:{`${asset.divisible}`}]</li> */}
                        {media_or_none}
                        {/* {last_is_enhanced_element} */}
                        {superasset_element}
                        {/* {genesis_element} */}
                        <li>events:<ul>{this.state.asset_resource.events.map((asset_event) => (<li key={asset_event.tx_index}>{formattedAssetEventElement(asset_event, this.state.asset_resource.asset_name, this.state.asset_resource.asset_longname)}</li>))}</ul></li>
                        {/* <li>events:<ul>{this.state.asset_resource.events.map((asset_event) => (<li key={asset_event.tx_index}>{formattedAssetEventElement(asset_event)}</li>))}</ul></li> */}
                        {/* <li>events:<ul>{asset.events.map((asset_event) => (<li key={asset_event.tx_index}>{formattedAssetEventElement(asset_event)}</li>))}</ul></li> */}
                        {/* <li>events:<ul>{asset.events.map((asset_event) => (<li key={asset_event.tx_index}>{JSON.stringify(asset_event)}</li>))}</ul></li> */}
                        {/* <li>events:{asset.events.map((asset_event) => formattedAssetEventElement(asset_event))}</li> */}
                        {subassets_list_element}
                    </ul>

                    {/* <ul>
                        <li>[locked:{`${asset.locked}`}][divisible:{`${asset.divisible}`}]</li>
                        <li>first issuance: {JSON.stringify(asset.first_issuance)}</li>
                        {locked_issuance_list_element}
                        {latest_description_issuance_list_element}
                        {JSON.stringify(asset.events)}
                        <li>first issuance: {asset.description_first.description}</li>
                    </ul> */}


                </main>
            );
        }
        else {
            return (
                <main style={{ padding: "1rem" }}>
                    {/* <main style={{ padding: "1rem 0" }}> */}
                    <h2>loading...</h2>
                </main>
            );
        }
    }
}

export default withRouter(Asset);
