document.getElementById('button').addEventListener('click', async () => {
	let dirEntries;
	// Scope the `dirHandle` variable to allow it to be garbage collected.
	{
		const dirHandle = await window.chooseFileSystemEntries({ type: 'open-directory' });
		dirEntries = dirHandle.getEntries()
	}

	const promises = [];
	for await(const fileHandle of dirEntries){
		promises.push(fileHandle.getFile());
	}
	const files = await Promise.all(promises);

	console.log('Filling memory...');
	// Allocate lots of memory to force the garbage collector to collect `dirHandle`
	const arr = [];
	for (let i = 0; i < 9999999; i ++ ) {
		arr.push(i);
	}
	console.log('Memory filled');

	// Wait for the `dirHandle` variable to be garbage collected
	// Lower values for the setTimeout may not allow the bug to be reproduced
	console.log('Waiting a bit...');
	setTimeout(async () => {
		files.forEach(async file => {
			const buffer = await file.arrayBuffer();
			console.log(buffer);
		});
	}, 15000);
});