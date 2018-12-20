import router from 'umi/router';
import { loginApi,userApi } from '../service'
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
        yield router.push('/')
      }catch (e) {
        yield put(
          {type: 'changeStatus', payload: {status: 'error', msg: Err.instance(e).getMsg()}})
      }
    },
    *logout(_, { put }) {
      yield put({type: 'setUser', payload: {data: {}}});
      setAccessToken('')
      yield router.push('/login');
    },
    *currentUser(_, { put }) {
      const ret = yield userApi()
      yield put({type: 'setUser', payload: {data: ret}});
    }
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