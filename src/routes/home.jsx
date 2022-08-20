import React from 'react';

export default class Home extends React.Component {
    render() {
        return (
            <main style={{ padding: "1rem" }}>
                <h1>Welcome to the Timechain</h1>
                <p>
                    This is pre-ALPHA software, released early to{' '}
                    <a href="https://github.com/CounterpartyXCP/cips/issues/54" target="_blank">protect Counterparty core</a>.
                    The purpose of this early release is to start showing an implementation of this{' '}
                    <a href="https://github.com/CounterpartyXCP/cips/issues/54" target="_blank">Bitcoin platform</a> that
                    reads the <a href="https://github.com/CounterpartyXCP/cips/issues/54" target="_blank">core protocol direct from Bitcoin block messages</a>.
                    Don't trust, verify.
                </p>
                <ul>
                    {/* <li>The Bitcoin section will open a new tab to <a href="https://mempool.space/" target="_blank">mempool.space</a></li> */}
                    <li>The Assets section contains the "latest" ({'<'}6 blocks from the <a href="https://mempool.space/" target="_blank">tip</a>) Counterparty assets issued or updated in Bitcoin blocks</li>
                    {/* <li>The Assets section contains the "latest" (3 to 6 blocks from the <a href="https://mempool.space/" target="_blank">tip</a>) Counterparty assets issued or updated in Bitcoin blocks</li> */}
                    <li>Type your asset of interest in the url (<a href="https://counterparty.io/docs/enhanced_asset_info/">timechain.info/assets/TEST</a>)</li>
                    <li>The Rarest section contains top stats from Counterparty asset data</li>
                </ul>
                {/* <p>Counterparty v3 // rules:</p> */}
                <p>Help:</p>
                <ul>
                    <li>[description / quantity / lock / genesis: {`<ISO formatted time>`}] : assets can have multiple kinds of <a href="https://counterparty.io/docs/enhanced_asset_info/" target="_blank">events</a></li>
                    <li>[+] : the asset could be <a href="https://counterparty.io/docs/enhanced_asset_info/" target="_blank">enhanced</a></li>
                    <li>[created by: {`<Counterparty ready Bitcoin address>`}] : the assets are created with Counterparty compatible <a href="https://counterparty.io/wallets/" target="_blank">wallets</a></li>
                    <li>[divisibility: satoshi / whole number] : the asset could be considered divisible or indivisible, but the quantitiy numbers are the <a href="https://counterparty.io/docs/api/#quantities-and-balances" target="_blank">same</a></li>
                </ul>
                <ul>
                    <li>Support this project by sending BTC, XCP, or any asset to: 1Jotapea0r3BMjv3LcgFewRXZZikCqsRjT</li>
                </ul>
            </main>
        );
    }
}
