import React, {Component} from 'react';

import ListComponent from '../../list/listcore/ListComponent';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import CreateDialog from '../../createdialog/CreateDialog';
import EditDialog from '../../editdialog/EditDialog';
import DeleteDialog from '../../deletedialog/DeleteDialog';

import { withStyles } from '@material-ui/core/styles';

import { REF_CODE, BUILDING_NAME, ADDRESS, CITY, PROVINCE, EXTRA, REFERENCE, REFERENCE_PHONE, REFERENCE_MOBILE_PHONE, ZONE,
         CREATION_DATE, GDPR_REFERENCE, GDPR_REFERENCE_EMAIL, GDPR_REFERENCE_TYPE,
         GDPR_SECONDARY_REFERENCE, GDPR_SECONDARY_REFERENCE_EMAIL, GDPR_SECONDARY_REFERENCE_TYPE,
         CREATOR, SEND_DATE, MAINTENANCE_TYPE, HELLO
} from "../../../common/Strings";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addDocument, logoutUser, getDocuments, deleteDocument, updateDocument, sendDocumentEmail,
         getMaintenanceTypes, getClientTypes, getZones, getUsers, setPageTitle, searchDocument, clearDocumentSearch } from "../../../actions/authActions";


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  container: {
  },
  fab: {
      position: 'fixed',
      bottom: 16,
      right: 16,
    },
  searchBar: {
      padding: 16,
  }
};

class HomePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editDialogTarget: null,
      deleteDialogTarget: null,
      anchorEl: null,
      errors: {},
      order: 'desc',
      orderBy: 12,
      page: 0,
      headers: [
        {title: MAINTENANCE_TYPE, class: 'mth', key: 'maintenance_type', sortable: false, checked:true},
        {title: CREATOR, class: 'mth', key: 'creator', sortable: false, checked:true},
        {title: REF_CODE, class: 'mth', key: 'ref_code', sortable: true, checked:true},
        {title: BUILDING_NAME, class: 'mth', key: 'building_name', sortable: true, checked:true},
        {title: ADDRESS, class: 'lth', key: 'address', sortable: true, checked:true},
        {title: CITY, class: 'mth', key: 'city', sortable: true, checked:true},
        {title: PROVINCE, class: 'mth', key: 'province', sortable: true, checked:true},
        {title: EXTRA, class: 'lth', key: 'extra', sortable: true, checked:true},
        {title: REFERENCE, class: 'mth', key: 'reference', sortable: true, checked:true},
        {title: REFERENCE_PHONE, class: 'mth', key: 'reference_phone', sortable: true, checked:true},
        {title: REFERENCE_MOBILE_PHONE, class: 'mth', key: 'reference_mobile_phone', sortable: true, checked:true},
        {title: ZONE, class: 'mth', key: 'zone', sortable: false, checked:true},
        {title: CREATION_DATE, class: 'mth', key: 'creation_date', sortable: true, checked:true},
        {title: GDPR_REFERENCE_TYPE, class: 'mth', key: 'gdpr_main_reference_type', sortable: false, checked:true},
        {title: GDPR_REFERENCE, class: 'mth', key: 'gdpr_main_reference', sortable: true, checked:true},
        {title: GDPR_REFERENCE_EMAIL, class: 'mth', key: 'gdpr_main_reference_email', sortable: true, checked:true},
        {title: GDPR_SECONDARY_REFERENCE_TYPE, class: 'mth', key: 'gdpr_secondary_reference_type', sortable: false, checked:true},
        {title: GDPR_SECONDARY_REFERENCE, class: 'mth', key: 'gdpr_secondary_reference', sortable: true, checked:true},
        {title: GDPR_SECONDARY_REFERENCE_EMAIL, class: 'mth', key: 'gdpr_secondary_reference_email', sortable: true, checked:true},
        {title: SEND_DATE, class: 'mth', key: 'send_date', sortable: true, checked:true},
      ],
      searchTerm: '',
      filters: {
        userFilter: '',
        zoneFilter: '',
        maintenanceTypeFilter: '',
      }
    };

  };

  componentDidMount() {
    this.props.setPageTitle(HELLO + ' ' + this.props.auth.user.name );
    this.getDocumentsAction(this.state.page, this.state.order, this.state.orderBy);
    this.props.getMaintenanceTypes();
    this.props.getZones();
    this.props.getClientTypes();
    this.props.getUsers();
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.profile){
      this.setState({
        profile: nextProps.profile
      });
    }
    else if(nextProps.errors){
      this.setState({
        errors: nextProps.errors
      })
    }

    if(nextProps.auth.reload && nextProps.auth.reload === true) {
      this.setState({
        editDialogTarget: null,
        deleteDialogTarget: null,
        createDialogOpen: false
      });

      this.props.getDocuments();
    }
  }


  render() {

      const { auth, classes} = this.props;
      var items = [];
      var count = 0;
      if(auth.s_documents) {
        items = auth.s_documents;
        count = auth.s_count;
      }
      else if(auth.documents) {
        items = auth.documents;
        count = auth.count;
      }

      return(
        <div>
        <div className={classes.container}>
          <ListComponent items={items}
                         headers={this.state.headers}
                         itemEditCallback={this.listItemEditCallback}
                         itemDeleteCallback={this.listItemDeleteCallback}
                         itemSendCallback={this.listItemSendCallback}
                         checkCallback={this.checkCallback}
                         checkColumnCallback={this.checkColumnCallback}
                         maintenance_types={auth.maintenance_types}
                         zones={auth.zones}
                         client_types={auth.client_types}
                         users={auth.users}
                         currentUserId={auth.user.id}
                         itemsCount={count}
                         pageChangeCallback={this.pageChangeCallback}
                         sortHandler={this.sortHandler}
                         order={this.state.order}
                         orderBy={this.state.orderBy}
                         searchCallback={this.searchCallback}
                         clearSearchCallback={this.clearSearchCallback}
                         filters={this.state.filters}
                         filterChangeCallback={this.filterChangeCallback}
                         />
          <Fab color="primary" className={classes.fab} onClick={this.newItemAction}>
            <AddIcon/>
          </Fab>
          <DeleteDialog target={this.state.deleteDialogTarget}
                        deleteCallback={this.deleteDialogCallback}
                        closeCallback={this.deleteDialogCloseCallback} />
          <CreateDialog open={this.state.createDialogOpen}
                        createCallback={this.createDialogCallback}
                        closeCallback={this.createDialogCloseCallback}
                        errors={this.state.errors}
                        maintenance_types={auth.maintenance_types}
                        zones={auth.zones}
                        client_types={auth.client_types}/>
          <EditDialog target={this.state.editDialogTarget}
                      editCallback={this.editDialogCallback}
                      closeCallback={this.editDialogCloseCallback}
                      errors={this.state.errors}
                      maintenance_types={auth.maintenance_types}
                      zones={auth.zones}
                      client_types={auth.client_types} />
        </div>
        </div>
    );
  }


  /*--- New Item ---*/

  newItemAction = () => {
    this.setState({createDialogOpen: true});
  }

  /*---- List Item Callbacks ---*/

  listItemDeleteCallback = (item) => {
    this.setState({deleteDialogTarget: item});
  }

  listItemEditCallback = (item) => {
    this.setState({editDialogTarget: item});
  }

  listItemSendCallback = (item) => {
    this.props.sendDocumentEmail(item);
  }


  /*--- Edit Dialog Callbacks ---*/

  editDialogCallback = (item) => {
    this.props.updateDocument(item);
  }

  editDialogCloseCallback = () => {
    this.setState({editDialogTarget: null});
  }


  /*--- Delete Dialog Callbacks ---*/

  deleteDialogCallback = () => {
    this.props.deleteDocument(this.state.deleteDialogTarget);
  }

  deleteDialogCloseCallback = () => {
    this.setState({deleteDialogTarget: null});
  }


  /*--- Create Dialog Callbacks ---*/

  createDialogCallback = (item) => {
    this.props.addDocument(item);
  }

  createDialogCloseCallback = () => {
    this.setState({ createDialogOpen: false });
  }

  checkCallback = (item) => {
    item.submitted = !item.submitted;
    this.props.updateDocument(item);
  }


  /*--- Actions ---*/

  logoutAction = () => {
    this.props.logoutUser();
  }

  getDocumentsAction = (page, order, orderBy) => {
    this.props.getDocuments(page, order, this.state.headers[orderBy].key);
  }


  /*--- Menu ---*/

  menuClick = event => {
    this.setState( {anchorEl: event.currentTarget} );
  }

  menuClose = () => {
    this.setState( {anchorEl: null} );
  }

  pageChangeCallback = (page) => {
    this.setState({page: page});
    this.getDocumentsAction(page, this.state.order, this.state.orderBy);
  }


  /*--- Sorting ---*/

  sortHandler = property => event => {
    this.handleRequestSort(event, property);
  };

  handleRequestSort = (event, property) => {

    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });

    this.getDocumentsAction(this.state.page, order, orderBy);
  };


  /*--- Toolbar ---*/

  checkColumnCallback = index => {
    this.setState(prevState => ({
      headers: prevState.headers.map(
        (item, id) => (index === id ? Object.assign(item, { checked: !item.checked }) : item)
      )
    }));
  }

  searchCallback = searchTerm => {

    this.setState({searchTerm: searchTerm}, function () {
        this.performSearch();
    });
  }

  clearSearchCallback = () => {

    var filters = this.state.filters;

    if( filters.userFilter === '' &&
        filters.maintenanceTypeFilter === '' &&
        filters.zoneFilter === '' ) {

          this.props.clearDocumentSearch();
        }
  }

  filterChangeCallback = key => event => {

    var filters = {...this.state.filters};
    filters[key] = event.target.value;

    this.setState({filters}, function () {

      if( filters.userFilter === '' &&
          filters.maintenanceTypeFilter === '' &&
          filters.zoneFilter === '' ) {

          this.props.clearDocumentSearch();
        }
        else {
          this.performSearch();
        }
      }
    );
  }

  /*--- Search Action ---*/

  performSearch = () => {

    var params = {
      keyword: this.state.searchTerm,
      filters: this.state.filters,
    }
    this.props.searchDocument(params);
  }

}

HomePage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getDocuments: PropTypes.func.isRequired,
  addDocument: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  updateDocument: PropTypes.func.isRequired,
  sendDocumentEmail: PropTypes.func.isRequired,
  getMaintenanceTypes: PropTypes.func.isRequired,
  getZones: PropTypes.func.isRequired,
  getClientTypes: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  setPageTitle: PropTypes.func.isRequired,
  searchDocument: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default withStyles(styles)(connect( mapStateToProps, { logoutUser, getDocuments, addDocument,
                                                              deleteDocument, updateDocument,
                                                              sendDocumentEmail,
                                                              getMaintenanceTypes, getZones, searchDocument, clearDocumentSearch,
                                                              getClientTypes, getUsers, setPageTitle })(HomePage));
