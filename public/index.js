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


window.addEventListener("load",function() {
  add_comm_event();
});

let create_com_btn = document.getElementById('create-twit-button');
create_twit_b.addEventListener("click", () => {
	mod_back.className = "not_hidden";
	create_twit_mod.className = "not_hidden";
});

		