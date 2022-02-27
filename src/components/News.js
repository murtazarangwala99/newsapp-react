import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
    // articles = []

    static defaultProps = {
        country: 'in',
        pageSize : 8,
        category : "general",
    }
    static propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string,
    }

    capitalize = (string) =>{
        return string.charAt(0).toUpperCase()+string.slice(1);  
    }


    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        }
        document.title = `News Monkey - ${this.capitalize(this.props.category)}`;
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ada370c5324f4986b9507a5f1d9ab137&page=1&pagesize=${this.props.pageSize}`
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        })
    }

    handlePrevClick = async () => {
        console.log("Prev");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ada370c5324f4986b9507a5f1d9ab137&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false,
        })
    }

    handleNextClick = async () => {
        console.log("Next");
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            console.log("Next Available...");
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ada370c5324f4986b9507a5f1d9ab137&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`
            this.setState({ loading: true });
            let data = await fetch(url);
            let parsedData = await data.json()
            console.log(parsedData);
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false,
            })
        }

    }

    render() {
        return (
            <div className='container my-3' >
                <h1 className="text-center" style={{margin: '35px'}}>NewsMonkey - Top {this.capitalize(this.props.category)} Headline</h1>
                {this.state.loading && <Spinner />}
                <div className="row" >
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 85) : ""} imgUrl={element.urlToImage ? element.urlToImage : "https://pbs.twimg.com/profile_images/1138514499/Monkey_news_198334a_400x400.jpg"} newsUrl={element.url} author={element.author ? element.author : "Unknown"} date= {element.publishedAt} source={element.source.name}/>
                        </div>
                    }
                    )}
                </div>
                <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>

            </div>
        );
    }
}
export default News;
