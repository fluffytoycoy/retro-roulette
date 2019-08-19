import React from "react";
//import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";


const EnhancedToolbar = (props) => {

  return (
    <Toolbar className="toolbar-me">
          <Typography variant="h6" id="tableTitle">
            Consoles
            <div className="toolbar">
              <Tooltip title="Add Console">
                  <IconButton onClick={()=>props.history.push('/Dashboard/Console/AddConsole')}aria-label="filter list">
                      <i className="fas fa-plus"></i>
                    </IconButton>
              </Tooltip>
            </div>
          </Typography>
    </Toolbar>
  );
};


export default EnhancedToolbar;
