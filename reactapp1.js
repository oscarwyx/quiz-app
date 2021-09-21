var tempData = [{category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$59.99", stocked: true, name: "Basketball"},
  {category: "Sporting Goods", price: "$109.99", stocked: false, name: "Nike Shoes"},
  {category: "Electronics", price: "$1099.99", stocked: true, name: "iPad Pro"},
  {category: "Electronics", price: "$699.99", stocked: true, name: "iPhone 13"},
  {category: "Electronics", price: "$1199.99", stocked: true, name: "iPhone 13 Pro max"}];
 
function dealWithData(data,keyword,isLimit) { 
  var array = new Array();
 
  var categoryNameArr = new Array();
  for (const key in data) {
    var subObj = data[key];
    if (!categoryNameArr.includes(subObj["category"])) {
      categoryNameArr.push(subObj["category"]);
    }
  }
 
  for (const key in categoryNameArr) {
    var subStr = categoryNameArr[key];
    var newArray = new Array();
    for (const datakey in data) {
      var subObj = data[datakey];
      var reg = new RegExp(keyword,"i");
      if (keyword.length > 0 && !subObj["name"].match(reg)) {
        continue;
      }
      // if (String(isLimit) == "true" && String(subObj["stocked"]) == "false") {
      if (isLimit == true && subObj["stocked"] == false) {
        continue;
      }
      if (subObj["category"] == subStr) {
        newArray.push(subObj);
      }
    }
    if (newArray.length > 0) {
      array.push(newArray);
    }
  }
 
  return array;
}
 
class ProductRow extends React.Component {
  constructor (props) {
    super(props);
  }
  
  render() {
    const pStyle = {display:"table-cell",width:"100px"};
    const pStyle1 = {display:"table-cell"};
    return (
      <div>
          <p style={pStyle}>{this.props.name}</p>    <p style={pStyle1}>{this.props.price}</p>
      </div>
    );
  }
}
 
class ProductCategoryRow extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    const divStyle = {fontWeight:"bold"};
    return <div style={divStyle}>{this.props.categoryName}</div>
  }
}
 
class ProductTable extends React.Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    var viewArr = new Array();
    for (const key in this.props.list) {
      var subList = this.props.list[key];
      const sectioncell = <ProductCategoryRow categoryName = {subList[0].category} />
      viewArr.push(sectioncell);
 
      const listCell = subList.map((item) => 
        <ProductRow key={item.name} name={item.name} price={item.price} />
      );
      viewArr.push(listCell);
    }
 
    const pStyle = {display:"table-cell",fontWeight:"bold",width:"100px"}; 
    const pStyle1 = {display:"table-cell",fontWeight:"bold",color:"red"}; 
    return (
      <div>
        <div>
          <p style={pStyle}>Name</p>    <p style={pStyle1}>Price</p>
        </div>
        {viewArr}
      </div>
    );
  }
}
 
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.keywordChangeAction = this.keywordChangeAction.bind(this);
    this.tickLimitCategory = this.tickLimitCategory.bind(this);
  }
 
  keywordChangeAction(e) {
    this.props.keywordChangeAction(e);
  }
 
  tickLimitCategory(e) {
    this.props.tickLimitCategory(e);
  }
 
  render() {
    return (
      <div>
        <input type="text" placeholder="Search..." onChange={this.keywordChangeAction} value={this.props.keyword}></input>
        <form>
          <input type="checkbox" name="limitCategory" id="theLimit" checked={this.props.isLimit} onClick={this.tickLimitCategory}/>
          <label for="theLimit">Only show products in stock</label>
        </form>
      </div>
    );
  }
}
 
class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {keyword:"",isLimit:false};
    this.searchKeywordChange = this.searchKeywordChange.bind(this);
    this.handleLimitClick = this.handleLimitClick.bind(this);
  }
  
  searchKeywordChange(e) {
    this.setState({
      keyword: e.target.value
    });
  }
 
  handleLimitClick(e) {
    this.setState({
      isLimit:  e.target.checked
    });
  }
 
  render() {
    var dealData = dealWithData(tempData,this.state.keyword,this.state.isLimit);
    return (
      <div>
      <SearchBar keyword={this.state.keyword} isLimit={this.state.isLimit} keywordChangeAction={this.searchKeywordChange} tickLimitCategory={this.handleLimitClick} />
      <br/>
      <ProductTable list={dealData} keyword={this.state.key} isLimit={this.state.isLimit}/>
      </div>
    );
  }
}
 
ReactDOM.render(
  <FilterableProductTable />,
  document.getElementById("root")
);