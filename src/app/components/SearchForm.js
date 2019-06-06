import React from 'react';

class SearchForm extends React.Component
{
    constructor()
    {
        super();
        _.bindAll( this, [ 'handleSearch' ] );
    }

    handleSearch()
    {
        if( this.keywordInput.value !== '' )
        {
            this.props.getWeatherData( this.keywordInput.value );
        }
    }

    render()
    {
        return (
            <form className='form-horizontal'>
                <div className="form-group">
                    <label htmlFor="input-word" className="col-xs-2 control-label">Check Spot</label>
                    <div className="col-xs-8 col-xs-offset-1">
                        <input  type        = "text"
                                className   = "form-control"
                                id          = "input-word"
                                ref         = { keyword => this.keywordInput = keyword } />
                    </div>
                </div>
                <SearchButton onSearch = { this.handleSearch } />
            </form>
        );
    }
}

class SearchButton extends React.Component
{
    constructor()
    {
        super();
        _.bindAll( this, [ 'handleSearch' ] );
    }

    handleSearch( e )
    {
        e.preventDefault();
        this.props.onSearch();
    }

    render()
    {
        return (
            <div className="form-group">
                <div className="col-xs-offset-3 col-xs-10">
                    <button onClick     = { this.handleSearch }
                            type        = "submit"
                            className   = "btn btn-default"
                            id          = "submit-button">Search</button>
                </div>
            </div>
        );
    }
}
