/***********
Javascript
*****************/

var which_comm = 0

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

window.addEventListener("load",function() {
  add_comm_event();

  var createPostButton = document.getElementsByClassName('create-new-button')[0];
  if (createPostButton)	{
  	createPostButton.addEventListener('click', showCreatePostModal);
  }
  var modalCancelButton = document.getElementsByClassName("modal-cancel-button")[0];
  if (modalCancelButton) {
  	modalCancelButton.addEventListener('click', hideCreateTwitModal);
  }
});
/*
let create_com_btn = document.getElementById('create-twit-button');
create_twit_b.addEventListener("click", () => {
	mod_back.className = "not_hidden";
	create_twit_mod.className = "not_hidden";
});
*/
		