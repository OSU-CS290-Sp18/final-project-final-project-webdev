/***********
Javascript
*****************/
var allPosts = [];

var which_comm = 0;

function add_comm_event()
{
	var buttons = document.getElementsByClassName("comment-button");
	for(i = 0; i < buttons.length; i++)
	{
		buttons[i].addEventListener("click", function(){
			getElementById("create-comment-modal").classList.remove("hidden");
		});
	}
}

function showCreatePostModal()
{
	var modalBackdrop = document.getElementById('modal-backdrop');
	var createPostModal = document.getElementById('create-post-modal');

	modalBackdrop.classList.remove('hidden');
	createPostModal.classList.remove('hidden');
}

function hideCreateTwitModal() {

  var modalBackdrop = document.getElementById('modal-backdrop');
  var createPostModal = document.getElementById('create-post-modal');

  modalBackdrop.classList.add('hidden');
  createPostModal.classList.add('hidden');

}

function clearSearch() {
	document.getElementById('navbar-search-input').value = "";
	doSearchUpdate();
}

function postMatchesSearch(post, searchQuery)
{
	if(!searchQuery) {
		return true;
	}
	searchQuery = searchQuery.trim().toLowerCase();
	var searchPost = parsePosts(post);
//	console.log(searchPost);
//	console.log(searchQuery);
	n = searchPost.search(searchQuery);
	return n;
}

function doSearchUpdate() {
	var searchQuery = document.getElementById('navbar-search-input').value;
	
	var myPosts = document.getElementsByClassName('post');
	if (myPosts) {
		for (var i=0; i<myPosts.length; i++)
		{
			myPosts[i].classList.add('hidden');
		}
	}

	for (var j=0; j<myPosts.length; j++)
	{
		if (postMatchesSearch(myPosts[j], searchQuery) > -1) {
			myPosts[j].classList.remove('hidden');
		}
	}

}

function parsePosts(postElem) {
	var post = "";
	var postTextElem = postElem.querySelector('.post-text');
	var myText = postTextElem.textContent.trim();

	var postAttributionLinkElem = postElem.querySelector('.post-attribution a');
	var myAttribution = postAttributionLinkElem.textContent.trim();

	var myCText = "";
	var postCommentText = postElem.querySelectorAll('.post-comment-text');
	for(var i = 0; i < postCommentText.length; i++){
		myCText += postCommentText[i].textContent.trim();
	}

	var myCA = ""
	var postCommentAuthor = postElem.querySelectorAll('.post-comment-attribution a');
	for(var j = 0; j < postCommentAuthor.length; j++){
		myCA += postCommentAuthor[j].textContent.trim();
	}
	post = myText + " " + myAttribution + " " + myCText + " " + myCA;
	post = post.toLowerCase();
	return post;
}


window.addEventListener("load",function() {
	add_comm_event();

	var postElemsCollection = document.getElementsByClassName('post');
	for (var i = 0; i < postElemsCollection.length; i++){
		allPosts.push(parsePosts(postElemsCollection[i]));
	}


	var createPostButton = document.getElementsByClassName('create-new-button')[0];
	if (createPostButton)	{
		createPostButton.addEventListener('click', showCreatePostModal);
	}

	var modalCancelButton = document.getElementsByClassName("modal-cancel-button")[0];
	if (modalCancelButton) {
		modalCancelButton.addEventListener('click', hideCreateTwitModal);
	}

	var modalCloseButton = document.getElementsByClassName("modal-close-button")[0];
	if (modalCloseButton) {
		modalCloseButton.addEventListener('click', hideCreateTwitModal);
	}

	var searchButton = document.getElementById('navbar-search-button');
	if (searchButton) {
	searchButton.addEventListener('click', doSearchUpdate);
	}

	var searchInput = document.getElementById('navbar-search-input');
	if (searchInput) {
	searchInput.addEventListener('input', doSearchUpdate);
	}

});
/*
let create_com_btn = document.getElementById('create-twit-button');
create_twit_b.addEventListener("click", () => {
	mod_back.className = "not_hidden";
	create_twit_mod.className = "not_hidden";
});
*/
		