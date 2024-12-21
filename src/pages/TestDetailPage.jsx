import React, { useMemo, useRef, useState } from "react";
import { useParams, useRouteLoaderData } from "react-router-dom";
import useGetData from "../hooks/useGetData";
import { deleteQuestion, getTestDetail } from "../utils/http";
import { HiMiniPlusCircle } from "react-icons/hi2";
import ModalAddQuestion from "../components/shared/ModalAddQuestion";
import { FaTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalAddAnswer from "../components/shared/ModalAddAnswer";

const TestDetailPage = () => {
  const dialogAddQuestion = useRef();
  const dialogAddAnswer = useRef();
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
    getTestDetail,
    queryParams
  );

  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const handleClickAddAnswer = (id) => {
    setSelectedQuestionId(id);
    dialogAddAnswer.current.open();
  };

  const handleClickAddQuestion = () => {
    dialogAddQuestion.current.open();
  };

  const handleClickDeleteQuestion = async (id) => {
    try {
      const data = await deleteQuestion(id, token);
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
  console.log(data);
  if (!data) {
    return <p>No data found</p>;
  }
  return (
    <div className="mt-4 mx-8">
      <ToastContainer />

      <ModalAddQuestion ref={dialogAddQuestion} testId={params.id} />
      <div className="flex justify-between items-center">
        <div className="flex w-1/2">
          <div className="bg-theme-gray  p-4 rounded-xl min-w-72 mr-6">
            <h3 className="font-semibold">Tên bài kiểm tra</h3>
            <div className="mt-2 bg-theme-white p-2 rounded-lg">
              {data.name}
            </div>
          </div>
          <div className="bg-theme-gray p-4 rounded-xl flex-grow-0 mr-6">
            <h3 className="font-semibold">Trình độ</h3>{" "}
            <div className="mt-2 bg-theme-white p-2 rounded-lg">
              {data.level}
            </div>
          </div>
          <div className="bg-theme-gray p-4 rounded-xl flex-grow">
            <h3 className="font-semibold">Điểm đỗ (số câu hỏi)</h3>
            <div className="mt-2 bg-theme-white p-2 rounded-lg">
              {data.min_pass_scroce}
            </div>
          </div>
        </div>
        <button
          onClick={handleClickAddQuestion}
          className="mr-8 px-8 flex items-center bg-theme-red py-2 h-fit rounded-xl text-theme-white font-semibold text-lg"
        >
          <HiMiniPlusCircle className="text-3xl mr-2" />
          Tạo câu hỏi mới
        </button>
      </div>

      <div className="flex mt-6 items-center justify-between">
        <h2 className="text-xl  font-bold">Các câu hỏi</h2>
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-6">
        {data.questions.map((question) => (
          <li className="p-4 border-2 rounded-xl" key={question.id}>
            <ModalAddAnswer ref={dialogAddAnswer} questionId={question.id} />
            <div className="flex items-center justify-between">
              <h3 className="font-semibold mr-4">{question.title}</h3>
              <div className="flex">
                {question.question_answer.length == 0 && (
                  <button
                    className="p-2 bg-theme-red rounded-lg"
                    onClick={() => handleClickAddAnswer(question.id)}
                  >
                    <HiMiniPlusCircle className="text-theme-white" />
                  </button>
                )}
                <button
                  onClick={() => handleClickDeleteQuestion(question.id)}
                  className="bg-theme-gray ml-4 uppercase text-sm font-semibold flex py-1.5 px-3 rounded-lg items-center"
                >
                  <FaTrashAlt className="mr-2 mb-0.5" />
                  Xóa
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-3 mt-4">
              {question.question_answer.map((answer) => (
                <div
                  key={answer.id}
                  className={`px-3 py-2 border-2 border-dotted rounded-xl ${
                    answer.is_correct == 1 &&
                    "border-theme-pink text-theme-red font-semibold bg-theme-beige"
                  }`}
                >
                  {answer.answer}
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestDetailPage;
