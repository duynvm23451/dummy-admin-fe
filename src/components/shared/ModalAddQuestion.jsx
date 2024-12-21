import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouteLoaderData } from "react-router-dom";
import { createModule, createQuestion } from "../../utils/http";

const ModalAddQuestion = forwardRef(({ testId, onQuestionCreated }, ref) => {
  const token = useRouteLoaderData("root");
  const [isLoading, setIsLoading] = useState(false);
  const dialog = useRef();

  useImperativeHandle(ref, () => ({
    open() {
      dialog.current.showModal();
    },
  }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());
    formData.token = token;

    formData.testId = testId;
    console.log(formData);
    setIsLoading(true);
    try {
      const data = await createQuestion(formData);
      toast.success(data.message, {
        position: "bottom-right",
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
      const errorData = error.response?.data;
      toast.error(errorData?.message || "An error occurred", {
        position: "bottom-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <dialog ref={dialog} className="p-6 rounded-lg">
        <h1 className="text-xl font-bold mb-8">Thêm câu hỏi</h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 uppercase text-sm font-semibold">
            Đề bài
          </label>
          <input
            className="block min-w-96 px-4 py-1.5 rounded-2xl bg-gray-100"
            name="title"
          />

          <div className="flex items-center mt-6 justify-end">
            <button
              type="button"
              className="text-lg font-semibold px-6 py-2 rounded-xl hover:bg-theme-yellow hover:text-theme-white mr-4"
              onClick={() => dialog.current.close()}
            >
              Đóng
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="text-lg font-semibold rounded-xl px-6 py-2 text-white bg-theme-red border-none h-fit"
            >
              {!isLoading ? "Thêm" : "Loading..."}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
});

export default ModalAddQuestion;
