import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { transtaleMe } from '../../actions/index';
import styles from './Index.css';

let LangFromForm = (props) => {
	const { handleSubmit } = props;
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="langFrom">What language</label>
				<Field name="langFrom" component="select">
					<option value="" />
					<option value="auto">Auto detect</option>
					<option value="en">English</option>
					<option value="ru">Russian</option>
				</Field>
			</div>
			<button type="submit">Submit</button>
		</form>
	);
};

let WordForm = (props) => {
	const { handleSubmit } = props;
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="word">Put your word below</label>
				<Field name="word" component="input" type="text" />
			</div>
			<button type="submit">Submit</button>
		</form>
	);
};

let LangToForm = (props) => {
	const { handleSubmit } = props;
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="langTo">And target language is?...</label>
				<Field name="langTo" component="select">
					<option value="" />
					<option value="en">English</option>
					<option value="ru">Russian</option>
				</Field>
			</div>
			<button type="submit">Submit</button>
		</form>
	);
};

WordForm = reduxForm({
	form: 'word',
})(WordForm);
LangFromForm = reduxForm({
	form: 'langFrom',
})(LangFromForm);
LangToForm = reduxForm({
	form: 'langTo',
})(LangToForm);

class App extends Component {
	state = {
		word: '',
		langFrom: '',
		langTo: '',
	};

	langFromHandle = (data) => {
		console.log('--- ', data);
		this.setState({
			langFrom: data.langFrom,
		});
	};
	wordSubmitHandle = (data) => {
		this.setState({
			word: data.word,
		});
	};
	langToHandle = (data) => {
		this.setState({
			langTo: data.langTo,
		});
		setTimeout(() => {
			this.props.transtaleMe(this.state);
		}, 1);
	};

	render() {
		console.log('', styles);
		return (
			<div>
				<div>
					<h1 className={styles.mainTitle}>Hello and welcome!</h1>
					<h3>Choose language, from which you want to get translation</h3>
					<LangFromForm onSubmit={this.langFromHandle} />
				</div>

				{this.state.langFrom && (
					<div>
						<h2>Very good! Now, your word is...?</h2>
						<WordForm onSubmit={this.wordSubmitHandle} />
					</div>
				)}
				{this.state.word && (
					<div>
						<h2>Very good! Now come up with target language!</h2>
						<LangToForm onSubmit={this.langToHandle} />
					</div>
				)}
			</div>
		);
	}
}

const mapDispatchToProps = {
	transtaleMe,
};
const mapStateToProps = (state) => {
	return {
		init: state.init,
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(App);
