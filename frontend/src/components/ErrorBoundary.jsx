import { Component } from "react";

export class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-ink font-mono text-sm text-white">
          Algo saiu da mira. Recarregue a página.
        </div>
      );
    }
    return this.props.children;
  }
}
