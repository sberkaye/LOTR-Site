import { getData } from "./script.js";
import { Spinner } from "./spin.js";
import { Pagination } from "./pagination.js";

class BookModel {
  constructor() {
    this.bookData = [];
  }
  addBook = (id, _name, _chapters, _summary) => {
    // replace "\n"s in summary with line breaks in HTML and format it with &nbsp;
    _summary = _summary.replace(/(?:\r\n|\r|\n)/g, "</br> &nbsp &nbsp");
    _summary = `&nbsp &nbsp${_summary}`;
    let book = {
      _id: id,
      name: _name,
      chapters: _chapters,
      summary: _summary,
    };
    this.bookData.push(book);
  };
}

class BookView {
  constructor() {
    this.container = document.getElementById("btn-container");
    this.recordPerPage = 6;
    this.btnGoToIndex = document.getElementById("btn-back");
    this.btnGoToIndex.addEventListener("click", () => {
      document.childNodes.forEach((el) => {
        el.classList.add("animate__animated");
        el.classList.add("animate__fadeOutRight");
      });
    });
  }

  buttonAction = (event) => {
    let book = event.currentTarget.data;
    const infoBox = document.getElementById("book-info");
    infoBox.style.background = "#eee";

    const btnBackHTML = `<a href="#" id="btn-back-infobox" style="position: fixed;">
									<i class="fas fa-angle-left"></i>
								</a>`;

    infoBox.innerHTML += btnBackHTML;
    infoBox.innerHTML +=
      "<a href='#' id='close-button'><i class='fas fa-times'></i></a>";
    infoBox.innerHTML += `<h1 id="book-title">${book.name}</h1><br>`;
    console.log("book.name :>> ", book.name);
    switch (book.name) {
      case "The Fellowship Of The Ring":
        infoBox.innerHTML += `<img src="../img/books/the-fellowship-of-the-ring.jpeg" alt="Members of The Fellowship of the Ring" class="infobox-book-img" />`;
        break;
      case "The Two Towers":
        infoBox.innerHTML += `<img src="../img/books/the-two-towers.jpeg" class="infobox-book-img" />`;
        break;
      case "The Return Of The King":
        infoBox.innerHTML += `<img src="../img/books/return-of-the-king.jpeg" class="infobox-book-img" />`;
        break;
      default:
        break;
    }

    infoBox.innerHTML += `<a href='#' id='summary-button' class='btn-dark'>Summary</a><br>`;
    infoBox.innerHTML += `<a href='#' id='chapter-button' class='btn-dark'>Chapters</a>`;
    infoBox.innerHTML += `<div id="summary" style="width: 80%; margin: 2vh auto; overflow: scroll;">${book.summary}</div>`;

    let chapterNames = "";
    let i = 1;
    // x and y positions to determine the item's position on the grid
    let x = 2;
    let y = 1;

    book.chapters.forEach((chapter) => {
      let check = book.name == "The Return Of The King" ? 11 : 12;

      if (y == check) {
        y = 1;
        x = 3;
      }
      chapterNames +=
        `<span style='grid-column-start: ${x}; grid-column-end: ${
          x + 1
        }; grid-row-start: ${y}; grid-row-end: ${y + 1}'>` +
        i +
        "." +
        chapter.chapterName +
        "</span>";
      i++;
      y++;
    });

    infoBox.innerHTML += `<div id="chapters" style="display: grid; width: 100%; margin: 6vh auto; grid-template-columns: 1fr 2fr 2fr 1fr; grid-template-rows: repeat(11, 1fr);">${chapterNames}</div>`;
    document.getElementById("chapters").style.display = "grid";
    const transitionGradient = document.getElementById("transition-gradient");
    transitionGradient.style.opacity = 1;

    const btnBack = document.getElementById("btn-back-infobox");
    const btnClose = document.getElementById("close-button");
    const btnSummary = document.getElementById("summary-button");
    const btnChapters = document.getElementById("chapter-button");

    const chapters = document.getElementById("chapters");
    const summary = document.getElementById("summary");

    btnBack.style.visibility = "hidden";
    summary.style.display = "none";
    chapters.style.display = "none";

    btnClose.addEventListener("click", () => {
      infoBox.style.visibility = "hidden";
      infoBox.innerHTML = "";
      infoBox.classList.toggle("animate__animated");
      infoBox.classList.toggle("animate__fadeIn");
      transitionGradient.style.opacity = 0;
    });

    btnSummary.addEventListener("click", () => {
      document.querySelector(".infobox-book-img").style.display = "none";
      btnBack.style.visibility = "visible";
      btnSummary.style.display = "none";
      btnChapters.style.display = "none";
      chapters.style.display = "none";
      summary.style.display = "block";
    });

    btnBack.addEventListener("click", () => {
      document.querySelector(".infobox-book-img").style.display = "block";
      summary.style.display = "none";
      chapters.style.display = "none";
      btnBack.style.visibility = "hidden";
      btnSummary.style.display = "inline-block";
      btnChapters.style.display = "inline-block";
    });

    btnChapters.addEventListener("click", () => {
      document.querySelector(".infobox-book-img").style.display = "none";
      btnBack.style.visibility = "visible";
      btnSummary.style.display = "none";
      btnChapters.style.display = "none";
      chapters.style.display = "grid";
    });

    infoBox.style.visibility = "visible";
    infoBox.classList.toggle("animate__animated");
    infoBox.classList.toggle("animate__fadeIn");
  };

  createBooks = (bookData) => {
    let pagination = new Pagination(
      bookData,
      this.recordPerPage,
      this.container
    );
    bookData.forEach((book) => {
      pagination.createButton(book, this.buttonAction, "book-btn");
    });
    pagination.changePage(1);
  };
}

class BookController {
  constructor(_model, _view) {
    this.model = _model;
    this.view = _view;
  }

  showBooks = async () => {
    console.log("sa");
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
    let bookData = await getData("book");
    let chapterData = await getData("chapter");
    let summaries = await fetch("../data/bookSummaries.json");
    summaries = await summaries.json();
    spinner.stop();
    bookData = bookData.docs;
    chapterData = chapterData.docs;
    console.log("bookData :>> ", bookData);
    bookData.forEach((book) => {
      let _id = book._id;
      let _name = book.name;
      let _chapters = chapterData.filter((chapter) => chapter.book == _id);
      let summary = summaries[_id].summary;
      this.model.addBook(_id, _name, _chapters, summary);
    });
    this.view.createBooks(this.model.bookData);
  };
}

const controller = new BookController(new BookModel(), new BookView());
controller.showBooks();
