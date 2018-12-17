import { routerRedux } from 'dva/router';
import { loginApi } from '../service'
import { Err,setAccessToken } from '../util'

export default {
  namespace: 'users',
  state: {
    data: {},
    status: undefined,
    msg: '',
  },
  effects: {
    * login ({payload}, {put}) {
      try{
        const ret = yield loginApi(payload)
        setAccessToken(ret.access_token)
        yield put({type: 'setUser', payload: {data: ret}})
        yield put(routerRedux.push('/'));
      }catch (e) {
        yield put(
          {type: 'changeStatus', payload: {status: 'error', msg: Err.instance(e).getMsg()}})
      }
    },
    *logout(_, { put }) {
      yield put({type: 'setUser', payload: {data: {}}});
      setAccessToken('')
      yield put(routerRedux.push({pathname: '/login'})
      );
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