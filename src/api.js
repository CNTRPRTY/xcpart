
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
