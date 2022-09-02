import { getBlock } from "../api";
import React from 'react';
import { withRouter } from './shared/classhooks';
import { Link } from "react-router-dom";

class Block extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            block: props.block,
            block_not_found: null,
            block_assets: null
            // block_events: null
            // block_events: []
        };
    }

    async fetchData(block_height) {
        const block_assets = await getBlock(block_height);
        // const block_events = await getBlock(block_height);
        // const address_assets = await getAddress(address);

        // TODO? seems like a reset of constructor params will be needed here...

        if (!block_assets) {
            // if (!block_events) {
            this.setState({ block_not_found: true });
        }
        else {
            this.setState({
                block_assets: block_assets.assets
                // block_events: block_events.events
            });
        }

    }

    async componentDidMount() {
        await this.fetchData(this.state.block);
    }

    async componentDidUpdate(prevProps) {
        const updatedProp = this.props.block;
        if (updatedProp !== prevProps.block) {
            await this.fetchData(updatedProp);
            // const updatedAddress = this.props.block;
            // if (updatedAddress !== prevProps.block) {
            //     await this.fetchData(updatedAddress);
        }
    }

    render() {
        if (this.state.block_not_found) {
            return (
                <main style={{ padding: "1rem" }}>
                    {/* <main style={{ padding: "1rem 0" }}> */}
                    <h2>No block found</h2>
                </main>
            );
        }
        else if (this.state.block_assets && !this.state.block_assets.length) {
            // else if (this.state.block_events && !this.state.block_events.length) {
            return (
                <main style={{ padding: "1rem" }}>
                    {/* <main style={{ padding: "1rem 0" }}> */}
                    {/* <h2>No address found</h2> */}
                    <h2>No events found in block</h2>
                </main>
            );
        }
        else if (this.state.block_assets && this.state.block_assets.length) {
            // else if (this.state.block_events && this.state.block_events.length) {

            // const subassets_list_element = this.state.asset_resource.subassets ? (<li>subassets:<ul>{this.state.asset_resource.subassets.map((subasset) => (<li key={subasset}><Link to={`/${subasset}`}>{subasset}</Link></li>))}</ul></li>) : null;

            return (
                <main style={{ padding: "1rem" }}>
                    {/* <main style={{ padding: "1rem 0" }}> */}
                    <h1>Assets with event in block:</h1>

                    {/* TODO? maybe include more metadata for the address in a formatted form? */}
                    {/* <h2>{<Link to={`/${this.state.block}`}>{this.state.block}</Link>}</h2> */}
                    <h2>{this.state.block}</h2>

                    <ul>
                        {this.state.block_assets.map((mainname_obj) => (<li key={mainname_obj.index} style={{ padding: "0.25rem" }}>{<Link to={`/${mainname_obj.mainname}`}>{mainname_obj.mainname}</Link>}</li>))}
                        {/* {this.state.block_assets.map((mainname_obj) => (<li key={mainname_obj.index}>{<Link to={`/${mainname_obj.mainname}`}>{mainname_obj.mainname}</Link>}</li>))} */}
                        {/* {this.state.block_events.map((mainname_obj) => (<li key={mainname_obj.index}>{<Link to={`/${mainname_obj.mainname}`}>{mainname_obj.mainname}</Link>}</li>))} */}
                        {/* {this.state.block_events.map((block_event) => (<li key={block_event.id}><Link to={`/${asset_mainname}`}>{asset_mainname}</Link></li>))} */}
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

export default withRouter(Block);
