
import { getAssetEnhancedJsonResponse } from "../api";

// YAKUZIPEPE
// TODO how many left?
const TYPES = {
    IMAGE_THUMBNAIL: 'image',
    IMAGE_LARGE: 'image_large',
    VIDEO: 'video',
};

function getImageElement(media_url) {
    return (<img src={`${media_url}`} />);
}

function getVideoElement(media_url) {
    return (<video controls src={`${media_url}`}></video>);

    // TODO! WITH THUMBNAIL
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
    // //////
    // <video controls
    //     src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
    //     poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
    //     width="620">
    // Sorry, your browser doesn't support embedded videos,
    // but don't worry, you can <a href="https://archive.org/details/BigBuckBunny_124">download it</a>
    // and watch it with your favorite video player!
    // </video>

}

// separated because this one is inherently async, while the other one is a direct element creation
class AssetDescriptionEnhancedMedia {

    static get TYPES() {
        return TYPES;
    }

    static async getElementIfSuccessWithEnhancedMedia(asset_name, issuance_tx_index) {

        const response = await getAssetEnhancedJsonResponse(asset_name, issuance_tx_index);

        if (Object.keys(response.data).length) {

            const enhanced_json = response.data;

            // for now, only selecting 1, and trying the best first
            if (
                Object.hasOwn(enhanced_json, AssetDescriptionEnhancedMedia.TYPES.VIDEO) &&
                enhanced_json[AssetDescriptionEnhancedMedia.TYPES.VIDEO]
            ) {
                return getVideoElement(enhanced_json[AssetDescriptionEnhancedMedia.TYPES.VIDEO]);
            }
            else if ( // done like this to be able to get these based on being defined in TYPES
                Object.hasOwn(enhanced_json, AssetDescriptionEnhancedMedia.TYPES.IMAGE_LARGE) && // has property
                enhanced_json[AssetDescriptionEnhancedMedia.TYPES.IMAGE_LARGE] // is not null
            ) {
                return getImageElement(enhanced_json[AssetDescriptionEnhancedMedia.TYPES.IMAGE_LARGE]);
            }
            else if (
                Object.hasOwn(enhanced_json, AssetDescriptionEnhancedMedia.TYPES.IMAGE_THUMBNAIL) &&
                enhanced_json[AssetDescriptionEnhancedMedia.TYPES.IMAGE_THUMBNAIL]
            ) {
                return getImageElement(enhanced_json[AssetDescriptionEnhancedMedia.TYPES.IMAGE_THUMBNAIL]);
            }
            else {
                console.log(`TODO else:`);
                console.log(JSON.stringify(enhanced_json));
            }

        }
        else {
            // TODO? more
            console.log(`no json returned by: ${response.message}`);
        }

        // if none of the above returned
        return null;

    }

}

export default AssetDescriptionEnhancedMedia;
