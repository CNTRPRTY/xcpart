import React from 'react';
import { getRarest } from "../api";
import { formattedAssetElement } from "./shared/elements"

export default class Rarest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            // EMPEZAR CON LINK de q en TEST se vea q es el primer issuance!

            // rarest could be also seen like the OPPOSITE of latest
            // - thus no much changes! basically only adding new interesting ones...
            // - AND also like TOP stats...

            // ideas (not final):

            // first satoshi nft (when locked no destroy)
            // first nft (when locked no destroy)
            // first issued satoshi nft (when genesis, locked no destroy)
            // first issued nft (when genesis, locked no destroy)
            // first fully destroyed locked
            // most subassets
            // most updated description
            // most youtube/imgur/soundcloud links? maybe more abstracted in like just having multiple media?

            rarest_first_issuance: null,
            rarest_first_satoshi_nft_nodestroy_issuance: null,
            rarest_first_wholenumber_nft_nodestroy_issuance: null,
        };
    }

    async componentDidMount() {
        const rarest_root = await getRarest();

        console.log(`bbbbbbbbb1`);
        console.log(JSON.stringify(rarest_root));
        console.log(`bbbbbbbbb2`);

        this.setState(rarest_root);
        // this.setState({
        //     rarest_first_issuance: rarest_root.rarest_first_issuance,
        //     rarest_first_satoshi_nft_nodestroy_issuance: rarest_root.rarest_first_satoshi_nft_nodestroy_issuance,
        // });
    }

    render() {

        // console.log(`ttttttt1`);
        // console.log(JSON.stringify(this.state.rarest_first_issuance));
        // console.log(`ttttttt2`);
        // console.log(this.state.rarest_first_locked_nft_nodestroy_issuance);
        // console.log(`ttttttt3`);

        let content_element = (<h2>loading...</h2>);
        if (
            this.state.rarest_first_issuance &&
            this.state.rarest_first_satoshi_nft_nodestroy_issuance &&
            this.state.rarest_first_wholenumber_nft_nodestroy_issuance
            ) {
            content_element = (
                <div>

                    <h2>First asset issuance</h2>
                    {/* <h2>First locked NFT [no destroy] divisibility:satoshi</h2> */}
                    {/* {this.state.rarest_first_issuance.length === 0 ? 'loading...' : null} */}
                    {/* 
                        TODO:
                        - will need a new formatter for this instead of continuing variating this one
                        - OR start breaking all of them up, reusing parts of them which will be called by individual functions
                    */}
                    {formattedAssetElement(this.state.rarest_first_issuance)}
                    {/* {this.state.latest_locked_nftnd.map((asset) => formattedAssetElement(asset, asset.latest_description_issuance, IssuanceEvent.TYPES.UPDATE_DESCRIPTION, true))} */}

                    <h2>First satoshi NFT [no destroy] asset issuance</h2>
                    {formattedAssetElement(this.state.rarest_first_satoshi_nft_nodestroy_issuance, null, null, true)}

                    <h2>First whole number NFT [no destroy] asset issuance</h2>
                    {formattedAssetElement(this.state.rarest_first_wholenumber_nft_nodestroy_issuance, null, null, true)}

                </div>
            );
        }

        return (
            <main style={{ padding: "1rem 0" }}>
                <h1>Rarest assets:</h1>
                {content_element}
            </main>
        );
    }
}
