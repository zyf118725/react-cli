/* eslint-disabled */
import React from 'react';
export default class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  // 更新 state 使下一次渲染能够显示降级后的 UI
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // 你同样可以将错误日志上报给服务器
  // componentDidCatch() {console.log('发送错误日志');}

  render() {
    if (this.state && this.state?.hasError) {
      return <h1 className='center'>啊哦，页面崩溃了。</h1>;
    }
    return this.props.children;
  }
}