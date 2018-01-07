const reducer = (state = {name: "Retreat name works!", content: "Con"}, action) => {
    switch(action.type) {
        case 'TEST':
            const { content } = action;
            const newState = {...state, content};
            return newState;
        default:
            return state;
    }
};

export default reducer;
