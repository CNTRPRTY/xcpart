import { getAddress } from "../api";
import React from 'react';
import { withRouter } from './shared/classhooks';
import { Link } from "react-router-dom";

import AssetDescriptionMedia from "../models/AssetDescriptionMedia"
import AssetDescriptionEnhancedMedia from "../models/AssetDescriptionEnhancedMedia"

function formatMediaElement(mainname, media_element) {
    return (
        <div>
            {/* <span> */}
            {/* <span style={{ padding: "2rem" }}> */}
            {/* // https://stackoverflow.com/a/59032319 */}
            <Link to={`/${mainname}`} style={{ "textDecoration": "none", "color": "unset" }}>{mainname}</Link>
            {/* bitst.art/{mainname} */}
            {/* {mainname} */}
            {/* {address_asset.mainname} */}
            <br />
            {media_element}
            {/* {media_or_none} */}
            {/* </span> */}
            <br />
            <br />
        </div>
    );
}

// https://stackoverflow.com/a/39914235
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function setupMediaProcess(self) {
    ///////////////////////////////

    // sleep for a moment
    await sleep(10);

    for await (const address_asset of self.state.address_assets) {

        /////////////////////////
        // then do the media if applies

        if (address_asset.media && address_asset.media.description) {
            // // set selected
            // self.setState({ media_element_selected: description_issuance.tx_index });

            // // step 0 reset
            // self.setState({ media_element: null });

            // start trying normal media
            let media_or_none = null; // done like this to be clear the next command can be null
            media_or_none = AssetDescriptionMedia.getElementIfDescriptionMedia(address_asset.media.description);

            if (media_or_none) {
                // const with_name_element = (
                //     <div>
                //         {/* <span> */}
                //         {/* <span style={{ padding: "2rem" }}> */}
                //         {address_asset.mainname}
                //         <br />
                //         {media_or_none}
                //         {/* </span> */}
                //         <br />
                //         <br />
                //     </div>
                // );
                self.setState({ media_elements: [...self.state.media_elements, formatMediaElement(address_asset.mainname, media_or_none)] });
                // self.setState({ media_elements: [...self.state.media_elements, with_name_element] });
                // self.setState({ media_elements: [...self.state.media_elements, media_or_none] });
                // self.setState({ media_element: media_or_none });
            }

            // if not normal, then try enhanced
            else if (AssetDescriptionEnhancedMedia.checkIfDescriptionEnhancedMedia(address_asset.media.description)) {

                // self.setState({ media_element: (<p>loading...</p>) });

                try {
                    const try_enhanced_media_element = await AssetDescriptionEnhancedMedia.getElementIfSuccessWithEnhancedMedia(address_asset.media.asset_name, address_asset.media.tx_index);
                    if (try_enhanced_media_element) {
                        // const with_name_element = (
                        //     <div>
                        //         {/* <span> */}
                        //         {/* <span style={{ padding: "2rem" }}> */}
                        //         {address_asset.mainname}
                        //         <br />
                        //         {try_enhanced_media_element}
                        //         {/* </span> */}
                        //         <br />
                        //         <br />
                        //     </div>
                        // );
                        self.setState({ media_elements: [...self.state.media_elements, formatMediaElement(address_asset.mainname, try_enhanced_media_element)] });
                        // self.setState({ media_elements: [...self.state.media_elements, with_name_element] });
                        // self.setState({ media_elements: [...self.state.media_elements, try_enhanced_media_element] });
                        // self.setState({ media_element: try_enhanced_media_element });
                    }
                    // else {
                    //     self.setState({ media_element: (<p>(unable to load content)</p>) });
                    // }
                } catch (err) {
                    // ignore
                    // self.setState({ media_element: (<p>(unable to load content)</p>) });
                }

            }
        }

        /////////////////////////

    }

    ///////////////////////////////
}

let only_once_lock = false;

async function setupMedia(self) {

    if (process.env.NODE_ENV === "development") {
        if (only_once_lock) {
            return;
        }
        else {
            only_once_lock = true;
            await setupMediaProcess(self);
            only_once_lock = false;
        }
    }
    else { // in production ignore only_once_lock
        await setupMediaProcess(self);
    }

    // if (only_once_lock) {
    //     return;
    // }
    // else {
    //     only_once_lock = true;
    //     await setupMediaProcess(self);
    //     only_once_lock = false;
    // }

    // // sleep for a moment
    // await sleep(10);

    // for (const address_asset of self.state.address_assets) {

    //     /////////////////////////
    //     // then do the media if applies

    //     // // set selected
    //     // self.setState({ media_element_selected: description_issuance.tx_index });

    //     // // step 0 reset
    //     // self.setState({ media_element: null });

    //     // start trying normal media
    //     let media_or_none = null; // done like this to be clear the next command can be null
    //     media_or_none = AssetDescriptionMedia.getElementIfDescriptionMedia(address_asset.mediaDescription);

    //     if (media_or_none) {
    //         self.setState({ media_elements: [...self.state.media_elements, media_or_none] });
    //         // self.setState({ media_element: media_or_none });
    //     }

    //     // if not normal, then try enhanced
    //     else if (AssetDescriptionEnhancedMedia.checkIfDescriptionEnhancedMedia(address_asset.mediaDescription)) {

    //         // self.setState({ media_element: (<p>loading...</p>) });

    //         try {
    //             const try_enhanced_media_element = await AssetDescriptionEnhancedMedia.getElementIfSuccessWithEnhancedMedia(address_asset.media.asset_name, address_asset.media.tx_index);
    //             if (try_enhanced_media_element) {
    //                 self.setState({ media_elements: [...self.state.media_elements, try_enhanced_media_element] });
    //                 // self.setState({ media_element: try_enhanced_media_element });
    //             }
    //             // else {
    //             //     self.setState({ media_element: (<p>(unable to load content)</p>) });
    //             // }
    //         } catch (err) {
    //             // ignore
    //             // self.setState({ media_element: (<p>(unable to load content)</p>) });
    //         }

    //     }
    //     /////////////////////////

    // }

}

class Address extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: props.address,
            address_assets_not_found: null,
            address_assets: null,
            // address_assets: []
            media_elements: []
        };
    }

    async fetchData(address) {
        const address_assets = await getAddress(address);

        // TODO? seems like a reset of constructor params will be needed here...

        if (!address_assets) {
            this.setState({ address_assets_not_found: true });
        }
        else {
            this.setState({
                address_assets: address_assets.assets
            });

            // not awaiting it
            setupMedia(this);

        }

    }

    async componentDidMount() {
        await this.fetchData(this.state.address);
    }

    async componentDidUpdate(prevProps) {
        const updatedAddress = this.props.address;
        if (updatedAddress !== prevProps.address) {
            await this.fetchData(updatedAddress);
        }
    }

    render() {
        if (this.state.address_assets_not_found) {
            return (
                <main style={{ padding: "1rem" }}>
                    {/* <main style={{ padding: "1rem 0" }}> */}
                    <h2>No address found</h2>
                    {/* <h2>No assets found for address</h2> */}
                </main>
            );
        }
        else if (this.state.address_assets && !this.state.address_assets.length) {
            return (
                <main style={{ padding: "1rem" }}>
                    {/* <main style={{ padding: "1rem 0" }}> */}
                    {/* <h2>No address found</h2> */}
                    <h2>No assets found for address</h2>
                </main>
            );
        }
        else if (this.state.address_assets && this.state.address_assets.length) {

            // const subassets_list_element = this.state.asset_resource.subassets ? (<li>subassets:<ul>{this.state.asset_resource.subassets.map((subasset) => (<li key={subasset}><Link to={`/${subasset}`}>{subasset}</Link></li>))}</ul></li>) : null;

            let address_accesible_media = null;
            if (this.state.media_elements.length) {
                address_accesible_media = (
                    <div>
                        <h1>Detected media:</h1>
                        {/* <h1>Detected media from assets:</h1> */}
                        <ul style={{ "listStyleType": "none" }}>
                            {this.state.media_elements.map((media_element, index) => (<li key={index} style={{ padding: "0.25rem" }}>{media_element}</li>))}
                        </ul>
                    </div>
                );
            }

            return (
                <main style={{ padding: "1rem" }}>
                    {/* <main style={{ padding: "1rem 0" }}> */}

                    {address_accesible_media}

                    <h1>Asset issuances with address:</h1>
                    {/* <h1>Asset issuances by:</h1> */}

                    {/* TODO? maybe include more metadata for the address in a formatted form? */}
                    {/* <h2>{<Link to={`/${this.state.address}`}>{this.state.address}</Link>}</h2> */}
                    <h2>{this.state.address}</h2>

                    <ul>
                        {this.state.address_assets.map((mainname_obj) => (<li key={mainname_obj.index} style={{ padding: "0.25rem" }}><Link to={`/${mainname_obj.mainname}`}>{mainname_obj.mainname}</Link></li>))}
                        {/* {this.state.address_assets.map((mainname_obj) => (<li key={mainname_obj.index}><Link to={`/${mainname_obj.mainname}`}>{mainname_obj.mainname}</Link></li>))} */}
                        {/* {this.state.address_assets.map((asset_mainname) => (<li key={asset_mainname}><Link to={`/${asset_mainname}`}>{asset_mainname}</Link></li>))} */}
                    </ul>

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

export default withRouter(Address);
