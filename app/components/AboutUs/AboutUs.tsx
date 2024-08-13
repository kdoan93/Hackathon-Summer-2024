import React from "react";

function AboutUs() {
  return (
    <div className="flex flex-col items-center gap-7">
      <div className="flex flex-col items-center">
        <h1 className="page-header p-1rem"> About Sustain</h1>
        <a
          href="https://github.com/kdoan93/Hackathon-Summer-2024"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.75em"
            height="1.75em"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
            ></path>
          </svg>
        </a>
        <div className="flex flex-col items-center justify-center w-1/2 h-48 text-lg">
          <p>
            Sustain utilizes Google Gemini's API to provide users with detailed
            calorie and nutrition facts for meals, accessible through both text
            input and voice-to-text functionality. Users can store their meal
            information in a personalized Dashboard, where they can view all
            previous meals along with a dynamic graph visualizing their
            nutritional intake over time. Additionally, the platform offers a
            BMI calculator, allowing users to input their weight and height for
            personalized health insights. The site was developed by a dedicated
            team of four developers. Check out their socials below.
          </p>
        </div>
      </div>
      <div className=" flex flex-row">
        {/* Website info */}
        {/* Cory */}
        <div className="card bg-base-100 w-96 shadow-xl bg-red">
          <figure className="px-10 pt-10">
            <img src="/images/cory.jpeg" alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Cory Campbell</h2>
            <p>Where to checkout Cory:</p>
            <div className="card-actions">
              {/* <button className="btn btn-primary">Buy Now</button> */}
              <a
                href="https://www.linkedin.com/in/cory-campbell-67694b2a5/"
                target="_blank"
              >
                {/* Linkedin */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.75em"
                  height="1.75em"
                  viewBox="0 0 256 256"
                >
                  <g fill="none">
                    <rect width={256} height={256} fill="#fff" rx={60}></rect>
                    <rect
                      width={256}
                      height={256}
                      fill="#0a66c2"
                      rx={60}
                    ></rect>
                    <path
                      fill="#fff"
                      d="M184.715 217.685h29.27a4 4 0 0 0 4-3.999l.015-61.842c0-32.323-6.965-57.168-44.738-57.168c-14.359-.534-27.9 6.868-35.207 19.228a.32.32 0 0 1-.595-.161V101.66a4 4 0 0 0-4-4h-27.777a4 4 0 0 0-4 4v112.02a4 4 0 0 0 4 4h29.268a4 4 0 0 0 4-4v-55.373c0-15.657 2.97-30.82 22.381-30.82c19.135 0 19.383 17.916 19.383 31.834v54.364a4 4 0 0 0 4 4M38 59.628c0 11.864 9.767 21.626 21.632 21.626c11.862-.001 21.623-9.769 21.623-21.631C81.253 47.761 71.491 38 59.628 38C47.762 38 38 47.763 38 59.627m6.959 158.058h29.307a4 4 0 0 0 4-4V101.66a4 4 0 0 0-4-4H44.959a4 4 0 0 0-4 4v112.025a4 4 0 0 0 4 4"
                    ></path>
                  </g>
                </svg>
              </a>
              <a href="https://github.com/CoryCampbell" target="_blank">
                {/* github */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.75em"
                  height="1.75em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="white"
                    d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        {/* Kenny */}
        <div className="card bg-base-100 w-96 shadow-xl">
          <figure className="px-10 pt-10">
            <img src="/images/kenny.jpeg" alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Kenny Doan</h2>
            <p>Where to checkout Kenny:</p>
            <div className="card-actions">
              <a href="https://www.linkedin.com/in/kdoan93/" target="_blank">
                {/* Linkedin */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.75em"
                  height="1.75em"
                  viewBox="0 0 256 256"
                >
                  <g fill="none">
                    <rect width={256} height={256} fill="#fff" rx={60}></rect>
                    <rect
                      width={256}
                      height={256}
                      fill="#0a66c2"
                      rx={60}
                    ></rect>
                    <path
                      fill="#fff"
                      d="M184.715 217.685h29.27a4 4 0 0 0 4-3.999l.015-61.842c0-32.323-6.965-57.168-44.738-57.168c-14.359-.534-27.9 6.868-35.207 19.228a.32.32 0 0 1-.595-.161V101.66a4 4 0 0 0-4-4h-27.777a4 4 0 0 0-4 4v112.02a4 4 0 0 0 4 4h29.268a4 4 0 0 0 4-4v-55.373c0-15.657 2.97-30.82 22.381-30.82c19.135 0 19.383 17.916 19.383 31.834v54.364a4 4 0 0 0 4 4M38 59.628c0 11.864 9.767 21.626 21.632 21.626c11.862-.001 21.623-9.769 21.623-21.631C81.253 47.761 71.491 38 59.628 38C47.762 38 38 47.763 38 59.627m6.959 158.058h29.307a4 4 0 0 0 4-4V101.66a4 4 0 0 0-4-4H44.959a4 4 0 0 0-4 4v112.025a4 4 0 0 0 4 4"
                    ></path>
                  </g>
                </svg>
              </a>
              <a href="https://github.com/kdoan93" target="_blank">
                {/* github */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.75em"
                  height="1.75em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="white"
                    d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        {/* Kyrene */}
        <div className="card bg-base-100 w-96 shadow-xl">
          <figure className="px-10 pt-10">
            <img src="/images/kyrene.jpg" alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Kyrene Flores</h2>
            <p>Where to checkout Kyrene:</p>
            <div className="card-actions">
              <a
                href="https://www.linkedin.com/in/kyreneflores/"
                target="_blank"
              >
                {/* Linkedin */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.75em"
                  height="1.75em"
                  viewBox="0 0 256 256"
                >
                  <g fill="none">
                    <rect width={256} height={256} fill="#fff" rx={60}></rect>
                    <rect
                      width={256}
                      height={256}
                      fill="#0a66c2"
                      rx={60}
                    ></rect>
                    <path
                      fill="#fff"
                      d="M184.715 217.685h29.27a4 4 0 0 0 4-3.999l.015-61.842c0-32.323-6.965-57.168-44.738-57.168c-14.359-.534-27.9 6.868-35.207 19.228a.32.32 0 0 1-.595-.161V101.66a4 4 0 0 0-4-4h-27.777a4 4 0 0 0-4 4v112.02a4 4 0 0 0 4 4h29.268a4 4 0 0 0 4-4v-55.373c0-15.657 2.97-30.82 22.381-30.82c19.135 0 19.383 17.916 19.383 31.834v54.364a4 4 0 0 0 4 4M38 59.628c0 11.864 9.767 21.626 21.632 21.626c11.862-.001 21.623-9.769 21.623-21.631C81.253 47.761 71.491 38 59.628 38C47.762 38 38 47.763 38 59.627m6.959 158.058h29.307a4 4 0 0 0 4-4V101.66a4 4 0 0 0-4-4H44.959a4 4 0 0 0-4 4v112.025a4 4 0 0 0 4 4"
                    ></path>
                  </g>
                </svg>
              </a>
              <a href="https://github.com/KyreneAF" target="_blank">
                {/* github */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.75em"
                  height="1.75em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="white"
                    d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        {/* Kevin */}
        <div className="card bg-base-100 w-96 shadow-xl">
          <figure className="px-10 pt-10">
            <img src="/images/kevin.png" alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Kevin Won</h2>
            <p>Where to checkout Kevin:</p>
            <div className="card-actions">
              <a href="https://www.linkedin.com/in/kevinwon30/" target="_blank">
                {/* Linkedin */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.75em"
                  height="1.75em"
                  viewBox="0 0 256 256"
                >
                  <g fill="none">
                    <rect width={256} height={256} fill="#fff" rx={60}></rect>
                    <rect
                      width={256}
                      height={256}
                      fill="#0a66c2"
                      rx={60}
                    ></rect>
                    <path
                      fill="#fff"
                      d="M184.715 217.685h29.27a4 4 0 0 0 4-3.999l.015-61.842c0-32.323-6.965-57.168-44.738-57.168c-14.359-.534-27.9 6.868-35.207 19.228a.32.32 0 0 1-.595-.161V101.66a4 4 0 0 0-4-4h-27.777a4 4 0 0 0-4 4v112.02a4 4 0 0 0 4 4h29.268a4 4 0 0 0 4-4v-55.373c0-15.657 2.97-30.82 22.381-30.82c19.135 0 19.383 17.916 19.383 31.834v54.364a4 4 0 0 0 4 4M38 59.628c0 11.864 9.767 21.626 21.632 21.626c11.862-.001 21.623-9.769 21.623-21.631C81.253 47.761 71.491 38 59.628 38C47.762 38 38 47.763 38 59.627m6.959 158.058h29.307a4 4 0 0 0 4-4V101.66a4 4 0 0 0-4-4H44.959a4 4 0 0 0-4 4v112.025a4 4 0 0 0 4 4"
                    ></path>
                  </g>
                </svg>
              </a>
              <a href="https://github.com/kwongit" target="_blank">
                {/* github */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.75em"
                  height="1.75em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="white"
                    d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
