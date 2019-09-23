'use strict';

const Git = require('nodegit');
const fs = require('fs');
const cnst = require('./constant');
const common = require('./common');

/**
 * This example creates a certain file `newfile.txt`, adds it to the git
 * index and commits it to head. Similar to a `git add newfile.txt`
 * followed by a `git commit`
**/

let repo;
let index;
let oid;
console.log(cnst.add_commit_filename);
Git.Repository.open(cnst.test_git_path)
.then((repoResult) => (repo = repoResult))
.then(() => {
	return fs.writeFileSync(
		cnst.test_file_path + cnst.add_commit_filename, 
		'xml insert'
	);
})
.then(() => repo.refreshIndex())
.then((indexResult) => (index = indexResult))
.then(() => index.addByPath(cnst.add_commit_filename))
.then(() => index.write())
.then(() => index.writeTree())
.then((oidResult) => {
  oid = oidResult;
  return Git.Reference.nameToId(repo, 'HEAD');
})
.then((head) => repo.getCommit(head))
.then((parent) => {
	let commit_msg = 'XML commit example';

	return repo.createCommit(
		'HEAD', 
		common.get_commiter_sign(cnst), 
		common.get_commiter_sign(cnst), 
		commit_msg, 
		oid,
		[parent]
	);
})
.done((commitId) => {
	console.log('New Commit: ', commitId);
});
