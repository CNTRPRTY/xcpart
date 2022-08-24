import { Link } from "react-router-dom";
import AssetDescriptionMedia from "../../models/AssetDescriptionMedia";
import AssetDescriptionEnhancedMedia from "../../models/AssetDescriptionEnhancedMedia";

// TODO! this function proves the need for some kind of api docs for these asset events...
// funny function parameters in that it only uses the asset_name if there is an asset_longname
function formattedAssetEventElement(asset_event, asset_name, asset_longname = null) {
    // function formattedAssetEventElement(asset_event) {

    const updated_description_element = asset_event.description ? (<li>description: {asset_event.description}</li>) : null;
    const locked_element = asset_event.locked ? (<li>LOCK</li>) : null;

    const quantity_element = (asset_event.quantity !== undefined) ? (<li>{asset_event.type}: {asset_event.quantity}</li>) : null;

    // if issuer is in the results, and there is no source, then it is first issuance
    // else if issuer is in the results, then a source should also be
    let genesis_created_top = null;
    // let genesis_created_bottom = null;
    // let genesis_divisibility = null;
    let genesis_or_transfer_element = null;
    if (asset_event.issuer) {
        if (!asset_event.source) {

            let is_subasset_assetname = '';
            if (asset_longname) {
                is_subasset_assetname = ` [subasset: ${asset_name}]`;
            }

            genesis_created_top = (<li>genesis:{is_subasset_assetname} [divisibility: {asset_event.divisible ? 'satoshi' : 'whole number'}]</li>);
            // genesis_created_top = (<li>genesis:{is_subasset_assetname} [issuer: {asset_event.issuer}] [divisibility: {asset_event.divisible ? 'satoshi' : 'whole number'}]</li>);
            // genesis_created_top = (<li>genesis:{is_subasset_assetname} [created by: {asset_event.issuer}] [divisibility: {asset_event.divisible ? 'satoshi' : 'whole number'}]</li>);
            // genesis_created_top = (<li>genesis: [created by: {asset_event.issuer}] [divisibility: {asset_event.divisible ? 'satoshi' : 'whole number'}]</li>);
            // genesis_created_top = (<li>genesis:</li>);
            // genesis_created_bottom = (<li>[created by: {asset_event.issuer}] [divisibility: {asset_event.divisible ? 'satoshi' : 'whole number'}]</li>);
            // genesis_divisibility = (<li>[divisibility: {asset_event.divisible ? 'satoshi' : 'whole number'}]</li>);
            // genesis_or_transfer_element = (<li>created by: {asset_event.issuer}</li>);
            genesis_or_transfer_element = (<li>issuer: {asset_event.issuer}</li>);
        }
        else {
            genesis_or_transfer_element = (<li>issuer transfer: {asset_event.issuer}</li>);
            // genesis_or_transfer_element = (<li>transferred to: {asset_event.issuer}</li>);
        }
    }

    return (
        <ul style={{ "list-style-type": "none" }}>
            {/* <ul> */}
            {genesis_created_top}
            {/* {genesis_created_bottom} */}
            {/* {genesis_divisibility} */}
            <li>{asset_event.block_timestamp_iso} [block:{asset_event.block_index}][<a href={`https://mempool.space/tx/${asset_event.tx_hash}`} target="_blank">tx</a>]</li>
            {/* {genesis_divisibility} */}
            {quantity_element}
            {/* <li>{asset_event.type}: {asset_event.quantity}</li> */}
            {/* {updated_description_element}
            {locked_element} */}
            {genesis_or_transfer_element}
            {updated_description_element}
            {locked_element}
        </ul>
    );
}

function formattedAssetElement(asset, event = null, event_type = null, is_locked_nft = false) {

    const pretty_name = asset.asset_longname ? asset.asset_longname : asset.asset_name;
    const is_unlocked = asset.locked ? '' : ' (unlocked)';

    // [c] as in media Content
    let last_is_media = false;
    if (
        AssetDescriptionMedia.checkIfDescriptionMedia(asset.latest_description_issuance.description) ||
        AssetDescriptionEnhancedMedia.checkIfDescriptionEnhancedMedia(asset.latest_description_issuance.description)
    ) {
        last_is_media = true;
    }
    // const last_is_enhanced = asset.latest_description_issuance.description.endsWith('.json');

    let asset_total = ` [total: ${asset.total}${is_unlocked}]`;
    if (is_locked_nft) {
        asset_total = '';
    }

    const is_superasset_subassets_amount = asset.subassets ? ` [subassets: ${asset.subassets.length}]` : '';

    // TODO?
    let pretty_name_is_link_or_clipboard;
    // types including none
    let time_of_type = null;
    if (event_type === null) {
        // TODO?
        // clipboard
        // pretty_name_is_link_or_clipboard = (<Link to={`/${pretty_name}`}>{`bitst.art/${pretty_name}`}</Link>);
        pretty_name_is_link_or_clipboard = (<Link to={`/${pretty_name}`}>{pretty_name}</Link>);
        // pretty_name_is_link_or_clipboard = (<Link to={`/assets/${pretty_name}`}>{pretty_name}</Link>);
        //
    }
    else {
        // link
        pretty_name_is_link_or_clipboard = (<Link to={`/${pretty_name}`}>{pretty_name}</Link>);
        // pretty_name_is_link_or_clipboard = (<Link to={`/assets/${pretty_name}`}>{pretty_name}</Link>);
        //

        time_of_type = (<li style={{ "list-style-type": "none" }}>{event_type}: {event.block_timestamp_iso} [block: {event.block_index}]</li>);
        // time_of_type = (<li style={{ "list-style-type": "none" }}>[{event_type}: {event.block_timestamp_iso}] [block: {event.block_index}]</li>);
    }

    return (
        <ul key={asset.asset_name}>
            <li>{last_is_media ? '[c] ' : ''}{pretty_name_is_link_or_clipboard}{asset_total}{is_superasset_subassets_amount}</li>
            {/* <li>{last_is_enhanced ? '[+] ' : ''}{pretty_name_is_link_or_clipboard}{asset_total}{is_superasset_subassets_amount}</li> */}
            {/* <li>{last_is_enhanced ? '[e] ' : ''}<Link to={`/assets/${pretty_name}`}>{pretty_name}</Link>{asset_total}{is_superasset_subassets_amount}</li> */}
            {/* <li>{last_is_enhanced ? 'thumb!' : ''}<Link to={`/assets/${pretty_name}`}>{pretty_name}</Link> [total:{asset.total}{is_unlocked}]</li> */}
            {time_of_type}
            {/* <li style={{ "list-style-type": "none" }}>{description_time.block_timestamp_iso} [block:{description_time.block_index}]</li> */}
            {/* <li>{description_time.block_timestamp_iso} [block:{description_time.block_index}]</li> */}
            {/* <li>{asset.description_first.block_timestamp_iso} [block:{asset.description_first.block_index}]</li> */}
        </ul>
    );
}

export {
    formattedAssetEventElement,
    formattedAssetElement
};
