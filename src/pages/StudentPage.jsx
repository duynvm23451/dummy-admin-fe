import React, { useMemo } from "react";
import renderPaginationItems from "@/utils/pagination";
import { useRouteLoaderData, useSearchParams } from "react-router-dom";
import { getStudents } from "../utils/http";
import useGetData from "../hooks/useGetData";
import Pagination from "../components/shared/Pagination";
import { formatTimestampToDate } from "../utils/helper";

const StudentPage = () => {
  const token = useRouteLoaderData("root");
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const size = searchParams.get("size") || 10;
  const queryParams = useMemo(
    () => ({
      page,
      size,
      token,
    }),
    [page, size, token]
  );
  const { isLoading, error, data } = useGetData(getStudents, queryParams);
  return (
    <div>
      <div className="mx-8 mt-4">
        <div className="flex justify-between items-center">
          <div className="mb-4">
            <h1 className="text-2xl font-bold">Tất cả người dùng</h1>
            <p className="text-lg text-gray-600 mt-2">
              Hiển thị {data && data.total} kết quả
            </p>
          </div>
        </div>
        <table className="w-full border-b-1 border-custom-neutral-2">
          <thead className="border-b-1 border-custom-neutral-2 border-b-2 border-theme-black">
            <tr>
              <th className="p-3 font-bold tracking-wide text-left">#</th>
              <th className="p-3 font-bold tracking-wide text-left uppercase text-sm">
                Họ và tên
              </th>
              <th className="p-3 font-bold tracking-wide text-left uppercase text-sm">
                email
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
                <tr key={el.id}>
                  <td className="px-3 py-4 tracking-wider font-semibold text-theme-red ">
                    <span className="px-3 p-1 bg-theme-pink rounded-lg">
                      {el.id}
                    </span>
                  </td>
                  <td className="px-3 py-4 tracking-wider max-w-48 font-semibold">
                    {el.name}
                  </td>
                  <td className="px-3 py-4 tracking-wider max-w-48">
                    {el.email}
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

export default StudentPage;
