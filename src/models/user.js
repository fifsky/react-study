import { routerRedux } from 'dva/router';
import { loginApi } from '../service'
import { Err } from '../util'

export default {
  namespace: 'users',
  state: {
    data: {},
    status: undefined,
    msg: '',
  },
  effects: {
    * login ({payload}, {put}) {
      const api = '/api/login'

      try{
        const ret = yield loginApi(payload)
        localStorage.setItem('access_token', ret.access_token)
        yield put({type: 'setUser', payload: {data: ret}})
        yield put(routerRedux.push('/'));
      }catch (e) {
        yield put(
          {type: 'changeStatus', payload: {status: 'error', msg: Err.instance(e).getMsg()}})
      }
    },
  },
  reducers: {
    changeStatus (state, {payload}) {
      return {
        ...state,
        status: payload.status,
        msg: payload.msg,
      }
    },
    setUser (state, {payload}) {
      return {
        ...state,
        data: payload.data,
      }
    },
  },
}