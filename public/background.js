chrome.runtime.onInstalled.addListener(function() {

	chrome.storage.sync.set({
		savedWalmart: [],
		savedAmazon: [],
		savedCostco: [],
	}, function() {

	});

});