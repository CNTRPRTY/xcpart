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

function checkIfMediaAutoLoaded(self) {
    if (self.state.media_elements.length === self.state.media_loading) {
        // try again
        self.setState({ media_did_autoplay: false });
        // setupMedia(self);
    }
}

async function setupMediaProcess(self) {
    ///////////////////////////////

    // sleep for a moment
    await sleep(10);

    let media_to_get_address_assets = [];
    // first iterate over all address_assets to see if there is any media WITHOUT getting it
    for (const address_asset of self.state.address_assets) {

        // self.setState({ test_log: `1. ${JSON.stringify(address_asset)}` });

        // ********************************************
        // MEDIA = NULL means is_over_ddb_limit_address
        // if one is null, the rest should also be null becuase this is for the special addresses that don't fit in ddb
        if (address_asset.media === null) {
            media_to_get_address_assets = null;
        }
        // ********************************************
        else if (address_asset.media && address_asset.media.description) {
            // if (address_asset.media && address_asset.media.description) {
            ////////
            if (
                AssetDescriptionMedia.checkIfDescriptionMedia(address_asset.media.description) ||
                AssetDescriptionEnhancedMedia.checkIfDescriptionEnhancedMedia(address_asset.media.description)
            ) {
                media_to_get_address_assets.push(address_asset);
            }
            ////////
        }
    }

    // for the ddb hack
    if (media_to_get_address_assets === null) {
        self.setState({ media_not_found: false });
    }
    else if (!media_to_get_address_assets.length) {
        // if (!media_to_get_address_assets.length) {
        self.setState({ media_not_found: true });
    }
    else {

        // only set this the first time
        if (!self.state.media_loading) {

            // for stuck fix
            const unstuck_secs = 2; // 3;
            self.timerID = setTimeout(checkIfMediaAutoLoaded, unstuck_secs * 1000, self);

            self.setState({ media_elements: new Array(media_to_get_address_assets.length) });
            self.setState({ media_loading: media_to_get_address_assets.length });
        }
        // self.setState({ media_loading: media_to_get_address_assets.length });

        // self.setState({ media_loading: true });

        // sleep for a moment
        await sleep(10);

        // if (!self.state.address_assets.length) {
        //     // self.setState({ media_element: (<p>(unable to load content)</p>) });
        //     self.setState({ media_elements: [(<p>(no media detected)</p>)] });
        // }
        // else {
        ///////////////////////////////////////

        const index = media_to_get_address_assets.length - self.state.media_loading;
        const group_to_do = media_to_get_address_assets.slice(index);

        let media_elements_array_index = self.state.media_loading;
        for await (const address_asset of group_to_do) {

            // self.setState({ test_log: `2. ${JSON.stringify(address_asset)}` });

            // for await (const address_asset of media_to_get_address_assets) {
            // for await (const address_asset of self.state.address_assets) {

            // let flag = true;
            // while(flag) {
            //     if (!self.state.media_paused) {
            //         flag = false;
            //     }
            // }

            // sleep for a moment
            // await sleep(1000);
            await sleep(500);
            // await sleep(250);
            // await sleep(100);
            // await sleep(10);

            /////////////////////////
            // then do the media if applies
            // if (address_asset.media && address_asset.media.description) {
            // // set selected
            // self.setState({ media_element_selected: description_issuance.tx_index });

            // // step 0 reset
            // self.setState({ media_element: null });

            // start trying normal media
            // let media_or_none = null; // done like this to be clear the next command can be null
            // media_or_none = AssetDescriptionMedia.getElementIfDescriptionMedia(address_asset.media.description);

            // first try enhanced
            let media_or_none = null;
            if (AssetDescriptionEnhancedMedia.checkIfDescriptionEnhancedMedia(address_asset.media.description)) {

                // self.setState({ media_element: (<p>loading...</p>) });

                // try {
                media_or_none = await AssetDescriptionEnhancedMedia.getElementIfSuccessWithEnhancedMedia(address_asset.media.asset_name, address_asset.media.tx_index);
                if (media_or_none) {
                    // const try_enhanced_media_element = await AssetDescriptionEnhancedMedia.getElementIfSuccessWithEnhancedMedia(address_asset.media.asset_name, address_asset.media.tx_index);
                    // if (try_enhanced_media_element) {
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

                    self.state.media_elements[media_elements_array_index] = formatMediaElement(address_asset.mainname, media_or_none);
                    // self.setState((prevState, props) => ({
                    //     media_elements: [
                    //         formatMediaElement(address_asset.mainname, try_enhanced_media_element),
                    //         ...prevState.media_elements
                    //     ]
                    // }));
                    // self.setState({ media_elements: [formatMediaElement(address_asset.mainname, try_enhanced_media_element), ...self.state.media_elements] });

                    // self.setState({ media_elements: [...self.state.media_elements, formatMediaElement(address_asset.mainname, try_enhanced_media_element)] });

                    // self.setState({ media_elements: [...self.state.media_elements, with_name_element] });
                    // self.setState({ media_elements: [...self.state.media_elements, try_enhanced_media_element] });
                    // self.setState({ media_element: try_enhanced_media_element });
                }
                // else {
                //     console.log(`l: ${address_asset.media.description}`);
                //     // console.log(`skipped el: ${address_asset.media.description}`);
                // }
                // else {
                //     self.setState({ media_element: (<p>(unable to load content)</p>) });
                // }
                // } catch (err) {
                //     // console.log(`r: ${address_asset.media.description}`);
                //     // console.log(`skipped er: ${address_asset.media.description}`);
                //     // ignore
                //     // self.setState({ media_element: (<p>(unable to load content)</p>) });
                // }

            }
            // else try normal
            else if (AssetDescriptionMedia.checkIfDescriptionMedia(address_asset.media.description)) {
                // if (media_or_none) {
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

                media_or_none = AssetDescriptionMedia.getElementIfDescriptionMedia(address_asset.media.description);
                // const media_or_none = AssetDescriptionMedia.getElementIfDescriptionMedia(address_asset.media.description);
                if (media_or_none) {
                    self.state.media_elements[media_elements_array_index] = formatMediaElement(address_asset.mainname, media_or_none);
                    // self.setState((prevState, props) => ({
                    //     media_elements: [
                    //         formatMediaElement(address_asset.mainname, media_or_none),
                    //         ...prevState.media_elements
                    //     ]
                    // }));
                    // self.setState({ media_elements: [formatMediaElement(address_asset.mainname, media_or_none), ...self.state.media_elements] });
                }

                // self.setState({ media_elements: [formatMediaElement(address_asset.mainname, media_or_none), ...self.state.media_elements] });
                // self.setState({ media_elements: [...self.state.media_elements, formatMediaElement(address_asset.mainname, media_or_none)] });

                // self.setState({ media_elements: [...self.state.media_elements, with_name_element] });
                // self.setState({ media_elements: [...self.state.media_elements, media_or_none] });
                // self.setState({ media_element: media_or_none });
            }

            // // if not normal, then try enhanced
            // else if (AssetDescriptionEnhancedMedia.checkIfDescriptionEnhancedMedia(address_asset.media.description)) {

            //     // self.setState({ media_element: (<p>loading...</p>) });

            //     try {
            //         const try_enhanced_media_element = await AssetDescriptionEnhancedMedia.getElementIfSuccessWithEnhancedMedia(address_asset.media.asset_name, address_asset.media.tx_index);
            //         if (try_enhanced_media_element) {
            //             // const with_name_element = (
            //             //     <div>
            //             //         {/* <span> */}
            //             //         {/* <span style={{ padding: "2rem" }}> */}
            //             //         {address_asset.mainname}
            //             //         <br />
            //             //         {try_enhanced_media_element}
            //             //         {/* </span> */}
            //             //         <br />
            //             //         <br />
            //             //     </div>
            //             // );

            //             self.setState({ media_elements: [formatMediaElement(address_asset.mainname, try_enhanced_media_element), ...self.state.media_elements] });
            //             // self.setState({ media_elements: [...self.state.media_elements, formatMediaElement(address_asset.mainname, try_enhanced_media_element)] });

            //             // self.setState({ media_elements: [...self.state.media_elements, with_name_element] });
            //             // self.setState({ media_elements: [...self.state.media_elements, try_enhanced_media_element] });
            //             // self.setState({ media_element: try_enhanced_media_element });
            //         }
            //         // else {
            //         //     self.setState({ media_element: (<p>(unable to load content)</p>) });
            //         // }
            //     } catch (err) {
            //         // ignore
            //         // self.setState({ media_element: (<p>(unable to load content)</p>) });
            //     }

            // }
            // }

            /////////////////////////

            // next is like force fight? (https://stackoverflow.com/a/29537485)
            // this.forceUpdate()

            // self.setState({ media_loading: media_to_get_address_assets.length });
            self.setState((prevState, props) => ({
                media_loading: prevState.media_loading - 1
            }));

            media_elements_array_index--;

            if (self.media_paused) {
                // if (self.state.media_paused) {
                return;
            }

        }
        ///////////////////////////////////////

        // self.setState({ media_loading: false });

        // comentao pq por alguna razon me esta saliendo a veces en los q se supone si tienen media...
        // // if it gets here and nothing was successful, also show media_not_found
        // let all_null_check = true;
        // for (const e of self.state.media_elements) {
        //     if (e) {
        //         all_null_check = false;
        //     }
        // }
        // if (all_null_check) {
        //     self.setState({ media_not_found: true });
        // }

    }

    // self.setState({ test_log: '' });

    // for await (const address_asset of self.state.address_assets) {

    //     // sleep for a moment
    //     await sleep(10);

    //     /////////////////////////
    //     // then do the media if applies

    //     if (address_asset.media && address_asset.media.description) {
    //         // // set selected
    //         // self.setState({ media_element_selected: description_issuance.tx_index });

    //         // // step 0 reset
    //         // self.setState({ media_element: null });

    //         // start trying normal media
    //         let media_or_none = null; // done like this to be clear the next command can be null
    //         media_or_none = AssetDescriptionMedia.getElementIfDescriptionMedia(address_asset.media.description);

    //         if (media_or_none) {
    //             // const with_name_element = (
    //             //     <div>
    //             //         {/* <span> */}
    //             //         {/* <span style={{ padding: "2rem" }}> */}
    //             //         {address_asset.mainname}
    //             //         <br />
    //             //         {media_or_none}
    //             //         {/* </span> */}
    //             //         <br />
    //             //         <br />
    //             //     </div>
    //             // );
    //             self.setState({ media_elements: [...self.state.media_elements, formatMediaElement(address_asset.mainname, media_or_none)] });
    //             // self.setState({ media_elements: [...self.state.media_elements, with_name_element] });
    //             // self.setState({ media_elements: [...self.state.media_elements, media_or_none] });
    //             // self.setState({ media_element: media_or_none });
    //         }

    //         // if not normal, then try enhanced
    //         else if (AssetDescriptionEnhancedMedia.checkIfDescriptionEnhancedMedia(address_asset.media.description)) {

    //             // self.setState({ media_element: (<p>loading...</p>) });

    //             try {
    //                 const try_enhanced_media_element = await AssetDescriptionEnhancedMedia.getElementIfSuccessWithEnhancedMedia(address_asset.media.asset_name, address_asset.media.tx_index);
    //                 if (try_enhanced_media_element) {
    //                     // const with_name_element = (
    //                     //     <div>
    //                     //         {/* <span> */}
    //                     //         {/* <span style={{ padding: "2rem" }}> */}
    //                     //         {address_asset.mainname}
    //                     //         <br />
    //                     //         {try_enhanced_media_element}
    //                     //         {/* </span> */}
    //                     //         <br />
    //                     //         <br />
    //                     //     </div>
    //                     // );
    //                     self.setState({ media_elements: [...self.state.media_elements, formatMediaElement(address_asset.mainname, try_enhanced_media_element)] });
    //                     // self.setState({ media_elements: [...self.state.media_elements, with_name_element] });
    //                     // self.setState({ media_elements: [...self.state.media_elements, try_enhanced_media_element] });
    //                     // self.setState({ media_element: try_enhanced_media_element });
    //                 }
    //                 // else {
    //                 //     self.setState({ media_element: (<p>(unable to load content)</p>) });
    //                 // }
    //             } catch (err) {
    //                 // ignore
    //                 // self.setState({ media_element: (<p>(unable to load content)</p>) });
    //             }

    //         }
    //     }

    //     /////////////////////////

    // }

    ///////////////////////////////
}

let only_once_lock = false;

async function setupMedia(self) {

    if (process.env.NODE_ENV === "development") {
        console.log(`ddd1`); // confirmed
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
        // console.log(`ddd2`); // confirmed
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
            // !!!!! NOTE ADD TO fetchData reset also !!!!!
            address: props.address,

            address_assets_not_found: null,
            address_assets: null,
            media_not_found: null,
            media_loading: 0,

            media_did_autoplay: true,

            // media_paused: false,
            media_elements: [],

            // test_log: '',
            // !!!!! NOTE ADD TO fetchData reset also !!!!!
        };
        this.handleClick = this.handleClick.bind(this);
    }

    async fetchData(address) {

        // reset of constructor params
        this.setState({
            address: address,

            address_assets_not_found: null,
            address_assets: null,
            media_not_found: null,
            media_loading: 0,
            // media_paused: false,
            media_elements: [],

            // test_log: '',
        });

        const address_assets = await getAddress(address);

        // TODO? seems like a reset of constructor params will be needed here...

        if (!address_assets) {
            this.setState({ address_assets_not_found: true });
        }
        else {
            this.setState({
                address_assets: address_assets.assets
            });

            this.media_paused = false;

            // not awaiting it
            setupMedia(this);

        }

    }

    handleClick(e) {
        e.preventDefault();

        // the next when load is just pressed, so that it doesn't appear any more
        if (!this.state.media_did_autoplay) {
            this.setState({ media_did_autoplay: true });
        }

        if (this.media_paused) {
            // if (this.state.media_paused) {

            this.media_paused = false;

            // not awaiting it
            setupMedia(this);
            // this.setState({ media_paused: false });
        }
        else {
            this.media_paused = true;
            // this.setState({ media_paused: true });
        }

        // https://stackoverflow.com/a/30626072 (https://github.com/facebook/react/issues/12111#issuecomment-361254441) (https://reactjs.org/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class)
        this.forceUpdate(); // for rendering updated media_paused

        // console.log(`rrrrrrrrr2`);

        // this.setState({ media_paused: true });

        // not awaiting it
        // setupMedia(this.state.parentSelf, this.state.asset_name, this.state.description_issuance);

        // console.log(`rrrrrrrrr1`);
        // console.log(`${this.state.asset_name}`);
        // console.log(`${this.state.issuance_tx_index}`);
        // console.log(`rrrrrrrrr2`);
    };

    async componentDidMount() {
        await this.fetchData(this.state.address);
    }

    async componentDidUpdate(prevProps) {
        const updatedAddress = this.props.address;
        if (updatedAddress !== prevProps.address) {
            await this.fetchData(updatedAddress);
        }
    }

    async componentWillUnmount() {
        // console.log(`detected in address1`);
        this.media_paused = true; // like this because state won't work (is expected behavior)
        // this.setState({ media_paused: true });
        // // sleep for a moment
        // await sleep(10);
        // console.log(`detected in address2`);
    }

    render() {
        if (this.state.address_assets_not_found) {
            return (
                <main style={{ padding: "1rem" }}>
                    {/* <main style={{ padding: "1rem 0" }}> */}
                    {/* <h2>No asset issuances found for address</h2> */}
                    {/* <h2>No address found</h2> */}
                    <h2>No assets found for address</h2>
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

            // let address_accesible_media = null;
            // if (this.state.media_elements.length) {
            //     address_accesible_media = (
            //         <div>
            //             <h1>Detected media:</h1>
            //             {/* <h1>Detected media from assets:</h1> */}
            //             <ul style={{ "listStyleType": "none" }}>
            //                 {this.state.media_elements.map((media_element, index) => (<li key={index} style={{ padding: "0.25rem" }}>{media_element}</li>))}
            //             </ul>
            //         </div>
            //     );
            // }
            let detected_media;
            if (this.state.media_not_found) {
                detected_media = (
                    <ul style={{ "listStyleType": "none" }}>
                        <li style={{ padding: "0.25rem" }}>(no media found)</li>
                        {/* <li style={{ padding: "0.25rem" }}>(no media detected)</li> */}
                    </ul>
                );
            }

            // ********************************************
            // non-ddb addresses hack
            else if (this.state.media_not_found === false) {
                detected_media = (
                    <ul style={{ "listStyleType": "none" }}>
                        <li style={{ padding: "0.25rem" }}>(too much data to load for this address)</li>
                        {/* <li style={{ padding: "0.25rem" }}>(no media detected)</li> */}
                    </ul>
                );
            }
            // ********************************************

            else if (
                this.state.media_loading ||
                this.state.media_elements.length
            ) {
                // else if (this.state.media_elements.length) {

                let still_loading = null;
                if (this.state.media_loading) {

                    if (this.state.media_did_autoplay) {
                        ///////////////////////
                        let word;
                        let loading_or_not_element;
                        if (this.media_paused) {
                            word = 'continue';
                            loading_or_not_element = (
                                <li>load {this.state.media_loading}</li>
                            );
                        }
                        else {
                            word = 'pause';
                            loading_or_not_element = (
                                <li>loading {this.state.media_loading}...</li>
                            );
                        }

                        // const word = this.media_paused ? 'continue' : 'pause';
                        // const word = this.state.media_paused ? 'continue' : 'pause';
                        still_loading = (
                            <ul style={{
                                padding: "0 2rem 2rem 2rem", // https://developer.mozilla.org/en-US/docs/Web/CSS/padding
                                listStyleType: "none"
                            }}>
                                {loading_or_not_element}
                                {/* <li>loading {this.state.media_loading}...</li> */}
                                <li>[<a href="#" onClick={this.handleClick}>{word}</a>]</li>
                            </ul>
                        );
                        ///////////////////////
                    }
                    else {
                        still_loading = (
                            <ul style={{
                                padding: "0 2rem 2rem 2rem", // https://developer.mozilla.org/en-US/docs/Web/CSS/padding
                                listStyleType: "none"
                            }}>
                                <li>[<a href="#" onClick={this.handleClick}>{'load'}</a>] {this.state.media_loading}</li>
                            </ul>
                        );
                    }

                    // const word = this.media_paused ? 'continue' : 'pause';
                    // // const word = this.state.media_paused ? 'continue' : 'pause';
                    // still_loading = (
                    //     <ul style={{
                    //         padding: "0 2rem 2rem 2rem", // https://developer.mozilla.org/en-US/docs/Web/CSS/padding
                    //         listStyleType: "none"
                    //     }}>
                    //         <li>loading {this.state.media_loading}...</li>
                    //         <li>[<a href="#" onClick={this.handleClick}>{word}</a>]</li>
                    //     </ul>
                    // );
                    // still_loading = (
                    //     <li style={{ padding: "1rem" }}>
                    //         loading {this.state.media_loading}...
                    //         [<a href="#" onClick={this.handleClick}>{word}</a>]
                    //         {/* [<a href="#" onClick={this.handleClick}>pause</a>] */}
                    //     </li>
                    // );
                }

                detected_media = (
                    <ul style={{ "listStyleType": "none" }}>
                        {still_loading}
                        {this.state.media_elements.map((media_element, index) => (<li key={index} style={{ padding: "0.25rem" }}>{media_element}</li>))}
                    </ul>
                );
            }
            else {
                detected_media = (
                    <ul style={{ "listStyleType": "none" }}>
                        <li style={{ padding: "0.25rem" }}>loading...</li>
                    </ul>
                );
            }

            return (
                <main style={{ padding: "1rem" }}>
                    {/* <main style={{ padding: "1rem 0" }}> */}

                    {/* <div> */}
                    <h1>Address media:</h1>
                    {/* <h1>Media:</h1> */}
                    {/* {this.state.test_log} */}
                    {/* <h1>Detected media:</h1> */}

                    {detected_media}

                    {/* <h1>Detected media from assets:</h1> */}
                    {/* <ul style={{ "listStyleType": "none" }}> */}
                    {/* {this.state.media_elements.map((media_element, index) => (<li key={index} style={{ padding: "0.25rem" }}>{media_element}</li>))} */}
                    {/* </ul> */}
                    {/* </div> */}
                    {/* {address_accesible_media} */}

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
