/***********
Javascript
*****************/

var which_comm = 0;


function add_comm_event()
{
	var buttons = document.getElementsByClassName("comment-button");
	for(i = 0; i < buttons.length; i++)
	{
		btn = buttons[i]
		btn.addEventListener("click", function() {
			document.getElementById("create-comment-modal").classList.remove("hidden");
			which_comm = this.parentElement.id;;
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
		});
	}
}

window.addEventListener("load",function() {
  add_comm_event();
  add_close_btn_event();
});

//*
let create_com_btn = document.getElementsByClassName('modal-accept-button')[0];
create_com_btn.addEventListener("click", () => {	
	var comment_content = 
	{
		text: document.getElementById("comment-text-input").value,
		author: document.getElementById("comment-attribution-input").value,
		parentID: which_comm,
	};
	
	var comm_html = Handlebars.templates.commentTemplate(comment_content);
	
	//the comment div is the 5th child
	var comment_container = document.getElementById(which_comm).children[4];
	
	comment_container.insertAdjacentHTML("beforeend", comm_html);
	
	create_com_btn.parentElement.classList.add("hidden");
	
	console.log("create btn");
	
});
//*/



		