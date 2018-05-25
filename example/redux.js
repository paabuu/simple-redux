
/**
 *  compose(f1, f2, f3)(...args) => f1(f2(f3(...args)))
 *  @param {fns}: 多个函数，由逗号隔开
 *  @return { fn }
 */

const compose = (...fns) => {
    if (fns.length === 0) {
        return arg => arg;
    }

    if (fns.length === 1) {
        return fns[0];
    }

    const lastFn = fns[fns.length - 1];
    const reset = fns.slice(0, -1);

    return (...args) => reset.rightReduce((acc, fn) => fn(acc) , lastFb(...args));
}


function applyMiddleware(...middlewares) {
     return (createStore) => (reducer, preloadState) => {
         const store = createStore(reducer, preloadState);

         const middlewareApi = {
             getState: store.getState,
             dispatch: () => store.dispatch()
         }

         const chain = middlewares.map(middleware => middleware(middlewareApi));

         const dispatch = compose(...chain)(store.dispatch);

         return {
             ...store,
             dispatch
         }
     }
}


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

 function createStore(reducer, preloadState, enhancer) {
     if (typeof preloadState === 'function' && !enhancer) {
         enhancer = preloadState;
         preloadState = undefined;
     }

     if (typeof enhancer === 'function') {
         return enhancer(createStore)(reducer, preloadState);
     }

     let currentState = preloadState;
     const currentReducer = reducer;
     const eventListeners = [];

     function getState() {
         return currentState;
     }

     function subscribe(fn) {
         eventListeners.push(fn);

         return function unsubscribe() {
             const index = eventListeners.indexOf(fn);

             eventListeners.splice(index, 1);
         };
     }

     function dispatch(action) {
         if (!action.type) {
             throw new Error(
                `action's type is required!`
             );
         }

         currentState = currentReducer(currentState, action);
         eventListeners.forEach((fn) => {
             fn();
         });

         return action;
     }

     // function replaceReducer(replaceReducer) {
     //     currentState = replaceReducer;
     // }

     // 初始化state结构树
     dispatch({
        type: Math.random().toString()
     });

     return {
         getState,
         subscribe,
         dispatch
     }
 }

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

             nextState[key] = nextStateForKey;
             hasChanged = hasChanged || previousStateForKey !== nextStateForKey;
         })

        return hasChanged ? nextState : state
     }
 }
