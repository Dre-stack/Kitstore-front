import React from 'react';
import HighlightCard from './HighlightCard';
import Slide from 'react-reveal/Slide';

class Highlights extends React.Component {
  renderList() {
    const list = this.props.list;
    return list.map((el, i) => {
      return (
        <div key={i}>
          <HighlightCard
            productId={el._id}
            productImg={el.photo[0]}
            productName={el.name}
            productPrice={el.price}
          />
        </div>
      );
    });
  }

  render() {
    return (
      <div className="highlight">
        <Slide left>
          <div className="highlight__title"> {this.props.title}</div>
        </Slide>
        <Slide bottom>
          <div className="highlight__content">
            {this.renderList()}
          </div>
        </Slide>
      </div>
    );
  }
}
export default Highlights;
