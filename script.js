document.getElementById("burger_menu").addEventListener("click", showMenu);

function showMenu() {
	if(document.getElementById('menu').style.display!="block") {
		document.getElementById('menu').style.display='block';
	} else {
		document.getElementById('menu').style.display='none';
	}
}