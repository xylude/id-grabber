import React from 'react'
import createReactClass from 'create-react-class'

import {
	parseCostcoId,
	parseAmazonId,
	parseWalmartId
} from './util/getIds'

const chrome = window.chrome;

const Button = ({children, style = {}, onClick}) => (
	<span
		style={{
			marginLeft: 10,
			...style,
			userSelect: 'none',
			color: 'blue',
			cursor: 'pointer',
			display: 'inline-block',
		}}
		onClick={onClick}
	>
		{children}
	</span>
)

const App = createReactClass({

	getInitialState() {
		return {
			ids: [],
			savedWalmart: [],
			savedCostco: [],
			savedAmazon: [],
			textToCopy: '',
		}
	},

	_getIds() {
		const {
			tabs
		} = this.props;

		var activeTab = tabs[0];

		const url = activeTab.url;

		let ids = [];

		if(url.indexOf('walmart.com') > -1) {
			ids = parseWalmartId(url);
		} else if(url.indexOf('amazon.com') > -1) {
			ids = parseAmazonId(url);
		} else if(url.indexOf('costco.com') > -1) {
			ids = parseCostcoId(url);``
		}

		return ids;
	},

	componentDidMount() {

		chrome.storage.sync.get([
			'savedWalmart',
			'savedAmazon',
			'savedCostco'
		], (results) => {
			this.setState(results);
		});

		this.setState({
			ids: this._getIds()
		})
	},

	_saveId(id) {
		const {
			tabs
		} = this.props;

		const {
			savedWalmart,
			savedAmazon,
			savedCostco,
		} = this.state;

		return () => {
			var activeTab = tabs[0];

			const url = activeTab.url;

			if(url.indexOf('walmart.com') > -1) {
				const updatedArr = [...new Set([...savedWalmart, id])];

				chrome.storage.sync.set({
					savedWalmart: updatedArr
				}, () => {
					this.setState({
						savedWalmart: updatedArr,
					});
				});

			} else if(url.indexOf('amazon.com') > -1) {
				const updatedArr = [...new Set([...savedAmazon, id])];

				chrome.storage.sync.set({
					savedAmazon: updatedArr
				}, () => {
					this.setState({
						savedAmazon: updatedArr,
					});
				});

			} else if(url.indexOf('costco.com') > -1) {
				const updatedArr = [...new Set([...savedCostco, id])];

				chrome.storage.sync.set({
					savedCostco: updatedArr
				}, () => {
					this.setState({
						savedCostco: updatedArr,
					});
				});

			}

		}
	},

	_reset(key) {
		return () => {
			const o = {};
			o[key] = [];

			chrome.storage.sync.set(o, () => {
				this.setState(o);
			});
		}
	},

	_copy(key) {
		const text = this.state[key].join(' ');
		return () => {
			console.log('text', text)
			const copyFrom = document.getElementById('copy-text');
			copyFrom.value = text;
			copyFrom.select();
			document.execCommand('copy');
			copyFrom.blur();
			copyFrom.value = '';
		}
	},

	render() {
		return (
			<div
				style={{
					width: 400,
					padding: 10
				}}
			>
				<div>
					<span id="output-title">Possible IDs</span>
					<div id="output">
						{
							this.state.ids.length > 0
								? this.state.ids.map(id => (
									<div
										style={{
											padding: '10px 0'
										}}
									>
										{id} - <Button onClick={this._saveId(id)}>Save</Button>
									</div>
								))
								: <div
									style={{
										padding: '10px 0'
									}}
								>
									No IDs found
								</div>
						}
					</div>
				</div>

				<div>

					<div
						style={{
							marginBottom: 5
						}}
					>
						<strong>Amazon</strong>
						<Button
							onClick={this._reset('savedAmazon')}
						>clear</Button>
						<Button
							onClick={this._copy('savedAmazon')}
						>copy</Button>
					</div>

					<div
						style={{
							marginBottom: 10
						}}
					>
						{
							this.state.savedAmazon.join(' ')
						}
					</div>

					<div
						style={{
							marginBottom: 5
						}}
					>
						<strong>WalMart</strong>
						<Button
							onClick={this._reset('savedWalmart')}
						>clear</Button>
						<Button
							onClick={this._copy('savedWalmart')}
						>copy</Button>
					</div>
					<div
						style={{
							marginBottom: 10
						}}
					>
						{
							this.state.savedWalmart.join(' ')
						}
					</div>

					<div
						style={{
							marginBottom: 5
						}}
					>
						<strong>Costco</strong>
						<Button
							onClick={this._reset('savedCostco')}
						>clear</Button>
						<Button
							onClick={this._copy('savedCostco')}
						>copy</Button>
					</div>
					<div
						style={{
							marginBottom: 10
						}}
					>
						{
							this.state.savedCostco.join(' ')
						}
					</div>
				</div>
				<textarea
					style={{
						width: 1,
						height: 1,
						position: 'absolute',
						top: -100,
						left: -100,
					}}
					id='copy-text'
				> </textarea>
			</div>
		);
	}
})

export default App;
