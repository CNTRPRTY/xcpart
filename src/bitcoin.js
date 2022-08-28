// https://bitcoin.stackexchange.com/a/106497
// https://medium.com/@bitcoindeezy/bitcoin-basics-programming-with-bitcoinjs-lib-4a69218c0431

// const bitcoin = require('bitcoinjs-lib');

export function validateBitcoinAddress(new_network_name, address) {
    try {
        // if subasset only validate the superasset part
        const maybe_subasset = address.split('.');
        if (maybe_subasset.length > 1) {
            address = maybe_subasset[0];
        }

        // https://stackoverflow.com/a/8653681
        if (address.match(/^[a-zA-Z]+$/)) {
            // if (address.toUpperCase() === address) {
            // false
            throw Error(`temporary is name C1`); // cnsnt
        }
        else if (
            (
                address.startsWith('A') ||
                address.startsWith('a')
            ) &&
            Number.isInteger(Number(address.substring(1))) // Number.isInteger(99999999999999999999999); // true (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger#using_isinteger)
            // Number.isInteger(address.substring(1)) // Number.isInteger(99999999999999999999999); // true (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger#using_isinteger)
        ) {
            // false
            throw Error(`temporary is name C2`); // cnsnt
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
