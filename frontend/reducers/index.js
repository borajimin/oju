const reducer = (state = {name: "Retreat name works!", content: "Con"}, action) => {
    let newState;
    switch(action.type) {
        case 'TEST':
            const { content } = action;
            newState = {...state, content};
            return newState;
        default:
            return state;
    }
};

export default reducer;
