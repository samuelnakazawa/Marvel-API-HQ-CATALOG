import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findHeroes, findComics } from './actions';
import SearchChar from './components/search';
import ComicThumbnail from '../../components/comicThumbnail';
import Button from '../../components/button';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      autoCompletTimeout: null,
    };
    this.onButtonClick = this.onButtonClick.bind(this);

  }

  autoCompleteOnChange = (value) => {
    this.setState({ search: value });
    if (value.length > 2) {
      if (this.state.autoCompletTimeout) {
        clearTimeout(this.state.autoCompletTimeout);
      }
      const timeout = setTimeout(() => {
        this.setState({ autoCompletTimeout: null });
        this.props.findHeroes(value);
      }, 300);
      this.setState({ autoCompletTimeout: timeout });
    }
  }

  onButtonClick() {
    this.props.findComics('1009610');
  }

  onSelectItem = (value, itemSelect) => {
    this.setState({ search: value });
    this.props.findComics(String(itemSelect));
  }

  render() {
    return (
      <main>
        <div className="container">
          <SearchChar
            char={this.props.chars}
            search={this.state.search}
            autoCompleteOnChange={this.autoCompleteOnChange}
            onSelectItem={this.onSelectItem}
          />
          <div className="content">
            {this.props.comics ?
              <section className="wrapper-comics">
                {this.props.comics.map(item =>
                    <React.Fragment key={item.id}>
                      <ComicThumbnail
                        url={item.urls[0].url}
                        autor={item.creators.items.length > 0 ? item.creators.items[0].name : ''}
                        title={item.title}
                        thumbnail={item.thumbnail.path + '.' + item.thumbnail.extension}
                      >
                      </ComicThumbnail>
                    </React.Fragment>
                  )
                }
              </section>
              :
              <section className="wrapper-call">
                <Button text="Start now" onClick={this.onButtonClick}></Button>
              </section>
            }
          </div>
        </div>
      </main >

    );
  }
}

const mapStateToProps = state => ({
  characters: state.home.characters,
  comics: state.home.comics,
  chars: state.home.chars
});

export default connect(mapStateToProps, {
  findHeroes,
  findComics
})(Home);
