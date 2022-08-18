
const api = 'https://7x9p9r8ln2.execute-api.us-east-1.amazonaws.com';

// for now only mainnet

export async function getAssetRoot() {
    const res = await fetch(`${api}/mainnet/asset`);
    if (!res.ok) {
        throw Error(`[${res.status}:${res.statusText}]`);
    }
    const data = await res.json();
    return data.data;
}

export async function getAsset(name) {
    const res = await fetch(`${api}/mainnet/asset/${name}`);
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

    return data.data;
}
