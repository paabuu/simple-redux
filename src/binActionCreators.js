/**
 *  binActionCreators是把dispatch与actionCreator结合起来
 *  @param {Object} binActionCreators
 *  @param {Function} dispatch
 */

 function bindActionCreators(actionCreators, dispatch) {
     function bindActionCreator(actionCreator, dispatch) {
         return (...args) => dispatch(actionCreator(...args));
     }

     const validCreators = {};

     const keysBefore = Object.keys(actionCreators);

     keysbefore.forEach(key => {
        if (typeof actionCreators[key] === 'function') {
            validCreators[key] = actionCreators[key];
        }
     });

     const keysAfter = Object.keys(validCreators);

    return keysAfter.map(key => {
        return bindActionCreator(validCreators[key], dispatch);
    });
 }

export default bindActionCreators;
