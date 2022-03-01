import "./App.css";
import { Route, Switch } from "react-router-dom";
import AllTests from "./components/Tests/AllTestsPage";
import NewTest from "./components/Tests/NewTestPage";
import Layout from "./components/layout/Layout";
import Question from "./components/question/AddQuestion";
import ListQuestion from "./components/question/QuestionList";
import HomePage from "./components/Tests/HomePage";
import Qlist from "./components/question/SelectedQuestions";
import View from "./components/Tests/View";
import QView from "./components/question/ViewQuestion"
function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/all-tests" exact>
          <AllTests />
        </Route>
        <Route path="/editTest/:id" exact>
          <NewTest />
        </Route>
        <Route path="/new-test">
          <NewTest />
        </Route>
        <Route path="/Question">
          <ListQuestion />
        </Route>
        <Route path="/add">
          <Question />
        </Route>
        <Route path="/editQuestion/:id">
          <Question />
        </Route>
        <Route path="/qlist">
          <Qlist />
        </Route>
        <Route path="/view/:id">
          <View />
        </Route>
        <Route path="/qview/:id">
          <QView />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
