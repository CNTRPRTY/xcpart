
const api_host = 'https://7x9p9r8ln2.execute-api.us-east-1.amazonaws.com';

// for now only mainnet

export async function getLatest() {
    // export async function getAssetRoot() {
    // const res = await fetch(`${api_host}/direct/mainnet/latest`);
    const res = await fetch(`${api_host}/mainnet/latest`);
    if (!res.ok) {
        throw Error(`[${res.status}:${res.statusText}]`);
    }
    const data = await res.json();
    return data.data;
}

export async function getRarest() {
    // const res = await fetch(`${api_host}/direct/mainnet/rarest`);
    const res = await fetch(`${api_host}/mainnet/rarest`);
    if (!res.ok) {
        throw Error(`[${res.status}:${res.statusText}]`);
    }
    const data = await res.json();
    return data.data;
}

export async function getAsset(anyname) {
    const res = await fetch(`${api_host}/mainnet/asset/${anyname}`);
    if (!res.ok) {
        if (res.status === 404) { // 404 Not Found
            return null;
        }
        throw Error(`[${res.status}:${res.statusText}]`);
    }
    const data = await res.json();
    return data.data;
}

// TODO this one SHOULD be done client side only with CORS jsons!
export async function getAssetEnhancedJsonResponse(asset_name, issuance_tx_index) {
    const res = await fetch(`${api_host}/mainnet/asset_name/${asset_name}/_enhanced/${issuance_tx_index}`);
    // const res = await fetch(`${api_host}/mainnet/asset/${name}`);
    if (!res.ok) {
        throw Error(`[${res.status}:${res.statusText}]`);
    }
    const data = await res.json();

    // CORS doesn't seem to be a requirement for enhanced
    // this does not allow processing the enhanced asset info client side
    // SO, ignoring this for now
    // const asset = data.data;
    // if (asset.description_latest.description.endsWith('.json')) {
    //     try {
    //         const response = await fetch(`http://${asset.description_latest.description}`, {
    //             "method": "GET"
    //         });
    //         const json = await response.json();
    //         if (json.image) {
    //             asset.description_image = json.image;
    //             if (json.image_large) {
    //                 asset.description_image_large = json.image_large;
    //             }
    //         }
    //     }
    //     catch (err) {
    //         console.log(`not good request error:`);
    //         console.log(err);
    //         // ignore
    //     }
    // }
    // return asset;

    // returning the full response for this one
    return data;
    // return data.data;
}
