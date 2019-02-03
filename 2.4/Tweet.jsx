const TWEETS = [
  {
    id: 1,
    author: 'Bitch__Божий.',
    text: 'Принесли ноут на ремонт...',
    image: 'https://pbs.twimg.com/media/DyZaqOsX4AEvia7.jpg',
    avatar: 'https://pbs.twimg.com/profile_images/1091383160502448128/Wob-Sbm-_400x400.jpg',
    retweets: 165,
    likes: 32
  }, {
    id: 2,
    author: 'солома',
    text: 'О рейтингах и рейтинговых агентствах на примере прошлых президентских выборов 2014',
    image: 'https://pbs.twimg.com/media/DyZrLmgWkAA4KnV.jpg',
    avatar: 'https://pbs.twimg.com/profile_images/685427450013065216/Dl7pHpSx_400x400.png',
    retweets: 25,
    likes: 122
  }, {
    id: 3,
    author: 'Луиза Чкалова',
    text: 'ценная кадра',
    image: 'https://pbs.twimg.com/media/DyYuyleXgAAoOkH.jpg',
    avatar: 'https://pbs.twimg.com/profile_images/2175746834/36_2_51_400x400.gif',
    retweets: 8,
    likes: 15
  }
];

const Feed = React.createClass ({
  render() {
    return (
      <div>{
        TWEETS.map(tweet =>
          <Tweet
            key={tweet.id}
            author={tweet.author}
            text={tweet.text}
            image={tweet.image}
            avatar={tweet.avatar}
            retweets={tweet.retweets}
            likes={tweet.likes}
          />
        )
      }
      </div>
    )
  }
})

const Tweet = React.createClass({
  getInitialState (){
    return {
      likes: this.props.likes,
      retweets: this.props.retweets
    };
  },

  handlLikes() {
    this.setState({likes: this.state.likes +1})
  },

  handleRetweets(){
    this.setState({retweets: this.state.retweets +1})
  },

  render() {
    const {
      author,
      text,
      image,
      avatar,
      retweets,
      likes
    } = this.props;

  return (
    <div className="tweet">
      <img className="tweet-avatar" src={avatar} alt={author}/>

      <div className="tweet-body">
        <a className="tweet-author">@{author}</a>
        <p className="tweet-text">{text}</p>
        <img className="tweet-image" src={image} alt={text}/>
        <br/>

        <div className="tweet-stats">

          <div className="tweet-retweets">
            <i className="tweet-stat-icon fa fa-retweet" onClick={this.handleRetweets}/>
            {this.state.retweets || null}
          </div>

          <div className="tweet-likes" >
            <i className="tweet-stat-icon fa fa-heart" onClick={this.handlLikes}/>
            {this.state.likes || null}
          </div>

        </div>
      </div>
    </div>
   );
  }
});

ReactDOM.render(<Feed/>,
  document.getElementById('tweet'))
