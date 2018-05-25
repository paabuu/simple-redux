
/**
 *  @param {Object} reducers
 */

 function combineReducers(reducers) {
     const keys = Object.keys(reducers);
     const finalReducers = reducers;

     return function combination(state = {}, action) {
         let hasChanged = false;
         const nextState = state;

         keys.forEach(key => {
             const reducer = finalReducers[key];

             const previousStateForKey = state[key];
             const nextStateForKey = reducer(previousStateForKey, action);

             next[key] = nextStateForKey;
             hasChanged = hasChanged || previousStateForKey !== nextStateForKey;
         });

        return hasChanged ? nextState || state;
     }
 }

 export default combineReducers;
