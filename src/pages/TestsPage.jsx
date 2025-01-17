import React, { useMemo, useRef } from "react";
import renderPaginationItems from "@/utils/pagination";
import {
  useNavigate,
  useRouteLoaderData,
  useSearchParams,
} from "react-router-dom";
import Pagination from "../components/shared/Pagination";
import { formatTimestampToDate } from "../utils/helper";
import { getCourses, getTests } from "../utils/http";
import useGetData from "../hooks/useGetData";
import { HiMiniPlusCircle } from "react-icons/hi2";
import ModalAddCourse from "../components/shared/ModalAddCourse";
import ModalAddTest from "../components/shared/ModalAddTest";

const TestsPage = () => {
  const dialog = useRef();
  const navigate = useNavigate();
  const handleClick = () => {
    dialog.current.open();
  };
  const token = useRouteLoaderData("root");
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const size = searchParams.get("size") || 5;
  const queryParams = useMemo(
    () => ({
      page,
      size,
      token,
    }),
    [page, size, token]
  );
  const { isLoading, error, data } = useGetData(getTests, queryParams);

  if (!data) {
    return <p>No data</p>;
  }
  console.log(data);

  return (
    <div>
      <ModalAddTest ref={dialog} />
      <div className="mx-8 mt-4">
        <div className="flex justify-between items-center">
          <div className="mb-4 flex justify-between items-center w-full">
            <div>
              <h1 className="text-2xl font-bold">Tất cả bài kiểm tra</h1>
              <p className="text-lg text-gray-600 mt-2">
                Hiển thị {data && data.total} kết quả
              </p>
            </div>
            <button
              onClick={handleClick}
              className="mr-8 px-8 flex items-center bg-theme-red py-2 h-fit rounded-xl text-theme-white font-semibold text-lg"
            >
              <HiMiniPlusCircle className="text-3xl mr-2" />
              Tạo bài kiểm tra mới
            </button>
          </div>
        </div>
        <table className="w-full border-b-1 border-custom-neutral-2">
          <thead className="border-b-1 border-custom-neutral-2 border-b-2 border-theme-black">
            <tr>
              <th className="p-3 font-bold tracking-wide text-left">#</th>
              <th className="p-3 font-bold tracking-wide text-left uppercase text-sm">
                Tiêu đề
              </th>
              <th className="p-3 font-bold tracking-wide text-left uppercase text-sm">
                Trình độ
              </th>
              <th className="p-3 font-bold tracking-wide text-left uppercase text-sm">
                Thời gian làm bài ( phút )
              </th>
              <th className="p-3 font-bold tracking-wide text-left uppercase text-sm">
                Điểm đỗ
              </th>
              <th className="p-3 font-bold tracking-wide text-left uppercase text-sm">
                Ngày tạo
              </th>
            </tr>
          </thead>
          <tbody>
            {!error &&
              data &&
              data.data.map((el, index) => (
                <tr
                  key={el.id}
                  onClick={() => navigate("/tests/" + el.id)}
                  className="cursor-pointer"
                >
                  <td className="px-3 py-4 tracking-wider font-semibold text-theme-red ">
                    <span className="px-3 p-1 bg-theme-pink rounded-lg">
                      {el.id}
                    </span>
                  </td>
                  <td className="px-3 py-4 tracking-wider max-w-48 font-semibold">
                    {el.name}
                  </td>
                  <td className="px-3 py-4 tracking-wider max-w-48">
                    <span className="font-bold px-2.5 py-1.5 rounded-lg bg-theme-black text-white">
                      {el.level}
                    </span>
                  </td>
                  <td className="px-3 py-4 tracking-wider max-w-48 font-semibold">
                    {el.duration / 60}
                  </td>
                  <td className="px-3 py-4 tracking-wider max-w-48 font-semibold">
                    {el.min_pass_scroce}
                  </td>
                  <td className="px-3 py-4 tracking-wider text-theme-yellow">
                    {formatTimestampToDate(el.created_at)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {!error && data && (
        <div className="w-full flex justify-center mt-12">
          <Pagination
            navigatePath="/"
            pagination={renderPaginationItems(
              data.current_page,
              data.last_page
            )}
          />
        </div>
      )}
    </div>
  );
};

export default TestsPage;
