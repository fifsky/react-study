import { listApi, addApi,deleteApi } from '../service'

export default {
  namespace: 'moods',
  state: {
    list: [],
    page:{
      "current": 1,
      "pageSize": 10,
      "total": 0
    }
  },
  effects: {
    * queryList ({payload}, {put}) {
      const ret = yield listApi(payload)
      yield put({type: 'getMoods', payload: ret})
    },
    * add ({payload}, {put}) {
      const ret = yield addApi(payload)
      yield put({type: 'queryList', payload: {page: 1}})
    },
    * delete ({payload}, {put}) {
      const ret = yield deleteApi({id:payload.id})
      yield put({type: 'queryList', payload: {page: payload.page}})
    },
  },
  reducers: {
    getMoods (state, {payload}) {
      return {
        ...state,
        ...payload
      }
    },
  },
}