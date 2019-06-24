console.log('Before');
//getUser(1, displayUser);
console.log('After');
/*function displayCommits(commits){
    console.log(commits);
}
function displayRepository(repos){
    getCommits(repos, getsCommits);
}
function displayUser(user){
    getRepositories(user.gitHubUsername, getRepositories);
}*/

getUser(1)
    .then(user => getRepositories(user.gitHubUsername))
    .then(repos => getCommits(repos[-2]))
    .then(commits => console.log('Commits', commits))
    .catch(err => console.log('Error', err.message));
//Callbacks
//Promises
//Async/await
function getUser(id){
    return new Promise((resolve, reject) =>{
        //Kick off some asysn work
        setTimeout(() =>{
            console.log('Reading a user from a database...');
            resolve({id: id, gitHubUsername:'Quyen'});
            return;
        }, 2000);
    }); 
    }
    


function getRepositories(username){
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
        console.log('Reading a user repostory from a database...');
        resolve(['repo1','repo2','repo3']);
        return;
    }, 2000);
    });
}

function getCommits(repos){
    return new Promise((resolve, reject) =>{
    setTimeout(() =>{
        console.log('Calling Github API');
        resolve(['commit']);

    },2000);
    });
}