/**
 * A JS class to handle pagination stuff like creating different pages and
 * making search operations on that pages
 */

class Pagination {
  constructor(_records, _recordsPerPage, _container) {
    this.currentPage = 1;
    this.records = _records;
    this.numberOfRecords = this.records.length;
    this.recordPerPage = _recordsPerPage;
    this.currentRecords = this.records;
    this.buttons = [];
    this.names = this.records.map((record) => record.name);
    this.container = _container;

    // DOM Elements
    this.btnPrev = document.getElementById("btn-page-back");
    this.btnNext = document.getElementById("btn-page-next");
    this.pageSpan = document.getElementById("page-nr");
    this.btnFirstPage = document.getElementById("btn-first-page");
    this.btnLastPage = document.getElementById("btn-last-page");
    this.searchBar = document.getElementById("searchbar");

    // event listeners
    this.btnNext.addEventListener("click", this.nextPage);
    this.btnPrev.addEventListener("click", this.prevPage);
    this.btnFirstPage.addEventListener("click", this.firstPage);
    this.btnLastPage.addEventListener("click", this.lastPage);
    this.searchBar.addEventListener("keyup", this.search);
  }

  prevPage = () => {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.changePage(this.currentPage);
    }
  };

  nextPage = () => {
    if (this.currentPage < this.numberOfPages()) {
      this.currentPage++;
      this.changePage(this.currentPage);
    }
  };

  firstPage = () => {
    this.currentPage = 1;
    this.changePage(this.currentPage);
  };

  lastPage = () => {
    this.currentPage = this.numberOfPages();
    this.changePage(this.currentPage);
  };

  numberOfPages = () => {
    return Math.ceil(this.numberOfRecords / this.recordPerPage);
  };

  createButton = (btnData, eventCallback, btnStyle) => {
    let button = document.createElement("a");
    button.classList.add("animate__animated");

    // if there are multiple classes needed for styling the button, take them as an Array
    // and add all of them
    if (Array.isArray(btnStyle)) {
      console.log("arraydeyim");
      btnStyle.forEach((style) => {
        button.classList.add(style);
      });
    } else {
      button.classList.add(btnStyle);
    }
    //console.log("button.classList :>> ", button.classList);
    button.textContent = btnData.name;
    button.addEventListener("click", eventCallback);

    // bind the data to the button for later use
    button.data = btnData;

    // animation methods
    button.fadeInLeft = () => {
      button.classList.remove("animate__fadeOutLeft");
      button.classList.add("animate__fadeInLeft");
    };
    button.fadeInRight = () => {
      button.classList.remove("animate__fadeOutRight");
      button.classList.add("animate__fadeInRight");
    };
    button.fadeOutLeft = () => {
      button.classList.remove("animate__fadeInRight");
      button.classList.add("animate__fadeOutLeft");
    };
    button.fadeOutRight = () => {
      button.classList.remove("animate__fadeInLeft");
      button.classList.add("animate__fadeOutRight");
    };

    this.buttons.push(button);
  };

  showButton = (name) => {
    let index = this.names.indexOf(name);
    if (index == -1) {
      console.error(name);
      return;
    }
    this.container.append(this.buttons[index]);
  };

  changePage = (pageNo) => {
    // validate pageNo
    if (pageNo < 1) pageNo = 1;
    if (pageNo > this.numberOfPages()) pageNo = this.numberOfPages();

    this.container.innerHTML = "";

    for (
      let i = (pageNo - 1) * this.recordPerPage;
      i < pageNo * this.recordPerPage && i < this.numberOfRecords;
      i++
    ) {
      this.showButton(this.currentRecords[i].name);
    }

    this.currentPage = pageNo;
    this.pageSpan.innerHTML = pageNo;

    if (pageNo == 1) {
      this.btnPrev.style.visibility = "hidden";
      this.btnFirstPage.style.visibility = "hidden";
    } else {
      this.btnPrev.style.visibility = "visible";
      this.btnFirstPage.style.visibility = "visible";
    }

    if (pageNo == this.numberOfPages()) {
      this.btnNext.style.visibility = "hidden";
      this.btnLastPage.style.visibility = "hidden";
    } else {
      this.btnNext.style.visibility = "visible";
      this.btnLastPage.style.visibility = "visible";
    }
  };

  search = () => {
    this.container.innerHTML = "";
    this.currentRecords = [];
    let input = this.searchBar.value.toLowerCase();
    let matches = [];
    this.records.forEach((record) => {
      if (
        record.name
          .toLowerCase()
          .replace(/é/g, "e")
          .replace(/ô/g, "o")
          .replace(/ó/g, "o")
          .replace(/á/g, "a")
          .replace(/ö/g, "o")
          .replace(/ç/g, "c")
          .replace(/ë/g, "e")
          .replace(/ê/g, "e")
          .replace(/ú/g, "u")
          .includes(input)
      ) {
        matches.push(record);
      }
    });
    this.currentRecords = matches;
    this.numberOfRecords = this.currentRecords.length;
    this.changePage(1);
  };
}

export { Pagination };
