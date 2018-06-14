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
		btn = buttons[i]
		btn.addEventListener("click", function() {
			document.getElementById("create-comment-modal").classList.remove("hidden");
			document.getElementById("modal-backdrop").classList.remove("hidden");
			which_comm = this.parentElement.id;

		});
	}
}

function add_close_btn_event()
{
	var modals_x =  document.getElementsByClassName("modal-close-button");
	for(i = 0; i < modals_x.length; i++)
	{
		modals_x[i].addEventListener("click", () => {
			document.getElementById("create-comment-modal").classList.add("hidden");
			document.getElementById("create-post-modal").classList.add("hidden");
			document.getElementById("modal-backdrop").classList.add("hidden");
			
			document.getElementById("comment-text-input").value = "";
			document.getElementById("comment-attribution-input").value = "";
			
		});
	}
}

//the create comment button has no id
let create_com_btn = document.getElementById('create-comment-modal').children[0].children[2].children[1];

create_com_btn.addEventListener("click", () => {	
	
	comm_text = document.getElementById("comment-text-input")
	comm_auth = document.getElementById("comment-attribution-input")
	
	if(comm_text.value == "" || comm_auth.value == "")
	{
		alert("both text and author boxes must be filled");
	}
	else
	{
		
		var comment_content = 
		{
			text: comm_text.value,
			author: comm_auth.value,
			parentID: which_comm,
		};
		
		var request = new XMLHttpRequest();
		var postID = which_comm;
		var url = "/post/" + postID + "/newComment";
		request.open("POST", url);

		var requestBody = JSON.stringify({
			author: comm_auth.value,
			text: comm_text.value
		});
		request.addEventListener('load', (event) => {
			if (event.target.status === 200) {

				var comm_html = Handlebars.templates.commentTemplate(comment_content);

				// the comment div is the 5th child
				var comment_container = document.getElementById(which_comm).children[3];

				comment_container.insertAdjacentHTML("afterend", comm_html);
			} else {
				alert("Error creating comment: " + event.target.response);
			}
		});

		request.setRequestHeader('Content-Type', 'application/json');
		request.send(requestBody);

		document.getElementById('create-comment-modal').classList.add("hidden");
		document.getElementById("modal-backdrop").classList.add("hidden");
		
		comm_text.value = "";
		comm_auth.value = "";
	}	
	
});


//the cancel comment button has no id
let cancel_com_btn = document.getElementById('create-comment-modal').children[0].children[2].children[0];

cancel_com_btn.addEventListener("click", () => {
	
	comm_text = document.getElementById("comment-text-input");
	comm_auth = document.getElementById("comment-attribution-input");
	
	document.getElementById('create-comment-modal').classList.add("hidden");
	document.getElementById("modal-backdrop").classList.add("hidden");
	
	comm_text.value = "";
	comm_auth.value = "";
	
});

//because create post button doesn't have id
let create_post_btn = document.getElementById("create-post-modal").children[0].children[2].children[1];

create_post_btn.addEventListener("click", () => {
	post_text = document.getElementById("post-text-input");
	post_author = document.getElementById("post-attribution-input");
	nintendo_check = document.getElementById("nintendo-tag");
	xbox_check = document.getElementById("xbox-tag");
	ps_check = document.getElementById("playstation-tag");
	
	var tag_array = []
	
	if(nintendo_check.checked == true)
	{
		tag_array.push("nintendo");
	}
	if(xbox_check.checked == true)
	{
		tag_array.push("xbox");
	}
	if(ps_check.checked == true)
	{
		tag_array.push("playstation");
	}
	
	var posts = {
		text: post_text.value,
		author: post_author.value,
		tags: tag_array,
		comments: [],
	}

	var request = new XMLHttpRequest();
	var postID = which_comm;
	var url = "/newPost";
	request.open("POST", url);

	var requestBody = JSON.stringify({
		text: post_text.value,
		author: post_author.value,
		tags: tag_array,
		comments: [],
	});
	request.addEventListener('load', (event) => {
		if (event.target.status === 200) {
			var post_html = Handlebars.templates.postTemplate(posts);
			
			var post_container = document.getElementsByClassName("post-container")[0];
			
			post_container.insertAdjacentHTML("beforeend", post_html);
		} else {
			alert("Error creating comment: " + event.target.response);
		}
	});

	request.setRequestHeader('Content-Type', 'application/json');
	request.send(requestBody);
	
	add_comm_event();
	
	post_text.value = ""
	post_author.value = ""
	nintendo_check.value = false
	xbox_check.value = false
	ps_check = false
	
	document.getElementById("modal-backdrop").classList.add("hidden");
	document.getElementById("create-post-modal").classList.add("hidden");
	
});


let unhide_post_modal = document.getElementsByClassName("create-new-button")[0];

unhide_post_modal.addEventListener("click", () => {
	document.getElementById("modal-backdrop").classList.remove("hidden");
	document.getElementById("create-post-modal").classList.remove("hidden");
	
});

 function showCreatePostModal()
 {
 	var modalBackdrop = document.getElementById('modal-backdrop');
 	var createPostModal = document.getElementById('create-post-modal');
 
 	modalBackdrop.classList.remove('hidden');
 	createPostModal.classList.remove('hidden');
 }
 function hideCreatePostModal() {
 
   var modalBackdrop = document.getElementById('modal-backdrop');
   var createPostModal = document.getElementById('create-post-modal');
 
   modalBackdrop.classList.add('hidden');
   createPostModal.classList.add('hidden');
	clearSearch();
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
	// add_comm_event();

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
		modalCancelButton.addEventListener('click', hideCreatePostModal);
	}

	var modalCloseButton = document.getElementsByClassName("modal-close-button")[0];
	if (modalCloseButton) {
		modalCloseButton.addEventListener('click', hideCreatePostModal);
	}

	var searchButton = document.getElementById('navbar-search-button');
	if (searchButton) {
	searchButton.addEventListener('click', doSearchUpdate);
	}

	var searchInput = document.getElementById('navbar-search-input');
	if (searchInput) {
	searchInput.addEventListener('input', doSearchUpdate);
	}


	add_comm_event();
	add_close_btn_event();
});
