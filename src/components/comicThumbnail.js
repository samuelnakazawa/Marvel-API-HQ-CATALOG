import React from 'react';

const ComicThumbnail = ({ url, autor, title, thumbnail }) => (
    <React.Fragment>
        <a className="thumbnail wrapper" href={url}>
            <img className="thumbnail-img" src={thumbnail} alt={thumbnail} target="_blank" />
            <div className="thumbnail-overlay"><span className="thumbnail-text">{title}</span>
                <span className="thumbnail-text">by: {autor}</span>
            </div>
        </a>
    </React.Fragment>
);
export default ComicThumbnail