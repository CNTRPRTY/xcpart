import React from 'react';
import { Link } from "react-router-dom";

export default class Home extends React.Component {
    render() {
        return (
            <main style={{ padding: "1rem" }}>
                <h2>Open Source Counterparty Bitcoin Art Explorer</h2>
                <br />
                <p>
                    Start discovering assets through the <Link to="/_latest">Latest</Link>, <Link to="/_rarest">Rarest</Link> and <Link to="/_all">All</Link> sections.{' '}
                    Or type the [asset / address / block] of interest in the url or search bar.</p>
                <br />
                <p>Help:</p>
                <ul>
                    <li>All assets are LOCKED assets, unless specified otherwise</li>
                    <li>NFT [no destroy / by destroy] : Non-Fungible Token, achieved by destroying supply or not</li>
                    <li>[quantity: {`<total asset supply>`}] : unlocked assets can issue more supply, locked assets cannot (but both can destroy supply)</li>
                    <li>[description / quantity / lock / genesis: {`<ISO formatted time>`}] : assets can have multiple kinds of issuance events</li>
                    <li>[m] : (click to switch inside assets) the asset could have media content associated to it (which could be <a href="https://counterparty.io/docs/enhanced_asset_info/" target="_blank">enhanced</a>)</li>
                    <li>[subassets: {`<number of subassets>`}] : a "root" asset can create children assets, called subassets</li>
                    <li>[issuer: {`<Counterparty ready Bitcoin address>`}] : the assets are issued (created / updated) with Counterparty compatible <a href="https://counterparty.io/wallets/" target="_blank">wallets</a></li>
                </ul>
                <ul>
                    <li>For any request or feedback please tweet or DM <a href="https://twitter.com/uanbtc" target="_blank">@uanbtc</a></li>
                </ul>
                <br />
                <p>
                    [xcp.art v1.0]
                    <br />
                    [counterparty-lib v9.59.6] in [Bitcoin Core v0.21.1]
                </p>
            </main>
        );
    }
}
