import "./Pagination.css";
import { useEffect, useState, useRef } from "react";

const Pagination = ({ totalPage = 1 , currentActivePage}) => {
  const [activePage, setActivePage] = useState(1);
  const [numberOfTotalPage, setNumberOfTotalPage] = useState(0);
  const activePageRef = useRef(null);
  const paginationContainerRef = useRef(null);

  useEffect(() => {
    setNumberOfTotalPage(totalPage <= 0 ? 1 : totalPage);
    setActivePage(1);
  }, [totalPage]);

  useEffect(()=>{
    currentActivePage(activePage);
  },[activePage, currentActivePage])

  useEffect(() => {
    if (!(activePageRef.current && paginationContainerRef.current)) {
      return;
    }
    const activeElement = activePageRef.current;
    const paginationContainer = paginationContainerRef.current;

    const containerRect = paginationContainer.getBoundingClientRect();
    const elementRect = activeElement.getBoundingClientRect();

    if (
      elementRect.left < containerRect.left ||
      elementRect.right > containerRect.right
    ) {
      activeElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activePage]);

  useEffect(() => {
    const paginationContainer = paginationContainerRef.current;
    if (paginationContainer) {
      const preventScroll = (e) => {
        e.preventDefault();
      };
      paginationContainer.addEventListener("scroll", preventScroll, {
        passive: false,
      });

      return () => {
        paginationContainer.removeEventListener("scroll", preventScroll);
      };
    }
  }, []);

  return (
    <div className="pagination_comp_main">
      <div className="pagination_comp_main_left_main">
        <button
          className="pagination_comp_main_back_btn"
          onClick={() => {
            setActivePage(() => 1);
          }}
          disabled={activePage === 1 || numberOfTotalPage <= 0}
          aria-label="Previous Page"
        >
          <span id="backSpan">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevrons-left"
            >
              <path d="m11 17-5-5 5-5" />
              <path d="m18 17-5-5 5-5" />
            </svg>
          </span>
        </button>
        <button
          className="pagination_comp_main_back_btn"
          onClick={() => {
            setActivePage((prev) => Math.max(prev - 1, 1));
          }}
          disabled={activePage === 1 || numberOfTotalPage <= 0}
          aria-label="Previous Page"
        >
          <span id="backSpan">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-left"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </span>
        </button>
      </div>
      <span className="pagination_comp_effect_blur_left"></span>
      <div
        className="pagination_comp_main_pages"
        style={{ display: "flex", overflow: "hidden" }}
        ref={paginationContainerRef}
      >
        {Array.from({ length: numberOfTotalPage }, (_, index) => {
          const currentPage = index + 1;

          return (
            <button
              key={currentPage}
              className="pagination_comp_main_page_btn"
              id={activePage === currentPage ? "activePage" : ""}
              ref={activePage === currentPage ? activePageRef : null}
              onClick={() => setActivePage(currentPage)}
              aria-label={`Page ${currentPage}`}
            >
              <p>{currentPage}</p>
            </button>
          );
        })}
      </div>
      <span className="pagination_comp_effect_blur_rigth"></span>
      <div className="pagination_comp_main_rigth_main">
        <button
          className="pagination_comp_main_next_btn"
          onClick={() => {
            setActivePage((prev) => Math.min(prev + 1, numberOfTotalPage));
          }}
          disabled={activePage === numberOfTotalPage || numberOfTotalPage <= 0}
          aria-label="Next Page"
        >
          <span id="nextSpan">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-right"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
        </button>
        <button
          className="pagination_comp_main_next_btn"
          onClick={() => {
            setActivePage(() => numberOfTotalPage);
          }}
          disabled={activePage === numberOfTotalPage || numberOfTotalPage <= 0}
          aria-label="Next Page"
        >
          <span id="nextSpan">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevrons-right"
            >
              <path d="m6 17 5-5-5-5" />
              <path d="m13 17 5-5-5-5" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
