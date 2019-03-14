//Display the dashboard
export default class Dashboard {

    displayDashboardPlayer(player) {
        let playerSelect = document.getElementsByClassName(player.getId());

        //display weapon
        if ($(playerSelect).children().length !== 1) {
            $(playerSelect).children().last().remove();
            $(playerSelect).children().last().remove();
        }
        $(playerSelect).append('<div class="col-4"><img src="./images/' + player.getWeapon().getImage() + '" id="' + player.getId() + player.getWeapon().getId() + 'dash" /></div>');

        //display points
        $(playerSelect).append(`<div class="col-4" id="` + player.getId() + `pointdash"><span>` + player.getPoint() + ` points</span></div>`);
    }

    changeTurn(player) {
        $('#gameTurn').children().first().replaceWith('<p class="' + player.getId() + 'Play">' + player.getName() + ' joue</p>');
    }

    instruction(event, player = null) {
        let newInstructions = "";
        switch (event) {
            case "start":
                newInstructions = '<p>Déplacez le joueur avec les flèches du clavier et cliquez sur Entrée quand vous voulez valider</p>';
                break;
            case "fight":
                newInstructions = '<p>Combat ! Cliquez sur "A" pour attaquer, cliquez sur "D" pour défendre</p>';
                break;
            case "gameover":
                newInstructions = '<p>' + player.getName() + ' a gagné !</p>';
        }
        $('#instructions').children().replaceWith(newInstructions);
        if (event === "gameover") {
            $("#instructions").children().css("fontSize", "1.5rem").css("backgroundColor", "#960018");
        }
    }
}
