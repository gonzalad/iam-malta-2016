// in ECMAScript 6
import React from 'react';
import { Table } from 'react-bootstrap';
// or in ECMAScript 5
//var ReactBSTable = require('react-bootstrap-table');  
//var BootstrapTable = ReactBSTable.BootstrapTable;
//var TableHeaderColumn = ReactBSTable.TableHeaderColumn;

// products will be presented by react-bootstrap-table
var products = [{
      id: 1,
      name: "Item name 1",
      price: 100
  },{
      id: 2,
      name: "Item name 2",
      price: 100
  }];
// It's a data format example.
function priceFormatter(cell, row){
  return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
}

const MyTable = (props) => (
  <Table striped bordered condensed hover>
    <thead>
      <tr>
        <th>#</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Username</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <td>3</td>
        <td colSpan="2">Larry the Bird</td>
        <td>@twitter</td>
      </tr>
    </tbody>
  </Table>
);
MyTable.propTypes = {
};

// React.render(
//   <BootstrapTable data={products} striped={true} hover={true}>
//       <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>Product ID</TableHeaderColumn>
//       <TableHeaderColumn dataField="name" dataSort={true}>Product Name</TableHeaderColumn>
//       <TableHeaderColumn dataField="price" dataFormat={priceFormatter}>Product Price</TableHeaderColumn>
//   </BootstrapTable>,
//     document.getElementById("my-table")
// );



// const App = (props) => (
//   <div>
//     <h1>Hello</h1>
//     {props.children}
//   </div>
// );
// App.propTypes = {
//   //store: React.PropTypes.object.isRequired,
// };

export default MyTable;