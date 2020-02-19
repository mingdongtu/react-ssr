import { createStore } from 'redux';

const state = {
  data: 'empty'
}
function reducer(initState = state, action) {
  switch (action.type) {
    case "CHANGE_DATA":
      return { ...initState, data: action.payload };  //拼接成一层对象
    default:
      return { ...initState }
  }
}
export function createClientStore() {
  return createStore(reducer, window.REDUX)
}
export function createServerStore() {
  return createStore(reducer)

}