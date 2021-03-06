import typeWriter from "./components/typewrite.js";
import { skillsArray, featuredArray, projectsArray } from "./storage/arrays.js";
import { navMenu } from "./components/menu.js";
import scrollEffects from "./components/scroll.js";
import { displaySkills, displayFeatured, displayProjects } from "./components/createhtml.js";

navMenu();
scrollEffects();
document.addEventListener("DOMContentLoaded", typeWriter);

/*Skills*/

const navSkills = document.querySelectorAll(".skills__nav-link");
const skillsContent = document.querySelector(".skills__content");

skillsArray.forEach((skill) => {
  if (skill.title === "JavaScript") {
    displaySkills(skill.title, skill.text, skill.keyword);
  }
});

navSkills.forEach((navLink) => {
  navLink.addEventListener("click", skill);
});

function skill(event) {
  navSkills.forEach((link) => {
    if (link.classList.contains("skills__nav-link--active")) {
      link.classList.remove("skills__nav-link--active");
    }
  });
  event.target.classList.add("skills__nav-link--active");

  let skillInFocus = event.target.dataset.title;
  skillsContent.innerHTML = "";
  skillsArray.forEach((object) => {
    if (skillInFocus === object.title) {
      displaySkills(object.title, object.text, object.keyword);
    }
  });
}

/*Projects*/

/** Projects - Featured **/

featuredArray.forEach((project) => {
  const featuredProjects = document.querySelector(".featured__projects");
  displayFeatured(featuredProjects, project);
});

/** Sort-button **/

const btns = document.querySelectorAll(".all-projects__sort-btn");

btns.forEach((btn) => {
  btn.addEventListener("click", sortBtn);
});

const newestBtn = document.querySelector(".sort-btn__newest");
sortProjects(newestBtn);

function sortBtn(event) {
  btns.forEach((btn) => {
    btn.classList.remove("all-projects__sort-btn--active");
  });
  const btn = event.target;
  btn.classList.add("all-projects__sort-btn--active");
  sortProjects(btn);
}

function sortProjects(btn) {
  let sortedProjects;
  if (btn.classList.contains("sort-btn__newest")) {
    sortedProjects = projectsArray.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
  } else {
    sortedProjects = projectsArray.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });
  }
  createProjects(sortedProjects);
}

function createProjects(projects) {
  const projectsContainer = document.querySelector(".all-projects__wrapper");
  projectsContainer.innerHTML = "";
  projects.forEach((project) => {
    displayProjects(projectsContainer, project);
  });
}
