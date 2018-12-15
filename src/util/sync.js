import co from 'co'
import { Err } from './error'
import { message } from 'antd'

const coProcess = (fn, options = {errHandle: null}) => {
  co(function* () {
    yield fn()
  }).catch(e => {
    console.error(e)
    if (options.errHandle) {
      co(function * () {
        yield options.errHandle(e)
      })
    }else{
      message.error(Err.instance(e).getMsg())
    }
  })
}

export const sync = (fn,options) => coProcess(fn,options)
