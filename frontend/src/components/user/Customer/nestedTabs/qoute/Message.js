import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
const Message = ({ msg }) => {
  return (
    <div className='alert alert-info alert-dismissible fade show' role='alert'>
      {msg}
      <IconButton color="primary" component="span"
        data-dismiss='alert'
        aria-label='Close'
      >
        <HighlightOffIcon />
        {/* <span aria-hidden='true'>&times;</span> */}
      </IconButton>
      {/* <> */}
      
    {/* </IconButton> */}
    </div>
  );
};

Message.propTypes = {
  msg: PropTypes.string.isRequired
};

export default Message;
