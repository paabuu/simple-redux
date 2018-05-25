/**
 *  @param {fn} middlewares
 */
import compose from './compose';

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

export default applyMiddleware;
