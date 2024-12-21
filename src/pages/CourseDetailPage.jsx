import React, { useMemo, useRef, useState } from "react";
import { useParams, useRouteLoaderData } from "react-router-dom";
import { deleteLesson, deleteModule, getCourseDetail } from "../utils/http";
import useGetData from "../hooks/useGetData";
import { HiMiniPlusCircle } from "react-icons/hi2";
import { CgMathPlus } from "react-icons/cg";
import { FaTrashAlt } from "react-icons/fa";
import ModalAddModule from "../components/shared/ModalAddModule";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalAddLesson from "../components/shared/ModalAddLesson";

const CourseDetailPage = () => {
  const dialogCreateModule = useRef();
  const dialogCreateLesson = useRef();

  const params = useParams();
  const token = useRouteLoaderData("root");
  const queryParams = useMemo(
    () => ({
      id: params.id,
      token,
    }),
    [params, token]
  );
  const { isLoading, error, data, refetch } = useGetData(
    getCourseDetail,
    queryParams
  );

  const handleClickCreateMewModule = () => {
    dialogCreateModule.current.open();
  };

  const [selectedModuleId, setSelectedModuleId] = useState(null);

  const handleClickCreateLesson = (moduleId) => {
    setSelectedModuleId(moduleId);
    dialogCreateLesson.current.open();
  };

  const handleClickDeleteModule = async (id) => {
    try {
      const data = await deleteModule(id, token);
      toast.success(data.message, {
        position: "bottom-right",
      });
      refetch();
    } catch (error) {
      console.error(error);
      const errorData = error.response?.data;
      toast.error(errorData?.message || "An error occurred", {
        position: "bottom-right",
      });
    }
  };

  const handleModuleCreated = () => {
    refetch(); // Refresh data after a module is created
  };

  const handleClickDeleteLesson = async (id) => {
    try {
      const data = await deleteLesson(id, token);
      toast.success(data.message, {
        position: "bottom-right",
      });
      refetch();
    } catch (error) {
      console.error(error);
      const errorData = error.response?.data;
      toast.error(errorData?.message || "An error occurred", {
        position: "bottom-right",
      });
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!data) {
    return <p>No job data found</p>;
  }
  return (
    <div className="mt-4 mx-8">
      <ToastContainer />

      <ModalAddModule
        ref={dialogCreateModule}
        courseId={params.id}
        onModuleCreated={handleModuleCreated}
      />
      <div className="flex">
        <div className="bg-theme-gray  p-4 rounded-xl min-w-72 mr-6">
          <h3 className="font-semibold">Tiêu đề</h3>
          <div className="mt-2 bg-theme-white p-2 rounded-lg">{data.title}</div>
        </div>
        <div className="bg-theme-gray p-4 rounded-xl flex-grow-0 mr-6">
          <h3 className="font-semibold">Trình độ</h3>{" "}
          <div className="mt-2 bg-theme-white p-2 rounded-lg">{data.level}</div>
        </div>
        <div className="bg-theme-gray p-4 rounded-xl flex-grow">
          <h3 className="font-semibold">Mô tả</h3>
          <div className="mt-2 bg-theme-white p-2 rounded-lg">
            {data.description}
          </div>
        </div>
      </div>
      <div className="flex mt-6 items-center justify-between">
        <h2 className="text-xl  font-bold">Các chương</h2>
        <button
          onClick={handleClickCreateMewModule}
          className="mr-8 px-8 flex items-center bg-theme-red py-2 h-fit rounded-xl text-theme-white font-semibold text-lg"
        >
          <HiMiniPlusCircle className="text-3xl mr-2" />
          Tạo chương học mới
        </button>
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-6">
        {data.modules.map((module) => (
          <li className="p-4 border-2 rounded-xl">
            <ModalAddLesson
              ref={dialogCreateLesson}
              moduleId={selectedModuleId}
              onModuleCreated={handleModuleCreated}
            />
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <h3 className="font-semibold mr-4">{module.name}</h3>
                <button
                  className="p-2 bg-theme-red rounded-lg"
                  onClick={() => handleClickDeleteModule(module.id)}
                >
                  <FaTrashAlt className="text-theme-white" />
                </button>
              </div>

              <button
                onClick={() => handleClickCreateLesson(module.id)}
                className="mr-8 px-8 text-sm flex items-center bg-theme-pink py-2 h-fit rounded-xl text-theme-black font-semibold"
              >
                Tạo bài giảng mới
              </button>
            </div>
            {module.lessons.length == 0 && (
              <p className="text-center mt-2">Không có bài giảng nào</p>
            )}
            <ul className="px-8 mt-2">
              {module.lessons.map((lesson) => (
                <li className="py-2 flex items-center">
                  <CgMathPlus className="w-6 h-6 mr-4" />
                  <h2 className="mr-4">{lesson.name}</h2>
                  <div className="flex-1 flex justify-end mr-8">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm underline inline-block text-theme-yellow"
                      href={lesson.video_url}
                    >
                      Link Video
                    </a>
                  </div>

                  <button
                    onClick={() => handleClickDeleteLesson(lesson.id)}
                    className="bg-theme-gray uppercase text-sm font-semibold flex py-1.5 px-3 rounded-lg items-center"
                  >
                    <FaTrashAlt className="mr-2 mb-0.5" />
                    Xóa
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseDetailPage;
