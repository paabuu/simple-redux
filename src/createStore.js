/**
 *  @param {Function} reducer
 *  @param {Object} preloadState 用于前后端同构或初始化
 *  @param {Function} enhancer 增强器
 *  @return {Object} store
 *
 *  store有四个api:
 *  getState: 返回当前的state
 *  subscribe: 注册state变化时的回调函数
 *  dispatch: 分发action的函数
 *  replaceReducer: 替换reducer
 */

 function createStore(reducer, preloadState, enhancer) {
     if (typeof preloadState === 'function' && !enhancer) {
         enhancer = preloadState;
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
