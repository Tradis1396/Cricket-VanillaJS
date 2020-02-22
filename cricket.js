var team_1_array = [];
var team_2_array = [];
var scoreArray_1 = {};
var scoreArray_2 = {};
var total_1 = [];
var total_2 = [];
var outcount_1 = 0;
var outcount_2 = 0;
var count_ball_1 = 0;
var count_ball_2 = 0;
var match = false;
var mom1, mom2, max;
var total_array_1 = [];
var total_array_2 = [];




playersAssign = function (playerArray, id) {
    for (i = 1; i < 11; i++) {
        playerArray.push(id + i);
    }
    return playerArray;
};

var play_1Array = playersAssign([], "Team_One_Player_");
var play_2Array = playersAssign([], "Team_Two_Player_");


function bat(id, _divID, _scoreID) {
    var batBtn = document.getElementById(id);
    btnID = id
    random = function () {
        return Math.floor(Math.random() * (7 - 0)) + 0;
    }
    random = random()
    divId = _divID
    scoreID = _scoreID


    if (batBtn.id == "batID_1") {
        document.getElementById("batID_2").disabled = true;
        count_ball_1 += 1

        if (count_ball_1 == 60 || outcount_1 == 5) {
            document.getElementById(id).disabled = true;
            document.getElementById("batID_2").disabled = false;
            clearTimeout(clear_1)

        }
        return playersFunction(team_1_array, total_1, count_ball_1, random, play_1Array, scoreArray_1)
    }
    else {
        document.getElementById("batID_1").disabled = true;
        count_ball_2 += 1;
        if (count_ball_2 == 60 || outcount_2 == 5) {
            document.getElementById(id).disabled = true;
            document.getElementById("batID_1").disabled = false;
            clearTimeout(clear_2)

        }
        return playersFunction(team_2_array, total_2, count_ball_2, random, play_2Array, scoreArray_2)

    }

}

var playersFunction = function (array, total, ball_count, randomValue, playersArray, scoreArray) {
    array.push(randomValue);
    total.push(randomValue);

    var totalScore = total.reduce((x_, y_) => { return x_ + y_ })
    document.getElementById(scoreID).innerHTML = `team_Current_Score::: ${array}`;
    document.getElementById(divId).innerHTML = `total_Runs::: ${totalScore}`;

    if (randomValue == 0 || array.length == 6) {

        if (randomValue == 0 && array == team_1_array) { outcount_1 += 1; document.getElementById("wicket_ID_1").innerHTML = `Wickets = ${outcount_1} wicket` }
        else if (randomValue == 0 && array == team_2_array) { outcount_2 += 1; document.getElementById("wicket_ID_2").innerHTML = `Wickets = ${outcount_2} wicket` }

        var eachPlayer = playersArray.shift();
        if (eachPlayer != undefined) {
            scoreArray[eachPlayer] = array.splice(0);
            match = false;
            if (Object.keys(scoreArray).length == 10) {
                switch (btnID) {
                    case "batID_1":
                        document.getElementById(btnID).disabled = true
                        document.getElementById("batID_2").disabled = false
                        break;
                    case "batID_2":
                        document.getElementById(btnID).disabled = true
                        document.getElementById("batID_1").disabled = false
                        break;
                    default:
                        break;
                }
            }

            Object.keys(scoreArray).forEach((ele) => { each = ele });
            document.getElementById("eachplayerID").innerHTML = `${each}`
            var node = document.createElement('LI')
            var textnode = document.createTextNode(`player::: ${each} scores::: ${scoreArray[eachPlayer]} total::: ${scoreArray[eachPlayer].reduce((x, y) => { return x + y })}`);
            node.appendChild(textnode);
            if (btnID == "batID_1") {
                document.getElementById("score_1").appendChild(node);
            }
            else {
                document.getElementById("score_2").appendChild(node);

            }

        }
    }

}
var get_Output = function (array_score, total_arr) {
    for (let [key, value] of Object.entries(array_score)) {
        total_arr.push(value.reduce((x, y) => { return x + y }));
        max = Math.max(...total_arr);
    }

    return total_arr.reduce((x, y) => { return x + y })

}

function manOftheMatch(array_score, key_array, winID, team, tot_1) {
    for (let [key] of Object.entries(array_score)) {
        key_array.push(key);
        max = Math.max(...tot_1);
        if (tot_1.indexOf(max) == key_array.indexOf(key)) { setmom(key) }
    }
    document.getElementById(`${winID}`).innerHTML = `team ${team} has won the match <br><br> Man of the match::: ${getmom()}`
}
function output() {
    var teamtotal_1 = get_Output(scoreArray_1, total_array_1)
    var teamtotal_2 = get_Output(scoreArray_2, total_array_2)

    teamtotal_1 > teamtotal_2 ? manOftheMatch(scoreArray_1, [], "winID", "one", total_array_1) : manOftheMatch(scoreArray_2, [], "winID", "two", total_array_2)

    var objdata_1 = { teamtotal_1, scoreArray_1 }
    var objdata_2 = { teamtotal_2, scoreArray_2 }


    localStorage.setItem("firstTeam", JSON.stringify(objdata_1));
    localStorage.setItem("secondTeam", JSON.stringify(objdata_2));

}
function setmom(mom) {
    mom1 = mom
}

function getmom() { return mom1 }

document.getElementById("batID_1").addEventListener("click", clear_1 = function () {
    return setTimeout((time) => {
        document.getElementById("batID_2").disabled = false;
        document.getElementById("batID_1").disabled = true;
    }, 15000)
}
)

document.getElementById("batID_2").addEventListener("click", clear_2 = function () {
    return setTimeout(() => {
        document.getElementById("batID_2").disabled = true;
        document.getElementById("batID_1").disabled = false;

    }, 15000)
}
)
