import React from 'react'

export class SwipeableEnableScroll extends React.Component {
    container = React.createRef();
  
    componentDidMount() {
      const containerNode = this.container.current;
  
      if (!containerNode) {
        return;
      }
  
      containerNode.addEventListener('touchstart', this.isolateTouch, { passive: true });
      containerNode.addEventListener('touchmove', this.isolateTouch, { passive: true });
      containerNode.addEventListener('touchend', this.isolateTouch, { passive: true });
    }
  
    componentWillUnmount() {
      const containerNode = this.container.current;
  
      if (!containerNode) {
        return;
      }
  
      containerNode.removeEventListener('touchstart', this.isolateTouch, { passive: true });
      containerNode.removeEventListener('touchmove', this.isolateTouch, { passive: true });
      containerNode.removeEventListener('touchend', this.isolateTouch, { passive: true });
    }
  
    isolateTouch(e) {
      e.stopPropagation();
    }
  
    render() {
      return (
        <div ref={this.container}>
          {this.props.children}
        </div>
      );
    }
  }
  