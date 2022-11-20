import { getAsset } from "../api";
import React from 'react';
import { withRouter } from './shared/classhooks';
// import { formattedAssetTitleElement } from "./shared/elements"
// import { formattedAssetEventElement, formattedAssetElement } from "./shared/elements"
import { Link } from "react-router-dom";
import AssetDescriptionMedia from "../models/AssetDescriptionMedia"
import AssetDescriptionEnhancedMedia from "../models/AssetDescriptionEnhancedMedia"


async function setupMedia(self, asset_name, description_issuance) {
    ///////////////////////////////
    // this.setState({ asset_resource });

    if (
        description_issuance && // only do if there is an issuance
        (self.state.media_element_selected !== description_issuance.tx_index) // if is the one already selected, do nothing
    ) {

        ////////////////////////////////////////////////////////////
        // then do the media if applies

        // set selected
        self.setState({ media_element_selected: description_issuance.tx_index });

        // start trying normal media
        let media_or_none = null; // done like this to be clear the next command can be null
        media_or_none = AssetDescriptionMedia.getElementIfDescriptionMedia(description_issuance.description);
        // media_or_none = AssetDescriptionMedia.getElementIfDescriptionMedia(asset_resource.latest_description_issuance.description);

        if (media_or_none) {
            self.setState({ media_element: media_or_none });
        }

        // if not normal, then try enhanced
        else if (AssetDescriptionEnhancedMedia.checkIfDescriptionEnhancedMedia(description_issuance.description)) {
            // if (AssetDescriptionEnhancedMedia.checkIfDescriptionEnhancedMedia(asset_resource.latest_description_issuance.description)) {
            // if (asset_resource.latest_description_issuance.description.endsWith('.json')) {
            // const asset_name = asset_resource.asset_name;

            self.setState({ media_element: (<p>loading...</p>) });

            // const issuance_tx_index = asset_resource.latest_description_issuance.tx_index;
            try {
                const try_enhanced_media_element = await AssetDescriptionEnhancedMedia.getElementIfSuccessWithEnhancedMedia(asset_name, description_issuance.tx_index);
                if (try_enhanced_media_element) {
                    self.setState({ media_element: try_enhanced_media_element });
                }
                else {
                    self.setState({ media_element: (<p>(unable to load content)</p>) });
                }
            } catch (err) {
                // console.log(err);
                self.setState({ media_element: (<p>(unable to load content)</p>) });
            }

        }
        ////////////////////////////////////////////////////////////

    }

}

// https://stackoverflow.com/a/42964862
class ActionLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parentSelf: props.parentSelf,

            asset_name: props.assetName,
            description_issuance: props.descriptionIssuance,
        };
        this.handleClick = this.handleClick.bind(this);

    }

    handleClick(e) {
        e.preventDefault();

        // not awaiting it
        setupMedia(this.state.parentSelf, this.state.asset_name, this.state.description_issuance);

        // console.log(`rrrrrrrrr1`);
        // console.log(`${this.state.asset_name}`);
        // console.log(`${this.state.issuance_tx_index}`);
        // console.log(`rrrrrrrrr2`);
    };

    render() {
        return (<a href="#" onClick={this.handleClick}>m</a>);
    }
}


// function formattedAssetBelowTitleElement(asset, event = null, event_type = null, is_locked_nft = false) {

//     // const pretty_name = asset.asset_longname ? asset.asset_longname : asset.asset_name;
//     const is_unlocked = asset.locked ? '' : ' (unlocked)';

//     let asset_total = ` [quantity: ${asset.total}${is_unlocked}]`;
//     // let asset_total = ` [total: ${asset.total}${is_unlocked}]`;
//     if (is_locked_nft) {
//         asset_total = '';
//     }

//     // const events_total = ` [events: ${asset.events.length}]`;

//     const is_superasset_subassets_amount = asset.subassets ? ` [subassets: ${asset.subassets.length}]` : '';

//     return `${asset_total}${is_superasset_subassets_amount}`;
//     // return (
//     //     <p>
//     //         {asset_total}{is_superasset_subassets_amount}
//     //         {/* {events_total}{asset_total}{is_superasset_subassets_amount} */}
//     //     </p>
//     // );
// }

// TODO! this function proves the need for some kind of api docs for these asset events...
// funny function parameters in that it only uses the asset_name if there is an asset_longname
function formattedAssetEventElement(parentSelf, asset_event, asset_name, asset_longname = null) {
    // function formattedAssetEventElement(asset_event, asset_name, asset_longname = null) {


    // now checking if a description is media to make it selectable
    // const asset_name = asset_resource.asset_name;
    let updated_description_element = null;
    if (asset_event.description) {
        if (
            AssetDescriptionMedia.checkIfDescriptionMedia(asset_event.description) ||
            AssetDescriptionEnhancedMedia.checkIfDescriptionEnhancedMedia(asset_event.description)
        ) {


            const actionLink = (<ActionLink parentSelf={parentSelf} assetName={asset_name} descriptionIssuance={asset_event} />);
            //////////
            // key from list: asset_event.tx_index
            let selectedActionLink;
            if (parentSelf.state.media_element_selected === asset_event.tx_index) {
                selectedActionLink = (<b>m</b>);
                // selectedActionLink = (<b>{actionLink}</b>);
            }
            else {
                selectedActionLink = (<span> {actionLink} </span>);
                // selectedActionLink = actionLink;
            }
            //////////


            updated_description_element = (<li>[{selectedActionLink}] description: {asset_event.description}</li>);
            // updated_description_element = (<li>[<ActionLink parentSelf={parentSelf} assetName={asset_name} descriptionIssuance={asset_event} />] description: {asset_event.description}</li>);
        }
        else {
            updated_description_element = (<li>description: {asset_event.description}</li>);
        }
    }


    // // AND changed back because the ones that are genesis issued without description show empty and this is more common
    // // changed to undefined check to be able to show when the description is deleted (DIRECTORYONE)
    // // const updated_description_element = (asset_event.description !== undefined) ? (<li>description: {asset_event.description}</li>) : null;
    // const updated_description_element = asset_event.description ? (<li>description: {asset_event.description}</li>) : null;

    const locked_element = asset_event.locked ? (<li>LOCK</li>) : null;

    const quantity_element = (asset_event.quantity !== undefined) ? (<li>{asset_event.type}: {asset_event.quantity}</li>) : null;

    // if issuer is in the results, and there is no source, then it is first issuance
    // else if issuer is in the results, then a source should also be
    let genesis_created_top = null;

    let genesis_or_transfer_element = null;
    if (asset_event.issuer) {
        if (!asset_event.source) {

            let is_subasset_assetname = '';
            if (asset_longname) {
                is_subasset_assetname = ` [subasset: ${asset_name}]`;
            }

            genesis_created_top = (<li>genesis:{is_subasset_assetname} [divisibility: {asset_event.divisible ? 'satoshi' : 'whole number'}]</li>);
            genesis_or_transfer_element = (<li>issuer: <Link to={`/${asset_event.issuer}`}>{asset_event.issuer}</Link></li>);

        }
        else {
            genesis_or_transfer_element = (<li>issuer transfer: <Link to={`/${asset_event.issuer}`}>{asset_event.issuer}</Link></li>);
        }
    }

    return (
        <ul style={{ "listStyleType": "none" }}>
            {/* <ul style={{ "list-style-type": "none" }}> */}
            {genesis_created_top}
            <li>{asset_event.block_timestamp_iso} [block: <Link to={`/${asset_event.block_index}`}>{asset_event.block_index}</Link>][<a href={`https://mempool.space/tx/${asset_event.tx_hash}`} target="_blank">tx</a>]</li>
            {quantity_element}
            {genesis_or_transfer_element}
            {updated_description_element}
            {locked_element}
        </ul>
    );
}


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

            media_element_selected: null,
            media_element: null
            // enhanced_media_element: null
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

                // then do the media if applies
                // not awaiting it...
                setupMedia(this, asset_name, asset_resource.latest_media_issuance);
                // setupMedia(this, asset_name, asset_resource.latest_description_issuance);

                // // step 0 reset
                // this.setState({ media_element: null });

                // // start trying normal media
                // let media_or_none = null; // done like this to be clear the next command can be null
                // media_or_none = AssetDescriptionMedia.getElementIfDescriptionMedia(asset_resource.latest_description_issuance.description);

                // if (media_or_none) {
                //     this.setState({ media_element: media_or_none });
                // }

                // // if not normal, then try enhanced
                // else if (AssetDescriptionEnhancedMedia.checkIfDescriptionEnhancedMedia(asset_resource.latest_description_issuance.description)) {
                //     // if (AssetDescriptionEnhancedMedia.checkIfDescriptionEnhancedMedia(asset_resource.latest_description_issuance.description)) {
                //     // if (asset_resource.latest_description_issuance.description.endsWith('.json')) {
                //     // const asset_name = asset_resource.asset_name;

                //     this.setState({ media_element: (<p>loading...</p>) });

                //     const issuance_tx_index = asset_resource.latest_description_issuance.tx_index;
                //     try {
                //         const try_enhanced_media_element = await AssetDescriptionEnhancedMedia.getElementIfSuccessWithEnhancedMedia(asset_name, issuance_tx_index);
                //         if (try_enhanced_media_element) {
                //             this.setState({ media_element: try_enhanced_media_element });
                //         }
                //         else {
                //             this.setState({ media_element: (<p>(unable to load content)</p>) });
                //         }
                //     } catch (err) {
                //         // console.log(err);
                //         this.setState({ media_element: (<p>(unable to load content)</p>) });
                //     }

                // }
                // ///////////////////////////////
            }

        }
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



            const media_or_none = this.state.media_element;
            // let media_or_none = null; // done like this to be clear the next command can be null
            // media_or_none = AssetDescriptionMedia.getElementIfDescriptionMedia(this.state.asset_resource.latest_description_issuance.description);

            // if (this.state.enhanced_media_element) {
            //     media_or_none = this.state.enhanced_media_element;
            // }



            // if (this.state.asset_resource.latest_description_issuance.description.endsWith('.json')) {
            //     media_or_none = (<li><a href={`https://7x9p9r8ln2.execute-api.us-east-1.amazonaws.com/mainnet/asset_name/${this.state.asset_resource.asset_name}/_enhanced/${this.state.asset_resource.latest_description_issuance.tx_index}`} target="_blank">+ see enhanced</a></li>);
            // }
            // const last_is_enhanced_element = this.state.asset_resource.latest_description_issuance.description.endsWith('.json') ? (<li><a href={`https://7x9p9r8ln2.execute-api.us-east-1.amazonaws.com/mainnet/asset_name/${this.state.asset_resource.asset_name}/_enhanced/${this.state.asset_resource.latest_description_issuance.tx_index}`} target="_blank">+ see enhanced</a></li>) : null;

            const superasset_element = this.state.asset_resource.superasset ? (<li style={{ padding: "0.25rem" }}>superasset: <Link to={`/${this.state.asset_resource.superasset}`}>{this.state.asset_resource.superasset}</Link></li>) : null;
            const subassets_list_element = this.state.asset_resource.subassets ? (<li style={{ padding: "0.25rem" }}>subassets:<ul>{this.state.asset_resource.subassets.map((subasset) => (<li key={subasset} style={{ padding: "0.25rem" }}><Link to={`/${subasset}`}>{subasset}</Link></li>))}</ul></li>) : null;
            // const subassets_list_element = this.state.asset_resource.subassets ? (<li>subassets:<ul>{this.state.asset_resource.subassets.map((subasset) => (<li key={subasset}><Link to={`/${subasset}`}>{subasset}</Link></li>))}</ul></li>) : null;
            // const superasset_element = asset.superasset ? (<li>superasset: <Link to={`/assets/${asset.superasset}`}>{asset.superasset}</Link></li>) : null;
            // const subassets_list_element = asset.subassets ? (<li>subassets:<ul>{asset.subassets.map((subasset) => (<li key={subasset}><Link to={`/assets/${subasset}`}>{subasset}</Link></li>))}</ul></li>) : null;        
            /////////

            // not convinced... kinda goes against the point of BEING PURE! ideally, A SINGLE LOCKED ISSUANCE!
            // /////////////
            // const genesis_event = this.state.asset_resource.events[0];
            // const genesis_element = (<li>genesis: {genesis_event.block_timestamp_iso} [block: {genesis_event.block_index}]</li>);
            // /////////////

            const mainname = this.state.asset_resource.asset_longname ? this.state.asset_resource.asset_longname : this.state.asset_resource.asset_name;

            const is_unlocked = this.state.asset_resource.locked ? '' : ' (unlocked)';

            let asset_total = ` [quantity: ${this.state.asset_resource.total}${is_unlocked}]`;

            const is_superasset_subassets_amount = this.state.asset_resource.subassets ? ` [subassets: ${this.state.asset_resource.subassets.length}]` : '';

            return (
                <main style={{ padding: "1rem" }}>
                    {/* <main style={{ padding: "1rem 0" }}> */}
                    <h1>Asset:</h1>

                    <h2><strong>{mainname}</strong>{is_superasset_subassets_amount}</h2>
                    {/* <h2><strong>{mainname}</strong></h2> */}
                    {/* const events_total = ` [events: ${asset.events.length}]`; */}

                    <h3>
                        <div style={{ opacity: 0.2 }}>
                            [events: {this.state.asset_resource.events.length}]
                        </div>
                        <br />

                        {`${asset_total}`}
                        {/* {`${asset_total}${is_superasset_subassets_amount}`}; */}

                        {/* {formattedAssetBelowTitleElement(this.state.asset_resource, null, null, false)} */}
                    </h3>
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
                        <li style={{ padding: "0.25rem" }}>events:<ul>{this.state.asset_resource.events.map((asset_event) => (<li key={asset_event.tx_index} style={{ padding: "0.25rem" }}>{formattedAssetEventElement(this, asset_event, this.state.asset_resource.asset_name, this.state.asset_resource.asset_longname)}</li>))}</ul></li>
                        {/* <li>events:<ul>{this.state.asset_resource.events.map((asset_event) => (<li key={asset_event.tx_index}>{formattedAssetEventElement(this, asset_event, this.state.asset_resource.asset_name, this.state.asset_resource.asset_longname)}</li>))}</ul></li> */}
                        {/* <li>events:<ul>{this.state.asset_resource.events.map((asset_event) => (<li key={asset_event.tx_index}>{formattedAssetEventElement(asset_event, this.state.asset_resource.asset_name, this.state.asset_resource.asset_longname)}</li>))}</ul></li> */}
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
