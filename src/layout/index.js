import { Component } from 'react';
import { LocaleProvider } from 'antd';

// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale-provider/zh_CN';

class BasicLayout extends Component {

  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <div style={{ margin: '20px auto',width:"800px" }}>
            {this.props.children}
        </div>
      </LocaleProvider>
    )
  }
}


export default BasicLayout