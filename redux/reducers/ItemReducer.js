export var item = (state = 0, action) => {
    if (action.type === 'changeItem') {
        return action.playload
    }
    else {
        return state
    }
}