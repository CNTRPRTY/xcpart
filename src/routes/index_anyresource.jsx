import React from 'react';
import { withRouter } from './shared/classhooks';

import Asset from "./asset";
import Address from "./address";

import { validateBitcoinAddress } from "../bitcoin";

class AnyResource extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            anyresource: props.router.params.anyResource,
        };
    }

    // https://reactjs.org/docs/react-component.html#componentdidupdate
    async componentDidUpdate(prevProps) {
        const updatedAnyResource = this.props.router.params.anyResource;
        if (updatedAnyResource !== prevProps.router.params.anyResource) {
            this.setState({
                anyresource: updatedAnyResource
            });
        }
    }

    render() {

        let address;
        let asset_anyname;

        if (validateBitcoinAddress('bitcoin', this.state.anyresource)) {
            // if (this.state.anyresource.toUpperCase() !== this.state.anyresource) {
            address = this.state.anyresource;
        }
        // TODO more strict client validation, but for now treating everything else as an asset name
        else {
            asset_anyname = this.state.anyresource;
        }

        if (asset_anyname) {
            return <Asset anyName={asset_anyname} />;
        }
        else if (address) {
            return <Address address={address} />;
        }

        else {
            return (
                <main style={{ padding: "1rem" }}>
                    {/* <main style={{ padding: "1rem 0" }}> */}
                    <h2>Invalid url...</h2>
                </main>
            );
        }

    }
}

export default withRouter(AnyResource);
