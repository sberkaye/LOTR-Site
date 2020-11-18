import { getData } from "./script.js";
import { Spinner } from "./spin.js";
import { Pagination } from "./pagination.js";

class CharacterModel {
  constructor() {
    this.characters = [];
  }
  addCharacter = (
    _id,
    _birth,
    _death,
    _gender,
    _hair,
    _height,
    _name,
    _race,
    _realm,
    _spouse
  ) => {
    const character = {
      id: _id,
      birth:
        _birth != null && _birth.length > 0 && _birth != "NaN"
          ? _birth
          : "Unknown",
      death:
        _death != null && _death.length > 0 && _death != "NaN"
          ? _death
          : "Unknown",
      gender:
        _gender != null && _gender.length > 0 && _gender != "NaN"
          ? _gender
          : "Complicated",
      hair:
        _hair != null && _hair.length > 0 && _hair != "NaN" ? _hair : "Unknown",
      height:
        _height != null && _height.length > 0 && _height != "NaN"
          ? _height
          : "Unknown",
      name:
        _name != "MINOR_CHARACTER" && _name != "NaN" && _name != undefined
          ? _name
          : "",
      race:
        _race != null && _race.length > 0 && _race != "NaN"
          ? _race
          : "Complicated",
      realm:
        _realm != null && _realm.length > 0 && _realm != "NaN"
          ? _realm
          : "Unknown",
      spouse:
        _spouse != null && _spouse.length > 0 && _spouse != "NaN"
          ? _spouse
          : "No spouse",
    };

    this.characters.push(character);
  };
}

class CharacterView {
  constructor() {
    this.container = document.getElementById("btn-container");
    this.recordPerPage = 20; // 5x4
    console.log("window.innerWidth :>> ", window.innerWidth);
    if (window.innerWidth < 1250) {
      this.recordPerPage = 10;
    }
  }

  buttonAction = (event) => {
    let character = event.currentTarget.data; // the data bounded to the button
    const infoBox = document.getElementById("character-info");
    infoBox.innerHTML = "";
    infoBox.innerHTML +=
      "<a href='#' id='close-button'><i class='fas fa-times'></i></a>";
    infoBox.innerHTML += `<span class="info-text">Name: ${character.name}<br>
			Race: ${character.race}<br>
			Gender: ${character.gender}<br>
			Realm: ${character.realm}<br>
			Date of Birth: ${character.birth}<br>
			Date of Death: ${character.death}<br>
			${character.height != "Unknown" ? `Height: ${character.height}<br>` : ``}
			${character.hair != "Unknown" ? `Hair: ${character.hair}<br>` : ``}`;
    infoBox.innerHTML += `</span>`;
    infoBox.style.visibility = "visible";
    infoBox.classList.toggle("animate__animated");
    infoBox.classList.toggle("animate__fadeIn");
    const transitionGradient = document.getElementById("transition-gradient");
    transitionGradient.style.opacity = 1;
    const btnClose = document.getElementById("close-button");
    btnClose.addEventListener("click", () => {
      infoBox.style.visibility = "hidden";
      infoBox.innerHTML = "";
      infoBox.classList.toggle("animate__animated");
      infoBox.classList.toggle("animate__fadeIn");
      transitionGradient.style.opacity = 0;
    });
  };

  createPaginatedCharacters = (characterData) => {
    let pagination = new Pagination(
      characterData,
      this.recordPerPage,
      this.container
    );
    characterData.forEach((character) => {
      pagination.createButton(character, this.buttonAction, "character-btn");
    });
    pagination.changePage(1);
  };
}

class CharacterController {
  constructor(_model, _view) {
    this.model = _model;
    this.view = _view;
  }

  showCharacters = async () => {
    const opts = {
      lines: 8, // The number of lines to draw
      length: 43, // The length of each line
      width: 17, // The line thickness
      radius: 45, // The radius of the inner circle
      scale: 1, // Scales overall size of the spinner
      corners: 1, // Corner roundness (0..1)
      speed: 1, // Rounds per second
      rotate: 0, // The rotation offset
      animation: "spinner-line-fade-quick", // The CSS animation name for the lines
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: "#ffd448", // CSS color or array of colors
      fadeColor: "transparent", // CSS color or array of colors
      top: "50%", // Top position relative to parent
      left: "50%", // Left position relative to parent
      shadow: "0 0 1px transparent", // Box-shadow for the lines
      zIndex: 2000000000, // The z-index (defaults to 2e9)
      className: "spinner", // The CSS class to assign to the spinner
      position: "absolute", // Element positioning
    };
    const spinner = new Spinner(opts).spin(this.view.container);
    let charData = await getData("character");
    spinner.stop();
    charData = charData.docs;
    console.log("charData :>> ", charData);
    charData.forEach((character) => {
      let _id = character._id;
      let _birth = character.birth;
      let _death = character.death;
      let _gender = character.gender;
      let _hair = character.hair;
      let _height = character.height;
      let _name = character.name;
      let _race = character.Race;
      let _realm = character.realm;
      let _spouse = character.spouse;
      this.model.addCharacter(
        _id,
        _birth,
        _death,
        _gender,
        _hair,
        _height,
        _name,
        _race,
        _realm,
        _spouse
      );
    });
    console.log("this.model.characters :>> ", this.model.characters);
    this.view.createPaginatedCharacters(this.model.characters);
  };
}

const controller = new CharacterController(
  new CharacterModel(),
  new CharacterView()
);
controller.showCharacters();
