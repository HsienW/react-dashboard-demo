import React from 'react';
import PropTypes from 'prop-types';
import paginate from 'jw-paginate';
import WebStorage from '../../../WebStorage/WebStorage';
import * as WebStorageKeys from '../../../WebStorage/WebStorageKeys';
import * as DeleteDialogActions from '../../DeleteDialog/Actions/DeleteDialogActions';
import * as AddDialogActions from '../../AddDialog/Actions/AddDialogActions';

const propTypes = {
    items: PropTypes.array.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number,
    pageSize: PropTypes.number,
    labels: PropTypes.object,
    styles: PropTypes.object,
    disableDefaultStyles: PropTypes.bool,
    actionType: PropTypes.string.isRequired,
};

const defaultProps = {
    initialPage: 1,
    pageSize: 10,
    labels: {
        first: 'First',
        last: 'Last',
        previous: 'Previous',
        next: 'Next'
    }
};

class JwPagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pager: {}};
        this.styles = {};

        if (!props.disableDefaultStyles) {
            this.styles = {
                ul: {
                    margin: 0,
                    padding: 0,
                    display: 'inline-block'
                },
                li: {
                    listStyle: 'none',
                    display: 'inline',
                    textAlign: 'center'
                },
                a: {
                    cursor: 'pointer',
                    padding: '6px 12px',
                    display: 'block',
                    float: 'left'
                }
            };
        }

        if (props.styles) {
            this.styles = {
                ul: {...this.styles.ul, ...props.styles.ul},
                li: {...this.styles.li, ...props.styles.li},
                a: {...this.styles.a, ...props.styles.a}
            };
        }
    }

    componentWillReceiveProps(nextProps) {
        switch (nextProps.actionType) {
            case DeleteDialogActions.DELETE_ITEM_SUCCESS:
                this.setPage(parseInt(WebStorage.getSessionStorage(WebStorageKeys.CURRENT_PAGE)));
                break;

            case AddDialogActions.ADD_ITEM_SUCCESS:
                this.addPage(parseInt(WebStorage.getSessionStorage(WebStorageKeys.CURRENT_PAGE)));
                break;

            case AddDialogActions.UPDATE_DIALOG:
                break;

            default:
                break;
        }
    }

    componentWillMount() {
        this.setPage(this.props.initialPage);
    }

    componentDidUpdate(prevProps) {
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }

    setPage(page) {
        const {items, pageSize} = this.props;
        let pager = this.state.pager;
        pager = paginate(items.length, page, pageSize);
        const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
        WebStorage.setSessionStorage(WebStorageKeys.CURRENT_PAGE, page);
        WebStorage.setSessionStorage(WebStorageKeys.PAGE_START_INDEX, pager.startIndex);
        WebStorage.setSessionStorage(WebStorageKeys.PAGE_END_INDEX, pager.endIndex + 1);

        this.setState({pager: pager});
        this.props.onChangePage(pageOfItems);
    }

    addPage(page) {
        const {items, pageSize} = this.props;
        let pager = this.state.pager;
        pager = paginate(items.length, page, pageSize);
        const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        this.setState({pager: pager});
        this.props.onChangePage(pageOfItems);
    }

    render() {
        const pager = this.state.pager;
        const labels = this.props.labels;
        const styles = this.styles;

        return (
            <ul className='pagination' style={styles.ul}>
                <li className={`first ${pager.currentPage === 1 ? 'disabled' : ''}`} style={styles.li}>
                    <a onClick={() => this.setPage(1)} style={styles.a}>{labels.first}</a>
                </li>
                <li className={`previous ${pager.currentPage === 1 ? 'disabled' : ''}`} style={styles.li}>
                    <a onClick={() => this.setPage(pager.currentPage - 1)} style={styles.a}>{labels.previous}</a>
                </li>
                {pager.pages.map((page, index) =>
                    <li key={index} className={`page-number ${pager.currentPage === page ? 'active' : ''}`}
                        style={styles.li}>
                        <a onClick={() => this.setPage(page)} style={styles.a}>{page}</a>
                    </li>
                )}
                <li className={`next ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`} style={styles.li}>
                    <a onClick={() => this.setPage(pager.currentPage + 1)} style={styles.a}>{labels.next}</a>
                </li>
                <li className={`last ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`} style={styles.li}>
                    <a onClick={() => this.setPage(pager.totalPages)} style={styles.a}>{labels.last}</a>
                </li>
            </ul>
        );
    }
}

JwPagination.propTypes = propTypes;
JwPagination.defaultProps = defaultProps;
export default JwPagination;