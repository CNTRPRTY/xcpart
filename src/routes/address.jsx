import { getAddress } from "../api";
import React from 'react';
import { withRouter } from './shared/classhooks';
import { Link } from "react-router-dom";

class Address extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: props.address,
            address_assets_not_found: null,
            address_assets: []
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
                    <h2>No assets found for address</h2>
                </main>
            );
        }
        else if (this.state.address_assets.length) {

            // const subassets_list_element = this.state.asset_resource.subassets ? (<li>subassets:<ul>{this.state.asset_resource.subassets.map((subasset) => (<li key={subasset}><Link to={`/${subasset}`}>{subasset}</Link></li>))}</ul></li>) : null;

            return (
                <main style={{ padding: "1rem" }}>
                    {/* <main style={{ padding: "1rem 0" }}> */}
                    <h1>Asset issuances by:</h1>

                    {/* TODO? maybe include more metadata for the address in a formatted form? */}
                    <h2>{<Link to={`/${this.state.address}`}>{this.state.address}</Link>}</h2>
                    {/* <h2>{this.state.address}</h2> */}
                    {/* <h2>{formattedAssetTitleElement(this.state.asset_resource, null, null, false)}</h2> */}

                    <ul>
                        {this.state.address_assets.map((asset_mainname) => (<li key={asset_mainname}><Link to={`/${asset_mainname}`}>{asset_mainname}</Link></li>))}
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
