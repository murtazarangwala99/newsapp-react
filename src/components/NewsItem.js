import React, { Component } from 'react';

export class NewsItem extends Component {

  render() {
    let {title,description,imgUrl,newsUrl,author,date,source} = this.props;
    return <div className='my-3'>
    <div className="card"  style= {{ width: "18rem" }} >
        <img src= {imgUrl} className="card-img-top" height= "200px" width= "100px" alt="..."/>
    <div className="card-body">
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'85%', zIndex: '1'}}>{source}</span>
        <h5 className="card-title text-primary">{title} ...</h5>
        <p className="card-text">{description} ...</p>
        <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
    </div>
    </div>
    </div>;
  }
}

export default NewsItem;
