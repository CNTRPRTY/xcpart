import { getAsset } from "../api";
import React from 'react';
import { withRouter } from './shared/classhooks';
import { formattedAssetEventElement, formattedAssetElement } from "./shared/elements"
import { Link } from "react-router-dom";

function formattedAssetPageDetailsElement(asset) {

    const last_is_enhanced_element = asset.latest_description_issuance.description.endsWith('.json') ? (<li><a href={`https://xchain.io/asset/${asset.asset_name}`} target="_blank">+ see enhanced</a></li>) : null;

    const superasset_element = asset.superasset ? (<li>superasset: <Link to={`/assets/${asset.superasset}`}>{asset.superasset}</Link></li>) : null;
    const subassets_list_element = asset.subassets ? (<li>subassets:<ul>{asset.subassets.map((subasset) => (<li key={subasset}><Link to={`/assets/${subasset}`}>{subasset}</Link></li>))}</ul></li>) : null;

    return (

        <ul>
            {/* <li>[locked:{`${asset.locked}`}]</li> */}
            {/* <li>[locked:{`${asset.locked}`}][divisible:{`${asset.divisible}`}]</li> */}
            {last_is_enhanced_element}
            {superasset_element}
            <li>Events:<ul>{asset.events.map((asset_event) => (<li key={asset_event.tx_index}>{formattedAssetEventElement(asset_event)}</li>))}</ul></li>
            {/* <li>events:<ul>{asset.events.map((asset_event) => (<li key={asset_event.tx_index}>{formattedAssetEventElement(asset_event)}</li>))}</ul></li> */}
            {/* <li>events:<ul>{asset.events.map((asset_event) => (<li key={asset_event.tx_index}>{JSON.stringify(asset_event)}</li>))}</ul></li> */}
            {/* <li>events:{asset.events.map((asset_event) => formattedAssetEventElement(asset_event))}</li> */}
            {subassets_list_element}
        </ul>

        // <ul>
        //     <li>[locked:{`${asset.locked}`}][divisible:{`${asset.divisible}`}]</li>
        //     {/* <li>first issuance: {JSON.stringify(asset.first_issuance)}</li> */}
        //     {/* {locked_issuance_list_element}
        //     {latest_description_issuance_list_element} */}
        //     {/* {JSON.stringify(asset.events)} */}
        //     {/* <li>first issuance: {asset.description_first.description}</li> */}
        // </ul>
    );
}

class Asset extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            asset_name: props.router.params.assetName,
            asset_resource: null
        };
    }

    async fetchData(asset_name) {
        const asset_resource = await getAsset(asset_name);
        this.setState({ asset_resource });
    }

    async componentDidMount() {
        // const asset_resource = await getAsset(this.state.asset_name);
        // this.setState({ asset_resource });
        await this.fetchData(this.state.asset_name);
    }

    // This method is not called for the initial render (https://reactjs.org/docs/react-component.html#componentdidupdate)
    async componentDidUpdate(prevProps) {
        const updatedAssetName = this.props.router.params.assetName;
        // Typical usage (don't forget to compare props):
        if (updatedAssetName !== prevProps.router.params.assetName) {
            await this.fetchData(updatedAssetName);
        }
    }

    render() {
        if (this.state.asset_resource) {
            return (
                <main style={{ padding: "1rem 0" }}>
                    <h1>Asset:</h1>
                    <h2>{formattedAssetElement(this.state.asset_resource, null, null, false)}</h2>
                    {/* <h2>{formattedAssetElement(this.state.asset_resource)}</h2> */}
                    {/* <h2>{JSON.stringify(this.state.asset_resource)}</h2> */}
                    {formattedAssetPageDetailsElement(this.state.asset_resource)}
                </main>
            );
        }
        else {
            return (
                <main style={{ padding: "1rem 0" }}>
                    <h2>loading...</h2>
                </main>
            );
        }
    }
}

export default withRouter(Asset);
