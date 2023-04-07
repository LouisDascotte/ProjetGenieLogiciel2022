import React, { Component } from 'react'
import PortfolioItem from './PortfolioItem';

export class PortfolioList extends Component {
  render() {
    const {data} = this.props; 
    return (
      <div>
        {data.map(item=>{
          <PortfolioItem key={item.id} name={item.name} info={item.info} content={item.content}/>
        })}
      </div>
    )
  }
}

export default PortfolioList