import React, { useState } from 'react';
import { Grid, Container, Paper, Tabs, Tab } from '@material-ui/core';

import Header from '../../components/Header';
import useStyles from './useStyles';
import LeftContent from './components/leftContent';
import { Person, Visibility, TrackChanges } from '@material-ui/icons';
import PersonalInformations from './contents/PersonalInformations';

export default function () {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);

  const renderContent = () => {
    switch (tabValue) {
      case 0:
        return <PersonalInformations />;

      default:
        break;
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg" className={classes.rootPage}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs="auto">
            <LeftContent />
          </Grid>
          <Grid item xs>
            <Grid container direction="column">
              <Grid item>
                <Paper square>
                  <Tabs
                    value={tabValue}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    scrollButtons="off"
                    onChange={(e, value) => setTabValue(value)}
                    aria-label="menu tabs"
                  >
                    <Tab className={classes.tab} icon={<Person className={classes.tabIcon} />} />
                    <Tab className={classes.tab} icon={<Visibility className={classes.tabIcon} />} />
                    <Tab className={classes.tab} icon={<TrackChanges className={classes.tabIcon} />} />
                    <Tab className={classes.tab} icon={<TrackChanges className={classes.tabIcon} />} />
                    <Tab className={classes.tab} icon={<TrackChanges className={classes.tabIcon} />} />
                  </Tabs>
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.paper}>{renderContent()}</Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
