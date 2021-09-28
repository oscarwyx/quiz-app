import React, {Component} from 'react';
import TableHeader from './common/tableHeader';
import Like from './common/like';

class MoviesTable extends Component {
    columns = [
        {path: 'title', label: 'Title'},
        {path: 'genre.name', label: 'Genre'},
        {path: 'numberInstock', label: 'Stock'},
        {path: 'dailyRentalRate', label: 'Rate'},
        {key: "like"},
        {key: "delete"}
    ];

    render() { 
        const {movies, onDelete, onLike, onSort, sortColumn} = this.props;
    
    return ( 
    <table className="table">
    <TableHeader 
        columns = {this.columns} 
        sortColumn={sortColumn}
        onSort={onSort}
    />
    <tbody>
        {movies.map(movies => (
        <tr key={movies._id}>
            <td>{movies.title}</td>
            <td>{movies.genre.name}</td>
            <td>{movies.numberInStock}</td>
            <td>{movies.dailyRentalRate}</td>
            <td>
                <Like liked={movies.liked} onClick={()=>onLike(movies)} />
            </td>
            <td>
                <button onClick={() => onDelete(movies)}className="btn btn-danger btn-sm">Delete</button>
            </td>
        </tr>
        ))}
    </tbody>
</table> );
    }
}
    
 
export default MoviesTable;