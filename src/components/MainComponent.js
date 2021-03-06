import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import About from './AboutComponent';
import Projects from './ProjectsComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { actions } from 'react-redux-form';
import { fetchStaff, fetchJobs, postFeedback, postRating } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        staff: state.staff,
        jobs: state.jobs
    }
}

const mapDispatchToProps = (dispatch) => ({
    postFeedback: (feedback) => dispatch(postFeedback(feedback)),
    resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
    postRating: (rating) => dispatch(postRating(rating)),
    fetchStaff: () => dispatch(fetchStaff()),
    fetchJobs: () => dispatch(fetchJobs())
});

class Main extends Component {

    componentDidMount() {
        this.props.fetchStaff();
        this.props.fetchJobs();
    }

    render() {
        const Landing = () => {
            return (
                <Home
                    jobs={this.props.jobs.jobs.map((job) => job)}
                    before={this.props.jobs.jobs.filter((job) => job.type === 'before')[0]}
                    after={this.props.jobs.jobs.filter((job) => job.type === 'after')[0]}
                    loading={this.props.jobs.isLoading}
                    errMess={this.props.jobs.errMess}
                />
            );
        }

        return (
            <div className="App">
                <Header />
                <Switch>
                    <Route path='/home' component={Landing} />
                    <Route path='/about' render={() => <About staff={this.props.staff} />} />
                    <Route path='/projects' render={() => <Projects jobs={this.props.jobs} postRating={this.props.postRating} />} />
                    <Route path='/contact' render={() => <Contact postFeedback={this.props.postFeedback}
                        resetFeedbackForm={this.props.resetFeedbackForm} />} />
                    <Redirect to='/home' />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
