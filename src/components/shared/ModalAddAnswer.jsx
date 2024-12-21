import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouteLoaderData } from "react-router-dom";
import { createQuestion, createQuestionAnswer } from "../../utils/http";

const answerChoices = ["A", "B", "C", "D"];

const ModalAddAnswer = forwardRef(({ questionId }, ref) => {
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
    formData.questionId = questionId;

    setIsLoading(true);

    try {
      const questions = Object.entries(formData).filter(
        ([key]) => key.startsWith("question") && key != "questionId"
      );

      for (const [key, value] of questions) {
        const payload = {
          token: formData.token,
          questionId: formData.questionId,
          answer: value,
          is_correct: key.endsWith(formData.correct),
        };

        await createQuestionAnswer(payload);
      }

      toast.success("All answers were added successfully!", {
        position: "bottom-right",
      });

      dialog.current.close();
      window.location.reload(); // Reload the page to reflect changes
    } catch (error) {
      console.error(error);
      const errorData = error.response?.data;
      toast.error(
        errorData?.message || "An error occurred while adding answers",
        {
          position: "bottom-right",
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <dialog ref={dialog} className="p-6 rounded-lg">
        <h1 className="text-xl font-bold mb-8">Thêm các câu trả lời</h1>
        <form onSubmit={handleSubmit}>
          {answerChoices.map((el) => (
            <div key={el} className="flex items-center my-6">
              <h4 className="font-semibold mr-4">{el}</h4>
              <input
                className="block min-w-96 px-4 py-1.5 rounded-2xl bg-gray-100"
                name={"question" + el}
                required
              />
            </div>
          ))}
          <label className="mt-4 block mb-2 uppercase text-sm font-semibold">
            Câu trả lời đúng
          </label>
          <select
            className="px-4 py-2 border-1 mt-2 w-full border-custom-neutral-2 bg-gray-100 rounded-lg block"
            name="correct"
            required
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
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

export default ModalAddAnswer;
