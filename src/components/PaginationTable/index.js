import React from 'react';

// Material Components
import { TableRow, TablePagination, IconButton, Typography } from '@material-ui/core';

// Icons Components
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';

const TablePaginationActions = (props) => {
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = () => {
    onChangePage(0);
  };

  const handleBackButtonClick = () => {
    onChangePage(page - 1);
  };

  const handleNextButtonClick = () => {
    onChangePage(parseInt(page) + 1);
  };

  const handleLastPageButtonClick = () => {
    onChangePage(Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div style={{ flexShrink: 0, marginLeft: 20 }}>
      <IconButton color="default" onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
        <FirstPageIcon />
      </IconButton>
      <IconButton color="default" onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        color="default"
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        color="default"
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <LastPageIcon />
      </IconButton>
    </div>
  );
};

const PaginationTable = ({ total, handlePage, actualPage, pageSize }) => {
  const handleChangePage = (newPage) => {
    handlePage(newPage);
  };

  return (
    <TableRow>
      <TablePagination
        labelRowsPerPage={<div/>}
        count={total}
        rowsPerPageOptions={[]}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to === -1 ? count : to} de ${count !== -1 ? count : `more than ${to}`}`
        }
        rowsPerPage={pageSize}
        page={actualPage}
        onChangePage={handleChangePage}
        ActionsComponent={TablePaginationActions}
      />
    </TableRow>
  );
};

export default PaginationTable;
