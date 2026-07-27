import React from 'react';
import { Pagination } from '@sbux/starbucks-design-react';

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      showMore: true,
      total: 20,
    };
  }

  handeChange = (pageNum) => {
    if (pageNum > 20) {
      this.setState({
        showMore: false,
        current: pageNum,
      });
      return;
    }

    this.setState({
      total: Math.max((pageNum + 1) * 10, this.state.total),
      showMore: true,
      current: pageNum,
    });
  };

  render() {
    return (
      <Pagination
        current={this.state.current}
        total={this.state.total}
        onChange={this.handeChange}
        showMore={this.state.showMore}
      />
    );
  }
}
