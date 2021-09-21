import React, { Component } from 'react'

export class NewsItem extends Component {

    

    render() {

        let { title, description, imageUrl, newsUrl, author, time, source } = this.props;

        return (
            <div className="mx-2 my-3">
                <div className="card" style={{ width: "100%" }}>
                    <img src={imageUrl!==null ? imageUrl : "https://sutvacha.s3.amazonaws.com/media/public/product/no-image-available.png"} className="card-img-top" alt="" style={{height:"250px"}}/>
                    <div className="card-body">
                        <h5 className="card-title">{title.length < 65 ? title : title+"..."} <span className="badge bg-danger" style={{fontSize : "12px", fontWeight:"700", letterSpacing:"1px", height:"25px", paddingTop:"6px"}}>{source}</span></h5>
                        <p className="card-text">{description.length < 130 ? description : description+"..."}</p>
                        <p className="card-text"><small className="text-muted">By {author} on {new Date(time).toDateString()} {new Date(time).toLocaleTimeString()}</small></p>
                        <a href={newsUrl} target="_blank" className="btn btn-link px-0" rel="noreferrer">Read More</a>
                    </div>
                </div>
            </div> 
        )
    }
}

export default NewsItem
