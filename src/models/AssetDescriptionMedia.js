
// TODO how many left?
const TYPES = {
    IMGUR_COM: 'imgur.com',
    IMGUR: 'imgur', // https://xchain.io/asset/BEARFACTS.misprint
    YOUTUBE: 'youtube', // https://xchain.io/asset/CANTSUCKDICK
    SOUNDCLOUD: 'soundcloud', // https://xchain.io/asset/BACKINBLOOD
};

function getImgurElement(media_check_pre) {
    const media_path = media_check_pre.split('/')[1];
    return (<img src={`https://i.imgur.com/${media_path}`} />);
}

function getYoutubeElement(media_check_pre) {
    const media_path = media_check_pre.split('/')[1];
    return (<iframe src={`https://www.youtube.com/embed/${media_path}`} allowfullscreen=""></iframe>);
    // return (<iframe src="https://www.youtube.com/embed/FenVJ_cyE5M" allowfullscreen="" class="embedded-video" frameborder="0"></iframe>);
}

function getSoundcloudElement(media_check_pre) {
    const media_path = media_check_pre.split('/')[1];
    return (<iframe src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${media_path}`}></iframe>);
    // return (
    //     <div>
    //         <iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/34019569&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/the-bugle" title="The Bugle" target="_blank" style="color: #cccccc; text-decoration: none;">The Bugle</a> · <a href="https://soundcloud.com/the-bugle/bugle-179-playas-gon-play" title="Bugle 179 - Playas gon play" target="_blank" style="color: #cccccc; text-decoration: none;">Bugle 179 - Playas gon play</a></div>
    //     </div>
    // );
}

class AssetDescriptionMedia {

    static get TYPES() {
        return TYPES;
    }

    static checkIfDescriptionMedia(description) {
        let media_check_pre = description.split(';')[0];
        if (media_check_pre.length) {

            ////////////////////
            // remove http(s)://
            // console.log(`zzzzzzzz1`);
            // console.log(media_check_pre);
            if (media_check_pre.startsWith('http')) {
                // console.log(`zzzzzzzz2`);
                media_check_pre = media_check_pre.split('://')[1];
                // console.log(media_check_pre);
            }
            // console.log(`zzzzzzzz3`);
            // console.log(media_check_pre);
            ////////////////////

            const media_check = media_check_pre.split('/')[0];
            if (media_check.length) {
                if (Object.values(AssetDescriptionMedia.TYPES).includes(media_check)) {
                    return true;
                }
            }
        }
        return false;
    }

    static getElementIfDescriptionMedia(description) {
        ////////
        let media_check_pre = description.split(';')[0];
        // const media_check_pre = asset.latest_description_issuance.description.split(';')[0];
        if (media_check_pre.length) {
            ////////////////////
            // remove http(s)://
            if (media_check_pre.startsWith('http')) {
                media_check_pre = media_check_pre.split('://')[1];
            }
            ////////////////////
            const media_check = media_check_pre.split('/')[0];
            if (media_check.length) {
                if (Object.values(AssetDescriptionMedia.TYPES).includes(media_check)) {
                    if (media_check === AssetDescriptionMedia.TYPES.IMGUR_COM) {
                        return getImgurElement(media_check_pre);
                    }
                    else if (media_check === AssetDescriptionMedia.TYPES.IMGUR) {
                        return getImgurElement(media_check_pre);
                    }
                    else if (media_check === AssetDescriptionMedia.TYPES.YOUTUBE) {
                        return getYoutubeElement(media_check_pre);
                    }
                    else if (media_check === AssetDescriptionMedia.TYPES.SOUNDCLOUD) {
                        return getSoundcloudElement(media_check_pre);
                    }
                    else {
                        console.log(`TODO else media:`);
                        console.log(media_check);
                    }
                }
            }
        }
        return null;
        ////////
    }

}

export default AssetDescriptionMedia;
