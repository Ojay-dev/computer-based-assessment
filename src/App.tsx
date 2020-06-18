import React, { useEffect } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StudentLoginPage from "./components/student-login/StudentLoginPage";
import InstructionPage from "./components/instruction/InstructionPage";
import QuestionPage from "./components/question/QuestionPage";
import CredentialsPage from "./components/credentials/CredentialsPage";
import SubmitPage from "./components/submit/SubmitPage";
import Administrator from "./components/admin-components";

import Header from "./components/Header";
import { student as studentInterface } from "./components/model/student";
import { verifyStudent } from "./redux/actions/studentAction";

function App({
  student,
  verifyStudent,
}: {
  student: studentInterface;
  verifyStudent: () => Promise<any>;
}) {
  useEffect(() => {
    if (Object.keys(student).length < 1) {
      verifyStudent();
    }
  }, [verifyStudent, student]);

  if (Object.keys(student).length < 1) {
    /**
     * This is just some make shift
     * loading screen so that the
     * app doesn't flicker between
     * login screen and where you
     * want to go anytime you're logged in
     * and reload the page
     */
    return (
      <Router>
        <Route
          render={() => {
            return <></>;
          }}
        />
      </Router>
    );
  }

  if (!student.hasOwnProperty("matric") || student.matric === "") {
    return (
      <Router>
        <Switch>
          <Route path="/admin" component={Administrator} />
          <Route to="/student-login" render={() => <StudentLoginPage />} />
        </Switch>
      </Router>
    );
  }

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/exam/instruction" component={InstructionPage} />
        <Route path={`/exam/question-${1}`} component={QuestionPage} />
        <Route path={"/exam/submit"} component={SubmitPage} />
        <Route
          render={() => (
            <CredentialsPage
              name={student.name}
              matric_no={student.matric}
              department={student.department}
              faculty={student.faculty}
            />
          )}
        />
        {/* <Route path={"/admin/login"} component={Login} />
        <Route path={"/admin/asssesment"} component={Assessment} />
        <Route path={"/admin/asssesment-history"} component={AssessmentHistory} />
        <Route path={"/admin/add-asssesment"} component={AddAssessment} /> */}
      </Switch>
    </Router>
  );
}

function mapStateToProps(state: any) {
  return {
    student: state.student,
    // loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  verifyStudent,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
