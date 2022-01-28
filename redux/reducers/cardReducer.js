export var card = (state = [], action) => {
    if (action.type === 'changeCardAdd') {
        return action.playload
    }
    if (action.type === 'changeCardRemove') {
        return action.playload
    }
    else {
        return state
    }
}