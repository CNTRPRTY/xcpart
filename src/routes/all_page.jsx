import React from 'react';
import { withRouter } from './shared/classhooks';
import { getAllpage } from "../api";
import { Link } from "react-router-dom";

// import { formattedAssetRarestElement } from "./shared/elements"
// import IssuanceEvent from "../models/IssuanceEvent";

// // https://stackoverflow.com/a/39914235
// async function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// for now starting with 1 BUT the plan is to have an ALL home
class Allpage extends React.Component {
    // export default class Allpage extends React.Component {
    constructor(props) {
        super(props);

        // // console.log(`vvvvv1`);
        // // console.log(JSON.stringify(props));
        // // console.log(`vvvvv2`);
        // // console.log(props.router.search);
        // console.log(`vvvvv3`);
        // console.log(props.router.location.hash);
        // console.log(`vvvvv4`);
        // // console.log(props.router.location.hash.replace('#', ''));
        // // console.log(`vvvvv5`);

        let page_if_specified = undefined;
        // let page_if_specified = null;
        if (props.router.location.hash.length) {

            // console.log(`vvvvv6`);

            const page_number_string = props.router.location.hash.replace('#', '');

            // ///
            // Number.isInteger(Number(address.substring(1))) // Number.isInteger(99999999999999999999999); // true (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger#using_isinteger)
            // ///
            if (Number.isInteger(Number(page_number_string))) {

                // console.log(`vvvvv7`);

                page_if_specified = Number(page_number_string);
            }
        }

        let go_to_first_clean = false;
        if (page_if_specified !== undefined) {

            //////////
            if (
                (page_if_specified === 0) ||
                (page_if_specified < 2)

            ) {

                // console.log(`vvvvv8`);

                go_to_first_clean = true;
            }
            //////////

        }

        // if (
        //     (page_if_specified === 0) ||
        //     (page_if_specified < 2)

        // ) {

        //     console.log(`vvvvv8`);

        //     go_to_first_clean = true;
        // }

        // if (!page_if_specified) {
        //     page_if_specified = 1;
        // }

        // console.log(`vvvvv9`);

        this.state = {

            // page: page_if_specified,
            // page: props.router.location.hash.replace('#', ''),
            // page: props.router.params.pageNumber,

            page_not_found: null,
            go_to_first_clean,

            total_assets: null,

            current_page: page_if_specified,
            // current_page: null,
            last_page: null,
            rows: [],


            // rarest_first_issuance: null,
            // rarest_first_satoshi_nft_nodestroy_issuance: null,
            // rarest_first_wholenumber_nft_nodestroy_issuance: null,
            // // rarest_first_nft_nodestroy_unlocked_issuance: null,
            // rarest_first_quantity_one_issuance: null,
            // rarest_first_quantity_zero_issuance: null,

            // rarest_first_satoshi_issuance: null,
            // rarest_first_lock_issuance: null,

            // rarest_first_description_issuance: null,
            // rarest_first_destroy: null,
        };
    }

    async fetchData(go_to_first_clean, current_page) {

        // await sleep(10);

        // console.log(`bbbbb1`);
        // console.log(go_to_first_clean);
        // console.log(`bbbbb2`);
        // console.log(current_page);
        // console.log(`bbbbb3`);

        let page_request;
        if (go_to_first_clean) {
            // if (this.state.go_to_first_clean) {
            this.props.router.navigate(`/_all`, { replace: true });
        }
        else {
            if (current_page === undefined) {
                // if (current_page === null) {
                // if (this.state.current_page === null) {
                page_request = 1;
            }
            else {
                // else use page as it should be 2+
                page_request = current_page;
                // page_request = this.state.current_page;
            }

            //////////////
            const allpage_root = await getAllpage(page_request);
            // const allpage_root = await getAllpage(this.state.page);

            if (!allpage_root) {
                this.setState({ page_not_found: true });
            }
            else {
                this.setState({
                    total_assets: allpage_root.total_assets,
                    current_page: allpage_root.current_page,
                    last_page: allpage_root.last_page,
                    rows: allpage_root.rows
                });
            }
            //////////////

        }

        // const allpage_root = await getAllpage(page_request);
        // // const allpage_root = await getAllpage(this.state.page);

        // if (!allpage_root) {
        //     this.setState({ page_not_found: true });
        // }
        // else {
        //     this.setState({
        //         current_page: allpage_root.current_page,
        //         last_page: allpage_root.last_page,
        //         rows: allpage_root.rows
        //     });
        // }

        // // console.log(`bbbbbbbbb1`);
        // // console.log(JSON.stringify(rarest_root));
        // // console.log(`bbbbbbbbb2`);

        // this.setState(rarest_root);
        // // this.setState({
        // //     rarest_first_issuance: rarest_root.rarest_first_issuance,
        // //     rarest_first_satoshi_nft_nodestroy_issuance: rarest_root.rarest_first_satoshi_nft_nodestroy_issuance,
        // // });
    }

    async componentDidMount() {
        await this.fetchData(this.state.go_to_first_clean, this.state.current_page);
    }

    // This method is not called for the initial render (https://reactjs.org/docs/react-component.html#componentdidupdate)
    async componentDidUpdate(prevProps) {

        // console.log(`rrrrrrrrr1`);
        // console.log(JSON.stringify(this.props));
        // console.log(this.props.router.location.hash);
        // console.log(`rrrrrrrrr2`);
        // console.log(JSON.stringify(prevProps));
        // console.log(prevProps.router.location.hash);
        // console.log(`rrrrrrrrr3`);

        const updatedHash = this.props.router.location.hash;
        const prevHash = prevProps.router.location.hash;


        // const updatedAssetAnyame = this.props.anyName;
        // // const updatedAssetAnyame = this.props.router.params.anyName;
        // // Typical usage (don't forget to compare props):
        if (updatedHash !== prevHash) {
            // if (updatedAssetAnyame !== prevProps.anyName) {
            // if (updatedAssetAnyame !== prevProps.router.params.anyName) {
            // const updatedAssetName = this.props.router.params.assetName;
            // // Typical usage (don't forget to compare props):
            // if (updatedAssetName !== prevProps.router.params.assetName) {
            const current_page = updatedHash.replace('#', '');
            await this.fetchData(false, Number(current_page));
            // await this.fetchData(updatedAssetAnyame);
            // await this.fetchData(updatedAssetName);
        }

    }

    render() {

        // console.log(`ttttttt1`);
        // console.log(JSON.stringify(this.state));
        // console.log(`ttttttt2`);
        // // console.log(this.state.rarest_first_locked_nft_nodestroy_issuance);
        // // console.log(`ttttttt3`);

        let content_total_assets = ` loading...`;

        let content_element = (<h2>loading...</h2>);
        if (this.state.page_not_found) {
            return (
                <main style={{ padding: "1rem" }}>
                    {/* <main style={{ padding: "1rem 0" }}> */}
                    <h2>No results found</h2>
                </main>
            );
        }
        else if (

            this.state.rows.length

            // this.state.rarest_first_issuance &&
            // this.state.rarest_first_satoshi_nft_nodestroy_issuance &&

        ) {

            // console.log(`iiiiii1`);
            // console.log(JSON.stringify(this.state));
            // console.log(`iiiiii2`);

            content_total_assets = ` ${this.state.total_assets}`;

            const current_page = this.state.current_page;
            const is_first = (current_page === 1);
            const is_last = (current_page === this.state.last_page);

            let first_link = (
                <td>
                    <Link to={`/_all#1`}>first</Link>{' '}
                </td>
            );
            let previous_page_column;
            if (is_first) {
                first_link = (
                    <td></td>
                );
                previous_page_column = (
                    <td></td>
                );
            }
            else {
                const previous_page = current_page - 1;
                previous_page_column = (
                    <td>
                        <Link to={`/_all#${previous_page}`}>previous</Link>{' '}
                    </td>
                );
            }

            let last_link = (
                <td>
                    <Link to={`/_all#${this.state.last_page}`}>last</Link>{' '}
                </td>
            );
            let next_page_column;
            if (is_last) {
                last_link = (
                    <td></td>
                );
                next_page_column = (
                    <td></td>
                );
            }
            else {
                const next_page = current_page + 1;
                next_page_column = (
                    <td>
                        <Link to={`/_all#${next_page}`}>next</Link>{' '}
                    </td>
                );
            }

            let rangeEnd = current_page * 100;
            const rangeStart = rangeEnd - 99;

            if (is_last) {
                rangeEnd = rangeStart + this.state.rows.length - 1;
            }

            const change_pages_element = (
                <table>
                    <tbody>
                        <tr style={{ padding: "0.25rem" }}>
                            {first_link}
                            {previous_page_column}
                            <td>page {current_page} ({rangeStart} to {rangeEnd})</td>
                            {next_page_column}
                            {last_link}
                        </tr>
                    </tbody>
                </table>
            );

            content_element = (
                <div>

                    <h2>Asset issuing addresses ordered by the amount of issuances done (most recent first):</h2>
                    {/* <h2>Addresses ordered by the amount of issuances done, then by most recent:</h2> */}
                    {/* <h2>Addresses:</h2> */}
                    {/* <h2>All addresses:</h2> */}
                    {/* <h2>SQL query:</h2> */}

                    {/* <div>
                        <code>
                            SELECT issuer, COUNT(*) as issuances, MAX(block_index) as last_block
                            FROM issuance
                            WHERE status = 'valid'
                            GROUP BY issuer
                            ORDER BY issuances ASC, last_block DESC;
                        </code>
                    </div> */}

                    {/* <h3>Addresses ordered by the amount of issuances done, then by most recent</h3> */}

                    {/* <br /> */}
                    {/* SELECT issuer, COUNT(*) as entries, MAX(block_index) as last_block */}
                    {change_pages_element}

                    <table>
                        <tbody>
                            {/* <td>The table body</td> */}
                            <tr style={{ padding: "0.25rem" }}>

                                <td style={{ padding: "0 1rem 0.25rem 0" }}></td>
                                <td style={{ padding: "0 1rem 0.25rem 0" }}></td>
                                <td style={{ padding: "0 1rem 0.25rem 0" }}>assets</td>
                                <td style={{ padding: "0 1rem 0.25rem 0" }}>issuances</td>
                                <td style={{ padding: "0 1rem 0.25rem 0" }}>last event (block)</td>

                                {/* <td style={{ padding: "0.25rem 1rem" }}></td>
                                <td style={{ padding: "0.25rem 1rem" }}></td>
                                <td style={{ padding: "0.25rem 1rem" }}>issuances</td>
                                <td style={{ padding: "0.25rem 1rem" }}>last event (block)</td> */}
                                {/* <td>entries</td> */}
                                {/* <td>last block</td> */}
                            </tr>
                            {this.state.rows.map((allpage_one_result, index) => (
                                // TODO? hmmm is there a way to easily keep adding the pages?
                                <tr key={index} style={{ padding: "0.25rem" }}>
                                    {/* <li key={index} style={{ padding: "0.25rem" }}> */}

                                    <td style={{ padding: "0 1rem 0 0" }}>{allpage_one_result.index + 1}</td>
                                    <td style={{ padding: "0 1rem 0 0" }}><Link to={`/${allpage_one_result.issuer}`}>{allpage_one_result.issuer}</Link>{' '}</td>
                                    <td style={{ padding: "0 1rem 0 0" }}>{allpage_one_result.assets}{' '}</td>
                                    <td style={{ padding: "0 1rem 0 0" }}>{allpage_one_result.issuances}{' '}</td>
                                    <td style={{ padding: "0 1rem 0 0" }}><Link to={`/${allpage_one_result.issuer}`}>{allpage_one_result.last_block}</Link></td>

                                    {/* <td>{allpage_one_result.index + 1}</td>
                                    <td><Link to={`/${allpage_one_result.issuer}`}>{allpage_one_result.issuer}</Link>{' '}</td>
                                    <td>{allpage_one_result.issuances}{' '}</td>
                                    <td><Link to={`/${allpage_one_result.issuer}`}>{allpage_one_result.last_block}</Link></td> */}

                                    {/* <td>[block: <Link to={`/${allpage_one_result.issuer}`}>{allpage_one_result.last_block}</Link>]</td> */}
                                    {/* </li> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* <ul>
                        {this.state.page_results.map((allpage_one_result, index) => (
                            <li key={index} style={{ padding: "0.25rem" }}>
                                <Link to={`/${allpage_one_result.issuer}`}>{allpage_one_result.issuer}</Link>{' '}
                                ({allpage_one_result.entries}){' '}
                                [block: <Link to={`/${allpage_one_result.issuer}`}>{allpage_one_result.last_block}</Link>]
                            </li>
                        ))}
                    </ul> */}

                    {/* <h2>First description issuance</h2>
                    {formattedAssetRarestElement(
                        this.state.rarest_first_description_issuance,
                        this.state.rarest_first_description_issuance.event,
                        IssuanceEvent.TYPES.UPDATE_DESCRIPTION,
                        false
                    )}

                    <h2>First destroy</h2>
                    {formattedAssetRarestElement(
                        this.state.rarest_first_destroy,
                        this.state.rarest_first_destroy.event,
                        IssuanceEvent.TYPES.UPDATE_QUANTITY,
                        false
                    )} */}


                </div>
            );
        }

        return (
            <main style={{ padding: "1rem" }}>

                <h1>Total assets:{content_total_assets}</h1>

                {/* <main style={{ padding: "1rem 0" }}> */}
                {/* <h1>All:</h1> */}
                <h1>All addresses:</h1>
                {/* <h1>All page first title:</h1> */}
                {/* <h1>Rarest assets:</h1> */}
                {content_element}
            </main>
        );
    }
}

export default withRouter(Allpage);
