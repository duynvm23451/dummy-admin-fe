import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { createSearchParams, useNavigate } from "react-router-dom";

const Pagination = ({ pagination, navigatePath }) => {
  const navigate = useNavigate();
  const changePage = (pageNumber) => {
    navigate({
      pathname: navigatePath,
      search: createSearchParams({ page: pageNumber }).toString(),
    });
  };
  return (
    <ul className="flex items-center">
      <li>
        <MdArrowBackIos
          onClick={() => changePage(pagination.current - 1)}
          className="w-4 h-4 mr-4 cursor-pointer"
          hidden={pagination.isLeft}
        />
      </li>
      {pagination.items.map((el) => (
        <li key={el}>
          <button
            disabled={el == pagination.current || el == "..."}
            className={`w-12 h-12 flex justify-center items-center rounded-xl  hover:text-white cursor-pointer hover:bg-theme-yellow ${
              el == pagination.current
                ? "bg-theme-red text-white"
                : "text-theme-yellow"
            }`}
            onClick={() => changePage(el)}
          >
            {el}
          </button>
        </li>
      ))}
      <li>
        <MdArrowForwardIos
          className="w-4 h-4 ml-4 cursor-pointer"
          hidden={pagination.isRight}
          onClick={() => changePage(pagination.current + 1)}
        />
      </li>
    </ul>
  );
};

export default Pagination;
