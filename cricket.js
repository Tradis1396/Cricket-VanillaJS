var team_1_array = [];
var team_2_array = [];
var playerArray_1 = [];
var playerArray_2 = [];
var total = [];
var counts = 0;
var count_over_1 = 0;
var count_over_2 = 0;
var div;

playersAssign = function (playerArray, id) {
    for (i = 0; i < 5; i++) {
        playerArray.push("player" + id + [i + 1]);
    }
    return playerArray;
};
var play_1Array = playersAssign(playerArray_1, "team_One_");
var play_2Array = playersAssign(playerArray_2, "team_Two_");


function bat(id, divID) {
    var batBtn = document.getElementById(id);

    if (batBtn.id == "batID_1") {
        document.getElementById("batID_2").disabled = true;
        count_over_1 += 1;
        if (count_over_1 >= 18) {
            document.getElementById(id).disabled = true;
            document.getElementById("batID_2").disabled = false;

            alert(`over`);
        }
        div = divID;

        return player(team_1_array)

    } else {
        document.getElementById("batID_1").disabled = true;

        count_over_2 += 1;
        if (count_over_2 >= 18) {
            document.getElementById(id).disabled = true;
            document.getElementById("batID_1").disabled = false;

            alert(`over`);
        }
        div = divID;


        return player(team_2_array);
    }
}
function player(array) {
    var score = Math.floor(Math.random() * (6 - 0)) + 0;
    if (score != 0) {
        array.push(score);
        total.push(score);

        var final = total.reduce((x, y) => {
            return x + y;
        }, 0);
        document.getElementById(div).innerHTML = "total: " + final;
    } else {
        counts += 1;
        alert(`zero`);
        function eachplayer(playe) {
            eachplay = playe.shift()
            playe[eachplay] = array.splice(score);
        }
        if (array == team_1_array) {
            eachplayer(play_1Array);
        }
        else {
            eachplayer(play_2Array);
        }
        if (counts == 5) {
            document.getElementById(batBtn.id).disabled = true;
        }
    }
}

function storage() {
    contents = document.getElementById("total_ID_1").innerHTML;
    contents_2 = document.getElementById("total_ID_2").innerHTML;

    localStorage.setItem("contents", contents);
    localStorage.setItem("bat_2", contents_2);
}

