export const parseWalmartId = (url) => {
	let el = document.createElement('a');
	el.href = url

	return el.pathname.split('/').filter(seg => {
		const matches = seg.match(/^[0-9]+$/);
		if(matches && matches.length > 0) {
			return matches
		}
		return false;
	});
};

export const parseAmazonId = (url) => {
	let el = document.createElement('a');
	el.href = url

	return el.pathname.split('/').filter(seg => {
		const matches = seg.match(/^([A-Z]|[0-9]){10}$/);
		if(matches && matches.length > 0) {
			return matches
		}
		return false;
	});
};

export const parseCostcoId = (url) => {
	let el = document.createElement('a');
	el.href = url

	return el.pathname.split('.').filter(seg => {
		const matches = seg.match(/^[0-9]+$/);
		if(matches && matches.length > 0) {
			return matches
		}
		return false;
	});
};