import { useEffect, useState, useRef } from "react";
import "./App.css";
import { KnowledgeCard } from "./components/knowledgeCard";
import CaretRight from "../public/images/icons/caret-right-fill.svg";
import emailjs from "emailjs-com";

import harvardCS50w from "/images/diplomas/cs50web.webp";

const projects = ["homesteader", "ponderosa", "network", "auctions", "mail"];

const descriptions = {
  homesteader: `Homesteader is an app I am currently developing whose purpose is to help those that are interesting in creating
   a garden by giving them valuable information and tips about the plants they wish to grow and also helping them organize their
    prospective garden by sending their information to the OpenAI ChatGPT API, whose job it is to organize most efficiently the users garden. To create this app I am
     using React, Django, HTML and CSS`,
  ponderosa: `Ponderosa is an app I developed as a final project for Harvards online CS50 course. It is a language learning app that uses AI
   to dynamically generate flash cards based on a user selected language and subject. Users are able to save generated decks and create folders to organize them, 
   and drill them with 'Practice Mode', and 'Active Recall' mode. To create this app I used React, HTML and CSS`,
  network: `Network is a project I did for the CS50W course, it uses HTML, CSS, Python, specifically the Django framework, using the built-in sqlite3 database to store user accounts, posts and keep track of likes and follows`,
  auctions: `Auctions is another project I did for the CS50W course, It uses HTML, CSS, Python and SQLite3 and is meant to simulate a simple ecommerce store. It has user accounts functionalities, along with 'View All Listings', 'Create New Listing', 'View Categories', and 'Watchlist'.`,
  mail: `Mail is a project I did that is meant to explore the basics of a email system. It uses Javascript, Python, CSS and HTML, and has user accounts, user inbox, 'Compose Email' 'Sent' inbox, and 'Archive' functionalities.`,
};

const letters = `abdegiklmnoprsvwy`;

const about = `My name is Garyk Simpson and I am a web developer.`;

let index = 0;
let aboutIndex = 0;

function App() {
  const [displayProject, setDisplayProject] = useState("homesteader");
  const [loadedPhotos, setLoadedPhotos] = useState([]);
  const [displayString, setDisplayString] = useState("");

  const [leftFarImg, setLeftFarImg] = useState();
  const [leftMedImg, setLeftMedImg] = useState();
  const [mainImg, setMainImg] = useState();
  const [rightMedImg, setRightMedImg] = useState();
  const [rightFarImg, setRightFarImg] = useState();
  const [currentMainImgIndex, setCurrentMainImgIndex] = useState(0);

  // const [index, setIndex] = useState(0);
  // const [aboutIndex, setAboutIndex] = useState(0);
  const [displayArray, setDisplayArray] = useState([]);
  const [introP1Finished, setIntroP1Finished] = useState(false);
  const [introP2Finished, setIntroP2Finished] = useState(false);

  const [hideNavbar, setHideNavbar] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setHideNavbar(true);
      } else {
        setHideNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const knowledgeBaseRef = useRef(null);
  const diplomasRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (section) => {
    let yOffset;
    if (section != projectsRef) {
      yOffset = -64; // 3rem = 3 * 16px = 48px
    } else {
      yOffset = -96; // 3rem = 3 * 16px = 48px
    }
    const y =
      section.current.getBoundingClientRect().top +
      window.pageYOffset +
      yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  emailjs.init("Hn-_j80QDPViVCXmb");

  function sendEmail(e) {
    e.preventDefault();
    const userName = e.target.elements.user_name.value;
    const userEmail = e.target.elements.user_email.value;

    if (!userName || !userEmail) {
      alert("Both name and email are required.");
      return;
    }
    emailjs.sendForm("service_bg33kyh", "template_jydwx8a", e.target).then(
      (result) => {
        alert("Email sent successfully");
        e.target.elements.message.value = "";
      },
      (error) => {
        alert("Failed to send email");
      }
    );
  }

  //On page load, start generating random numbers and adding them to page, if the number happens to be the next number
  //in the 'about' var, make it bigger and gold
  useEffect(() => {
    if (introP1Finished || introP2Finished) {
      return;
    }
    const timer = setInterval(() => {
      let randomLetter = letters[Math.floor(Math.random() * letters.length)];
      if (about[aboutIndex] === " ") {
        aboutIndex++;
      }
      if (aboutIndex === 0) {
        randomLetter = "m";
      }
      if (randomLetter === about[aboutIndex].toLowerCase()) {
        aboutIndex++;

        setDisplayArray((old) => {
          return [
            ...old,
            <p
              style={{ fontWeight: "bold", color: "gold", fontSize: "30px" }}
              className="goodLetter"
            >
              {randomLetter.toUpperCase()}
            </p>,
          ];
        });
      } else {
        setDisplayArray((old) => [
          ...old,
          <p className="badLetter">{randomLetter}</p>,
        ]);
      }
      index++;

      if (aboutIndex === about.length - 1) {
        setIntroP1Finished(true);
        clearInterval(timer);
      }
    }, 10);
    return () => clearInterval(timer);
  }, []);

  //once all the 'about' letters are on the screen and in gold, fade out the random numbers
  useEffect(() => {
    console.log("first useEffect Triggered");
    if (introP1Finished) {
      const elements = document.querySelectorAll(".badLetter");
      elements.forEach((element) => {
        element.style.opacity = "0";
      });
      setTimeout(() => {
        setIntroP2Finished(true);
      }, 2500);
    }
  }, [introP1Finished]);

  //once the badLetters are faded out, fade out the gold letters and fade in the 'about' string and 'continue' button
  useEffect(() => {
    console.log("second useEffect triggered");
    if (introP2Finished) {
      const elements = document.querySelectorAll(".goodLetter");
      elements.forEach((element) => {
        element.style.opacity = "0";
      });
      setTimeout(() => {
        const about = document.getElementById("about");
        about.style.display = "block";
        about.style.opacity = "1";
        const div = document.getElementById("main-about");
        div.style.display = "flex";
        div.style.justifyContent = "center";
        div.style.alignItems = "center";
        div.style.flexDirection = "column";
        const allLetters = document.querySelectorAll(".goodLetter, .badLetter");
        allLetters.forEach((letter) => (letter.style.display = "none"));
        const button = document.getElementById("enter-button");
        button.style.display = "block";

        setTimeout(() => {
          button.style.opacity = "1";
        }, 1000);
      }, 2000);
    }
  }, [introP2Finished]);

  //load the src's of the images in the folder that matches the selected Project
  useEffect(() => {
    const loadImages = async () => {
      const load = [];
      let imageExists = true;
      for (let i = 1; imageExists; i++) {
        try {
          const imgModule = await import(
            `../public/images/projects/${displayProject}/${i}.png`
          );
          load.push(imgModule.default);
        } catch (error) {
          console.log("upload finished");
          imageExists = false;
        }
      }
      setLoadedPhotos(load);
    };
    loadImages();
  }, [displayProject]);

  //set the default photos in the photo gallery when a new project is selected
  useEffect(() => {
    setLeftFarImg("");
    setLeftMedImg();
    setMainImg(loadedPhotos[0]);
    setRightMedImg(loadedPhotos[1]);
    setRightFarImg(loadedPhotos[2]);
  }, [loadedPhotos]);

  //the arrow buttons on the sides of the main photo in the gallery change currentMainImgIndex, this useEffect changes
  //all the photos based on that number
  useEffect(() => {
    if (currentMainImgIndex >= 2) {
      setLeftFarImg(loadedPhotos[currentMainImgIndex - 2]);
    } else {
      setLeftFarImg("");
    }
    if (currentMainImgIndex >= 1) {
      setLeftMedImg(loadedPhotos[currentMainImgIndex - 1]);
    } else {
      setLeftMedImg("");
    }

    setMainImg(loadedPhotos[currentMainImgIndex]);

    if (currentMainImgIndex < loadedPhotos.length - 1) {
      setRightMedImg(loadedPhotos[currentMainImgIndex + 1]);
    } else {
      setRightMedImg("");
    }
    if (currentMainImgIndex < loadedPhotos.length - 2) {
      setRightFarImg(loadedPhotos[currentMainImgIndex + 2]);
    } else {
      setRightFarImg("");
    }
  }, [currentMainImgIndex]);

  return (
    <>
      <div id="body">
        <div id="navbar" className={`${hideNavbar ? "hide" : null}`}>
          <div id="navbar-btns">
            <p onClick={() => scrollToSection(knowledgeBaseRef)}>
              My Knowledge Base
            </p>
            <p>|</p>
            <p onClick={() => scrollToSection(diplomasRef)}>My Diplomas</p>
            <p>|</p>
            <p onClick={() => scrollToSection(projectsRef)}>My Projects</p>
            <p>|</p>
            <p onClick={() => scrollToSection(contactRef)}>Contact Me</p>
          </div>
        </div>
        <div id="main-about" className="">
          {displayArray}
          <p id="about">My name is Garyk Simpson and I am a web developer.</p>
          <button
            id="enter-button"
            onClick={() => scrollToSection(knowledgeBaseRef)}
          >
            Continue
          </button>
        </div>
        <div id="knowledge-base" className="container" ref={knowledgeBaseRef}>
          <h2>My Knowledge Base</h2>
          <div className="innerContainer">
            <KnowledgeCard
              header="Languages"
              images={["javascript", "html-5", "css-3", "python"]}
            />
            <KnowledgeCard
              header="Tools / Libraries"
              images={[
                "nodejs",
                "npm",
                "react",
                "react-router",
                "sqlite",
                "github",
                "figma",
                "bootstrap",
              ]}
            />
            <KnowledgeCard
              header="Frameworks"
              images={["create-react-app", "django", "vitejs"]}
            />
          </div>
        </div>
        <div id="diploma-gallery" className="container" ref={diplomasRef}>
          <h2>My Diplomas</h2>
          <div className="innerContainer">
            <div className="diplomaCard">
              <h3>Harvard CS50x</h3>
              <img
                src="/images/diplomas/cs50x.png"
                width="200px"
                height="120px"
              />
            </div>
            <div className="diplomaCard">
              <h3>Codecademy Front End Developer</h3>
              <img
                src="/images/diplomas/codecademy.webp"
                width="200px"
                height="120px"
              />
            </div>
            <div className="diplomaCard">
              <h3>Harvard CS50w</h3>
              <img src={harvardCS50w} width="200px" height="120px" />
            </div>
          </div>
        </div>
        <div id="photo-gallery" ref={projectsRef}>
          <h2>Projects</h2>
          <div id="project-buttons" className="container">
            {projects.map((project) => {
              return (
                <div
                  key={project}
                  className="project-button-card"
                  onClick={() => {
                    setDisplayProject(project);
                    setCurrentMainImgIndex(0);
                  }}
                >
                  <h2 className="project-img-header">{project}</h2>
                  <img
                    src={`../public/images/projects/${project}/1.png`}
                    alt="Project-Profile"
                    width="200px"
                  />
                  {displayProject === project && (
                    <img src="../public/images/icons/caret-up-fill.svg" />
                  )}
                </div>
              );
            })}
          </div>
          <div id="project-gallery">
            <h2 className="project-header">
              {displayProject.charAt(0).toUpperCase() + displayProject.slice(1)}
            </h2>
            <div id="project-photos">
              <figure id="left-far-img">
                {leftFarImg ? (
                  <img src={`..${leftFarImg}`} />
                ) : (
                  <div className="imagePlaceholderFar"></div>
                )}
              </figure>
              <figure id="left-med-img">
                {leftMedImg ? (
                  <img src={`..${leftMedImg}`} />
                ) : (
                  <div className="imagePlaceholderMed"></div>
                )}
              </figure>
              <div id="main-photo-background">
                <button
                  className="mybtn"
                  onClick={() => {
                    if (currentMainImgIndex > 0) {
                      setCurrentMainImgIndex(currentMainImgIndex - 1);
                    }
                  }}
                  style={{ opacity: leftMedImg ? null : "0.5" }}
                >
                  <img src="../public/images/icons/caret-left-fill.svg" />
                </button>
                <figure id="main-img">
                  {mainImg ? (
                    <img src={`..${mainImg}`} width="200px" />
                  ) : (
                    <div className="imagePlaceholder"></div>
                  )}
                </figure>
                <button
                  className="mybtn"
                  onClick={() => {
                    if (currentMainImgIndex < loadedPhotos.length - 1) {
                      setCurrentMainImgIndex(currentMainImgIndex + 1);
                    }
                  }}
                  style={{ opacity: rightMedImg ? null : "0.5" }}
                >
                  <img src={CaretRight} />
                </button>
              </div>
              <figure id="right-med-img">
                {rightMedImg ? (
                  <img src={`..${rightMedImg}`} width="200px" />
                ) : (
                  <div className="imagePlaceholderMed"></div>
                )}
              </figure>
              <figure id="right-far-img">
                {rightFarImg ? (
                  <img src={`..${rightFarImg}`} width="200px" />
                ) : (
                  <div className="imagePlaceholderFar"></div>
                )}
              </figure>
            </div>
            <p id="project-description">
              {descriptions[displayProject]
                ? descriptions[displayProject]
                : null}
            </p>
            {displayProject === "ponderosa" && (
              <p>
                Try it yourself:{" "}
                <a href="https://coruscating-concha-5396c0.netlify.app/">
                  Ponderosa
                </a>
              </p>
            )}
          </div>
          <div id="contact-form-div" ref={contactRef}>
            <form id="contact-form" onSubmit={sendEmail}>
              <h4>Contact Me</h4>
              <div className="name-and-email">
                <div className="input">
                  <label>Name</label>
                  <input type="text" name="user_name"></input>
                </div>
                <div className="input">
                  <label>Email</label>
                  <input type="email" name="user_email"></input>
                </div>
              </div>
              <label>Message</label>
              <textarea name="message"></textarea>
              <input type="submit" value="Send"></input>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
