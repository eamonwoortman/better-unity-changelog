const Chevron = ({ expanded }: { expanded: boolean }) => {
    if (!expanded) {
      return (
          <div className="rounded py-1 px-1 select-none cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 text-gray-400 parent-hover:text-blue hover:text-indigo-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
      );
    } else {
      return (
        <div className="rounded py-1 px-1 select-none cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5 text-gray-400 parent-hover:text-blue hover:text-indigo-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      );
    }
  };
  export default Chevron