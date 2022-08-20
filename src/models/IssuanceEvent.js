// TODO? maybe rename this as schema? like graphql?

const TYPES = {
    GENESIS: 'genesis',
    LOCK: 'lock',

    UPDATE_QUANTITY: 'quantity', // issuances>0 and destroys
    UPDATE_DESCRIPTION: 'description'
};

// includes destroys
class IssuanceEvent {

    // like the ones returned in the api?
    // - yes if there is focus on events...
    // - no if more like the ones I want to show in this frontend, frontend focused...
    static get TYPES() {
        return TYPES;
    }

}

export default IssuanceEvent;
