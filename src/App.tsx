import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { VisNetwork } from './VisNetwork';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '50rem',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));


export const App = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="md">
            <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
              Wizualizacja problemu znajdowania ścieżki Hamiltona
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Andżelika Domańska, Bartłomiej Chechliński 
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Prześlij graf
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Prześlij rozwiązanie
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <VisNetwork></VisNetwork>
            </CardContent>
          </Card>
        </Container>
      </main>
    </React.Fragment>
  );
}