import React from 'react';
import { Link } from "react-router-dom";

export default class Home extends React.Component {
    render() {

        // console.log(`vvvvvvv1`);
        // console.log(process.env);
        // console.log(`vvvvvvv2`);

        // const app_host = (process.env.NODE_ENV === "development") ? "http://localhost:3000" : process.env.REACT_APP_HOST;

        return (
            <main style={{ padding: "1rem" }}>

                <h1>bitSTART</h1>
                {/* <h1><strong>bitSTART</strong></h1> */}
                {/* <h1>Welcome to bitSTART</h1> */}
                {/* <h1>Welcome to bitST.ART</h1> */}

                <h2>BITCOIN MAXIMUM EXPRESSION</h2>

                <h3>Discover Bitcoin Art Assets ("NFTs")</h3>
                {/* <p>Discover Bitcoin Art and Assets</p> */}
                {/* <h3>Discover Bitcoin Art and Assets ("NFTs")</h3> */}
                {/* <h3>Discover Bitcoin Art and Assets</h3> */}

                {/* <br /> */}
                {/* <p>
                    (This is pre-ALPHA software.{' '}
                    The <a href="https://github.com/CounterpartyXCP/cips/issues/54" target="_blank">purpose</a> of this early release{' '}
                    is to start showing an implementation of the Counterparty Bitcoin platform that{' '}
                    reads the <a href="https://counterparty.io/docs/api/#get_blocks" target="_blank">core protocol direct from Bitcoin blocks</a>.{' '}
                    Don't trust, verify.)
                </p> */}
                {/* <p>
                    This is pre-ALPHA software, released early to{' '}
                    <a href="https://github.com/CounterpartyXCP/cips/issues/54" target="_blank">protect Counterparty core</a>.
                    The purpose of this early release is to start showing an implementation of this{' '}
                    <a href="https://github.com/CounterpartyXCP/cips/issues/54" target="_blank">Bitcoin platform</a> that
                    reads the <a href="https://github.com/CounterpartyXCP/cips/issues/54" target="_blank">core protocol direct from Bitcoin block messages</a>.
                    Don't trust, verify.
                </p> */}

                {/* <ul>
                    //<li>Type a Counterparty asset of interest in the url (<a href="https://counterparty.io/docs/enhanced_asset_info/">bitst.art/TEST</a>)</li>
                    //<li>The Bitcoin section will open a new tab to <a href="https://mempool.space/" target="_blank">mempool.space</a></li>
                    <li>The <Link to="/_latest">Latest</Link> section contains the "most recent" ({'<'}6 blocks from the <a href="https://mempool.space/" target="_blank">tip</a>) Counterparty assets issued or updated in Bitcoin blocks</li>
                    //<li>The Assets section contains the "latest" ({'<'}6 blocks from the <a href="https://mempool.space/" target="_blank">tip</a>) Counterparty assets issued or updated in Bitcoin blocks</li>
                    //<li>The Assets section contains the "latest" (3 to 6 blocks from the <a href="https://mempool.space/" target="_blank">tip</a>) Counterparty assets issued or updated in Bitcoin blocks</li>
                    <li>The <Link to="/_rarest">Rarest</Link> section contains top stats from Counterparty asset data</li>
                </ul> */}

                {/* <br />
                <h4>Start</h4>
                <ul>
                    <li>The <Link to="/_latest">Latest</Link> section contains the "most recent" ({'<'}6 blocks from the <a href="https://mempool.space/" target="_blank">tip</a>) <a href="https://github.com/CounterpartyXCP/cips/issues/54" target="_blank">Counterparty</a> assets issued or updated in Bitcoin <a href="https://counterparty.io/docs/api/#get_blocks" target="_blank">blocks</a></li>
                    <li>The <Link to="/_rarest">Rarest</Link> section shows the rarest assets, like the first one ever <b><Link to="/TEST">bitst.art/TEST</Link></b> and the first zero quantity issuance <b><Link to="/SONY">bitst.art/SONY meehh otro no unlocked</Link></b></li>
                </ul> */}
                {/* <p>
                    The <Link to="/_latest">Latest</Link> section contains the "most recent" ({'<'}6 blocks from the <a href="https://mempool.space/" target="_blank">tip</a>){' '}
                    <a href="https://github.com/CounterpartyXCP/cips/issues/54" target="_blank">Counterparty</a> assets issued or updated in Bitcoin <a href="https://counterparty.io/docs/api/#get_blocks" target="_blank">blocks</a>.{' '}
                    // The <Link to="/_latest">Latest</Link> section contains the "most recent" ({'<'}6 blocks from the <a href="https://mempool.space/" target="_blank">tip</a>) Counterparty assets ("NFTs") issued or updated in Bitcoin blocks.
                    The <Link to="/_rarest">Rarest</Link> section shows the rarest assets, like the first one: <b><Link to="/TEST">bitst.art/TEST</Link></b>
                </p> */}

                {/* <br /> */}
                {/* <h4>Idea</h4> */}
                {/* <p> */}
                {/* // Every <a href="http://localhost:3000/TEST" target="_blank">thing</a> starts with a name.{' '}
                    The Counterparty platform uses Bitcoin to store "special" messages eternally in the <a href="https://bitcointalk.org/index.php?topic=382374.0" target="_blank">timechain</a>.{' '}
                    // Every <a href="http://localhost:3000/TEST" target="_blank">thing</a> starts with a name. The Counterparty platform uses Bitcoin to store messages eternally in the <a href="https://github.com/CounterpartyXCP/cips/issues/54" target="_blank">timechain</a>.
                    Assets start with a name.{' '}
                    Choose or generate a forever unique name, with this you have your first asset issuance. Like: <b><Link to="/TEST">bitst.art/TEST</Link></b> */}
                {/* Choose or generate a forever unique name, then do your first asset issuance: <b><a href={`${app_host}/TEST`}>bitst.art/TEST</a></b> */}
                {/* Choose or generate a forever unique name, then do your first asset issuance: <b><a href="http://localhost:3000/TEST">bitst.art/TEST</a></b> */}
                {/* Choose or generate a forever unique name, then do your first asset issuance: <b><a href="http://localhost:3000/TEST" target="_blank">bitst.art/TEST</a></b> */}
                {/* </p> */}

                <br />
                <p>
                    Start discovering assets through the <Link to="/_latest">Latest</Link>, <Link to="/_rarest">Rarest</Link> and <Link to="/_all">All</Link> sections.{' '}
                    {/* Start discovering assets through the <Link to="/_latest">Latest</Link> and <Link to="/_rarest">Rarest</Link> sections.{' '} */}
                    Or type the [asset / address / block] of interest in the url or search bar.</p>
                {/* Or type the [asset / address / block] of interest in the url.</p> */}
                <br />
                {/* <p>Counterparty v3 // rules:</p> */}
                <p>Help:</p>
                {/* <ul>
                    <li>Start discovering assets through the <Link to="/_latest">Latest</Link> and <Link to="/_rarest">Rarest</Link> sections</li>
                    // <li>Discover assets through the <Link to="/_latest">Latest</Link> and <Link to="/_rarest">Rarest</Link> sections</li>
                    // <li>Go to the <Link to="/_latest">Latest</Link> and <Link to="/_rarest">Rarest</Link> sections</li>
                    <li>Type the asset, address or block of interest in the url</li>
                    // <li>The <Link to="/_latest">Latest</Link> section contains the "most recent" ({'<'}6 blocks from the <a href="https://mempool.space/" target="_blank">tip</a>) <a href="https://github.com/CounterpartyXCP/cips/issues/54" target="_blank">Counterparty</a> assets issued or updated in Bitcoin <a href="https://counterparty.io/docs/api/#get_blocks" target="_blank">blocks</a></li>
                    // <li>The <Link to="/_rarest">Rarest</Link> section shows the rarest assets</li>
                </ul> */}
                <ul>
                    <li>All assets are LOCKED assets, unless specified otherwise</li>
                    <li>NFT [no destroy / by destroy] : Non-Fungible Token, achieved by destroying supply or not</li>
                    {/* <li>NFT [no destroy / by destroy] : Non-Fungible Token, achieved by destroying supply or not (no destroy is purer)</li> */}
                    <li>[quantity: {`<total asset supply>`}] : unlocked assets can issue more supply, locked assets cannot (but both can destroy supply)</li>
                    <li>[description / quantity / lock / genesis: {`<ISO formatted time>`}] : assets can have multiple kinds of issuance events</li>
                    <li>[m] : (click to switch inside assets) the asset could have media content associated to it (which could be <a href="https://counterparty.io/docs/enhanced_asset_info/" target="_blank">enhanced</a>)</li>
                    {/* <li><b>[m]</b> : (switchable inside events) the asset could have media content associated to it (which could be <a href="https://counterparty.io/docs/enhanced_asset_info/" target="_blank">enhanced</a>)</li> */}
                    {/* <li><b>[m]</b> : (clickable inside events) the asset could have media content associated to it (which could be <a href="https://counterparty.io/docs/enhanced_asset_info/" target="_blank">enhanced</a>)</li> */}
                    <li>[subassets: {`<number of subassets>`}] : a "root" asset can create children assets, called subassets</li>
                    <li>[issuer: {`<Counterparty ready Bitcoin address>`}] : the assets are issued (created / updated) with Counterparty compatible <a href="https://counterparty.io/wallets/" target="_blank">wallets</a></li>

                    {/* <li>All assets are <a href="https://counterparty.io/docs/enhanced_asset_info/" target="_blank">LOCKED</a> assets, unless specified otherwise</li> */}

                    {/* <li>[quantity: {`<total asset supply>`}] : unlocked assets can <a href="https://counterparty.io/docs/enhanced_asset_info/" target="_blank">issue</a> more supply, locked assets cannot (but both can <a href="https://counterparty.io/docs/enhanced_asset_info/" target="_blank">destroy</a> supply)</li> */}
                    {/* <li>[total: {`<asset supply>`}] : unlocked assets can <a href="https://counterparty.io/docs/enhanced_asset_info/" target="_blank">issue</a> more supply, locked assets cannot (but both can <a href="https://counterparty.io/docs/enhanced_asset_info/" target="_blank">destroy</a> supply)</li> */}

                    {/* <li>All asset lists only consider <a href="https://counterparty.io/docs/enhanced_asset_info/" target="_blank">LOCKED</a> assets, unless specified otherwise</li> */}

                    {/* <li>NFT [no destroy / by destroy] : Non-Fungible Token, achieved by destroying supply or not (no destroy is <a href="https://counterparty.io/docs/enhanced_asset_info/" target="_blank">purer</a>)</li>
                    <li>[quantity: {`<total asset supply>`}] : unlocked assets can <a href="https://counterparty.io/docs/enhanced_asset_info/" target="_blank">issue</a> more supply, locked assets cannot (but both can <a href="https://counterparty.io/docs/enhanced_asset_info/" target="_blank">destroy</a> supply)</li>
                    <li>[description / quantity / lock / genesis: {`<ISO formatted time>`}] : assets can have multiple kinds of issuance <a href="https://counterparty.io/docs/enhanced_asset_info/" target="_blank">events</a></li> */}

                    {/* <li>[description / quantity / lock / genesis: {`<ISO formatted time>`}] : assets can have multiple kinds of <a href="https://counterparty.io/docs/enhanced_asset_info/" target="_blank">events</a></li> */}
                    {/* <li>[c] : the asset could have media content associated to it (which could be <a href="https://counterparty.io/docs/enhanced_asset_info/" target="_blank">enhanced</a>)</li> */}
                    {/* <li>[+] : the asset could be <a href="https://counterparty.io/docs/enhanced_asset_info/" target="_blank">enhanced</a></li> */}

                    {/* LIKE using superasset, but not yet... */}
                    {/* <li>[subassets: {`<number of subassets>`}] : a "root" asset can create children assets, called <a href="https://counterparty.io/docs/enhanced_asset_info/" target="_blank">subassets</a></li> */}
                    {/* <li>[subassets: {`<number of subassets>`}] : a basic "root" asset can create children assets, called <a href="https://counterparty.io/docs/enhanced_asset_info/" target="_blank">subassets</a></li> */}
                    {/* <li>[subassets: {`<number of subassets>`}] : a basic "root" asset can become a "superasset" when it creates children assets, called subassets</li> */}

                    {/* <li>[divisibility: satoshi / whole number] : the asset could be considered divisible or indivisible, but the quantity numbers are <a href="https://counterparty.io/docs/api/#quantities-and-balances" target="_blank">equivalent</a></li>
                    <li>[issuer: {`<Counterparty ready Bitcoin address>`}] : the assets are issued (created / updated) with Counterparty compatible <a href="https://counterparty.io/wallets/" target="_blank">wallets</a></li> */}
                    {/* <li>[created by: {`<Counterparty ready Bitcoin address>`}] : the assets are created with Counterparty compatible <a href="https://counterparty.io/wallets/" target="_blank">wallets</a></li> */}
                    {/* <li>[divisibility: satoshi / whole number] : the asset could be considered divisible or indivisible, but the quantity numbers are <a href="https://counterparty.io/docs/api/#quantities-and-balances" target="_blank">equivalent</a></li> */}
                    {/* <li>[divisibility: satoshi / whole number] : the asset could be considered divisible or indivisible, but the quantity numbers are the <a href="https://counterparty.io/docs/api/#quantities-and-balances" target="_blank">same</a></li> */}
                </ul>
                <ul>
                    <li>For any request or feedback please tweet or DM <a href="https://twitter.com/uanbtc" target="_blank">@uanbtc</a></li>
                    {/* <li>Any request or feedback can tweet or DM <a href="https://twitter.com/uanbtc" target="_blank">@uanbtc</a></li> */}
                    {/* <li>Support this project by sending BTC, XCP, or any asset to: <a href="bitcoin:1Jotapea0r3BMjv3LcgFewRXZZikCqsRjT" target="_blank">1Jotapea0r3BMjv3LcgFewRXZZikCqsRjT</a></li> */}
                </ul>

                <br />
                <p>
                    [bitSTART v2022.5]
                    {/* [bitSTART v2022] */}
                    {/* [bitSTART v2022a] */}
                    <br />
                    [counterparty-lib v9.59.6] in [Bitcoin Core v0.21.1]
                    {/* built on: [counterparty-lib v9.59.6] [Bitcoin Core v0.21.1] */}
                    {/* <p>[bitSTART v2022a][counterparty-lib v9.59.6][Bitcoin Core v0.21.1]</p> */}
                </p>
            </main>
        );
    }
}
