import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true, error: _, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    // ここでエラーログを外部サービスに送信することも可能です
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold text-red-500 mb-4">アプリケーションエラー</h1>
          <p className="text-slate-300 mb-4">予期せぬエラーが発生しました。お手数ですが、ページを再読み込みするか、開発者にご連絡ください。</p>
          <details className="bg-slate-800 border border-slate-700 rounded-lg p-4 w-full max-w-2xl">
            <summary className="cursor-pointer font-semibold">エラー詳細</summary>
            <pre className="mt-2 text-sm text-red-400 whitespace-pre-wrap break-all">
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </details>
        </div>
      );
    }

    return this.state.children;
  }
}

export default ErrorBoundary;
