import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: '505061',
  },
  tabsRoot: {
    backgroundColor: '#505061',
  },
  tabsIndicator: {
    backgroundColor: '#8286c5',
  },
  TabContainer: {
    minWidth: 400,
  },
  paper: {
    minWidth: 600,
    padding: 15
  }
});

class FullWidthTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeCheckbox({ target }) {
    this.props.onChangeSetting(target.name, target.checked);
  }

  render() {

    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={this.handleChange}
            classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
            centered
          >
            <Tab label="General" />
            <Tab label="Advanced" />
            <Tab label="About" href="#basic-tabs" />
          </Tabs>
        </AppBar>
        <div className={classes.TabContainer}>
          {value === 0 &&
            <TabContainer >
              <Grid className={classes.GridItem}
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={24}
              >
                <Grid item xs={12} sm={12}>
                  <Paper className={classes.paper}>

                    <h2>Basic</h2>

                    <div className={styles.FormControl}>
                      <input
                        checked={this.props.darkTheme}
                        id="settings-dark-theme"
                        name="darkTheme"
                        type="checkbox"
                        onChange={this.handleChangeCheckbox.bind(this)}
                      />
                      <label htmlFor="settings-dark-theme">
                        Dark theme
                      </label>
                    </div>

                    <div className={styles.FormControl}>
                      <input
                        checked={this.props.useProtonMailBeta}
                        id="settings-use-beta"
                        name="useProtonMailBeta"
                        type="checkbox"
                        onChange={this.handleChangeCheckbox.bind(this)}
                      />
                      <label htmlFor="settings-use-beta">
                        Use beta.protonmail.com
                      </label>
                    </div>

                  </Paper>
                </Grid>
              </Grid>
            </TabContainer>}
          {value === 1 && <TabContainer>Item Two</TabContainer>}
          {value === 2 && <TabContainer>Item Three</TabContainer>}
        </div>
      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  darkTheme: PropTypes.bool.isRequired,
  onChangeSetting: PropTypes.func.isRequired,
  useProtonMailBeta: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
