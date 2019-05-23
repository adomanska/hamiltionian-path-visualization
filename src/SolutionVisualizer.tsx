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
  edges: [],
  nodesCount: -1,
  path: []
}

export class SolutionVisualizer extends React.Component<{classes: any}, State> {

  state = initialState;

  onGraphLoaded = (e: any, results: any) => {
    const reader = new FileReader()
    reader.onload = () => { 
        const {edges, nodesCount} = parseGraph(reader.result as string);
        this.setState({
            edges,
            nodesCount,
            isGraphLoaded: true,
            isResultLoaded: false
        })
    }
    const [ex, file]= results[0];
    reader.readAsText(file)
  }

  onResultLoaded = (e: any, results: any) => {
    const reader = new FileReader()
    reader.onload = () => { 
        this.setState({
            path: parsePath(reader.result as string),
            isResultLoaded: true
        })
    }
    const [ex, file]= results[0];
    reader.readAsText(file)
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
                {this.state.isGraphLoaded && this.state.isResultLoaded && this.state.path.length > 0 && (
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

interface Graph {
    edges: Edge[];
    nodesCount: number;
}

const parseGraph = (graphText: string): Graph => {
    const edges: Edge[] = [];
    let maxNode = -1;

    for (const line of graphText.split(/[\r\n]+/)){
        const edgeData = line.split(' ');
        const from = Number.parseInt(edgeData[0]);
        const to = Number.parseInt(edgeData[1]);

        if (from > maxNode)
            maxNode = from;
        if (to > maxNode)
            maxNode = to;

        edges.push({
            from,
            to,
            weight: Number.parseInt(edgeData[2])
        })
    }

    return ({
        edges,
        nodesCount: maxNode + 1 
    })
}

const parsePath = (pathText: string) => {
    const path = pathText.split(/[\r\n]+/)[0];
    return path.split(' ').map(node => Number.parseInt(node));
}