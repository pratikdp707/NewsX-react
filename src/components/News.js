import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import Spinner from './Spinner'


export default class News extends Component {

    static defaultProps = {
        pageSize : 1,
        country : "in",
        apiKey : "6e4cd31a26d94e1c8e9081554489d401",
        category : "general"
      }

    static propTypes ={
        pageSize : PropTypes.number,
        country : PropTypes.string,
        apiKey : PropTypes.string,
        category : PropTypes.string
    }


    constructor(props) {
        super(props);
        console.log("I am inside a constructor");
        this.state = {
            articles: [],
            loading: false,
            totalResults : 0,
            page : 1 
        }

        document.title = `NewsX - ${this.props.category.slice(0,1).toUpperCase()}${this.props.category.slice(1)}`
    }

    async updateComp(pageNumber){
        this.setState({
            loading: true
        })
        let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=${this.props.apiKey}&page=${pageNumber}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData)
        this.setState({articles: parsedData.articles,
            totalResults : parsedData.totalResults,
            loading:false,
            page : pageNumber
        })
    }

    //componentDidMount() runs after render()
    async componentDidMount(){
        this.updateComp(this.state.page);
    }

    handlePrevClick = async () => {
        this.updateComp(this.state.page-1);
    }

    handleNextClick = async () => {
        this.updateComp(this.state.page+1);
    }

    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center">NewsX - Top {this.props.category.slice(0,1).toUpperCase()+this.props.category.slice(1)} Headlines</h1>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return (
                            <div className="col-lg-4 col-md-6" key = {element.url}>
                                <NewsItem title={element.title!=null ? element.title.slice(0,65): ""} description={element.description!=null?element.description.slice(0,130):""} imageUrl={element.urlToImage} newsUrl = {element.url} author={element.author!=null?element.author : "Unknown"} time={element.publishedAt} source ={element.source.name}/>
                            </div>
                        )
                    })}
                </div> 
                <div className="d-flex justify-content-between">
                    <button disabled = {this.state.page===1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled = {this.state.page > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}
