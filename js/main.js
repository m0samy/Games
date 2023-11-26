let row = document.getElementById('rowBody');
let navItem = document.querySelectorAll('.catgory');
let rowOfDetails = document.getElementById('rowOfDetails');
let condi = document.getElementById('condi');
let section1 = document.getElementById('section1');
let section2 = document.getElementById('section2');
let xmark = document.getElementById('xmark');
let finalResponseId;
let finalResponse;
let navLink = document.getElementById('nav-link');

let category = 'MMORPG';


/* start category*/
for (let i = 0; i < navItem.length; i++) {
    
    navItem[i].addEventListener('click', function (e) {
        // console.log(e.target.innerText);
        category = e.target.innerText;
        getplay(category);
        navLink.classList.remove('active');
    })
}
/* end category*/


/*start Receve API Games*/
async function getplay(category) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '70e9b762a2msh85e92793950d6aap1de5d4jsn65b831324a34',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    let api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
    let response = await api.json();
    finalResponse = response;
    // console.log(finalResponse);
    display();

}
/*end Receve API*/


/* start display games */
function display() {
    let cartoona = ``;

    for(let i = 0; i < finalResponse.length; i++) {
        cartoona += `
        <div class="games col-lg-3 col-md-6 col-sm-12  my-2 rounded-2 border shadow" onclick="getId(${finalResponse[i].id})">
        <div>
            <img src="${finalResponse[i].thumbnail}" class="img-fluid" alt="image-game">
            <div class="d-flex justify-content-between align-items-center mt-3 mb-2">
                <h4 class="h6 small">${finalResponse[i].title}</h4>
                <button class="btn btn-primary btn-sm rounded-2" type="submit">Free</button>
            </div>
            <p class="opacity-75 col-12 text-start">${finalResponse[i].short_description}</p>
            <div class="d-flex justify-content-between align-items-center border rounded-2 border-dark mb-3 pt-2">
                <span class="bg-span h6 small rounded">${finalResponse[i].genre}</span>
                <span class="bg-span h6 small rounded">${finalResponse[i].platform}</span>
            </div>
        </div>
        </div>
        `
    }
    row.innerHTML = cartoona;
}
/*end display games */


/*start Receve API ID*/
async function getId(ID) {
    $("#loading").fadeIn(1000);
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '70e9b762a2msh85e92793950d6aap1de5d4jsn65b831324a34',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    let api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${ID}`, options)
    let response = await api.json()
    finalResponseId = response;
    console.log(finalResponseId);
    showGameDetails();

    $("#spinner").fadeOut(1000 , function() {
        $("#loading").slideUp(600 , function() {
            $("body").css('overflow' , 'auto');
            $("#loading").remove();
        })
    })

}
/*end Receve API ID*/


/*start show games details */
function showGameDetails() {
    let cartoona = `
        <div class="col-md-4">
        <div class="">
            <img src="${finalResponseId.thumbnail}" class="img-fluid" alt="">
        </div>
        </div>
        <div class="col-md-8 mb-4">
            <div class="">
                <h3>Title: ${finalResponseId.title}</h3>
                <p>category : <span class="badge text-bg-info"> ${finalResponseId.genre}</span></p>
                <p>Platform : <span class="badge text-bg-info"> ${finalResponseId.platform}</span></p>
                <p>Status :  <span class="badge text-bg-info"> ${finalResponseId.status}</span></p></p>
                <p> ${finalResponseId.description} </p>
                <a type="button" class="btn btn-outline-warning text-white" href="${finalResponseId.freetogame_profile_url}" target="_blank" >Show Game</a>
            </div>  
        </div>
    `;

    rowOfDetails.innerHTML = cartoona;
    unShow();
}
/*start show games details */


/*start show and unshow section */
function unShow() {
    section1.classList.add('d-none');
    document.getElementById('section').classList.add('d-none');
    section2.classList.remove('d-none');
}
/*end show and unshow section */


xmark.addEventListener('click', function () {
    section1.classList.remove('d-none');
    document.getElementById('section').classList.remove('d-none');
    section2.classList.add('d-none');
});

/*start loading*/
$(document).ready(function() {
    getplay(category).then(()=> {
        $("#spinner").fadeOut(1000 , function() {
            $("#loading").slideUp(1000 , function() {
                $("body").css('overflow' , 'auto');
                $("#loading").remove();
            })
        })
    })
});
/*end loading */