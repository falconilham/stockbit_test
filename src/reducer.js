export function addData(state = [], action) {
    switch (action.type) {
        case "DATA/ADD_DATA":
            return action.payload
        case "DATA/MORE_DATA":
            return [...state, action.payload]
        default:
            return state;
    }
}