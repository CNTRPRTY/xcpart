// https://bitcoin.stackexchange.com/a/106497
// https://medium.com/@bitcoindeezy/bitcoin-basics-programming-with-bitcoinjs-lib-4a69218c0431

// const bitcoin = require('bitcoinjs-lib');

export function validateBitcoinAddress(new_network_name, address) {
    try {
        if (address.toUpperCase() === address) {
            // false
            throw Error(`temporary is name C`); // cnsnt
        }
        return true;

        // const network = bitcoin.networks.bitcoin;
        // bitcoin.address.toOutputScript(address, network);
        // return true;
    }
    catch (err) {
        // console.log(err)
        // console log?
        return false;
    }
}
