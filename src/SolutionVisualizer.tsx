import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { VisNetwork } from './VisNetwork';
import FileReaderInput from 'react-file-reader-input'

const handleChange = (e: any, results: any) => {
  const reader = new FileReader()
  reader.onload = () => console.log(reader.result)
  results.forEach((result: any) => {
    const [e, file] = result;
    reader.readAsText(file)
  });
}

export interface Edge {
  from: number;
  to: number;
  weight: number;
}

interface State {
  isGraphLoaded: boolean;
  isResultLoaded: boolean;
  edges: Edge[];
  nodesCount: number
  path: number[];
}

const initialState = {
  isGraphLoaded: false,
  isResultLoaded: false,
  edges: [
      {from: 0, to: 1, weight: 2},
      {from: 1, to: 2, weight: 2},
      {from: 2, to: 3, weight: 2},
      {from: 3, to: 0, weight: 2},
     ],
  nodesCount: 4,
  path: [0,1,2,3]
}

export class SolutionVisualizer extends React.Component<{classes: any}, State> {

  state = initialState;

  onGraphLoaded = (e: any, results: any) => {
    this.setState({isGraphLoaded: true, isResultLoaded: false})
    console.log("Graph loaded");
  }

  onResultLoaded = (e: any, results: any) => {
    this.setState({isResultLoaded: true})
    console.log("Result loaded");
  }

  render() {
    const {classes} = this.props;
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
                  <FileReaderInput as="text" onChange={this.onGraphLoaded}>
                    <Button variant="contained" color="primary">
                      Prześlij graf
                    </Button>
                  </FileReaderInput>
                </Grid>
                <Grid item>
                <FileReaderInput as="text" onChange={this.onResultLoaded}>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    disabled={!this.state.isGraphLoaded}
                  >
                    Prześlij rozwiązanie
                  </Button>
                </FileReaderInput>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                {this.state.isGraphLoaded && this.state.isResultLoaded && (
                    <VisNetwork
                        edges={this.state.edges}
                        nodesCount={this.state.nodesCount}
                        path={this.state.path}
                    />
                )}
            </CardContent>
          </Card>
        </Container>
      </main>
    </React.Fragment>
  );
    }
}