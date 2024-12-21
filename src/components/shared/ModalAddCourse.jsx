import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouteLoaderData } from "react-router-dom";
import { createCourse } from "../../utils/http";

const ModalAddCourse = forwardRef(({}, ref) => {
  const token = useRouteLoaderData("root");
  const [isLoading, setIsLoading] = useState(false);
  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());
    formData.token = token;
    setIsLoading(true);
    try {
      const data = await createCourse(formData);
      toast.success(data.message, {
        position: "bottom-right",
      });
    } catch (error) {
      console.log(error);
      const errorData = error.response.data;
      toast.error(errorData.message, {
        position: "bottom-right",
      });
    }
    setIsLoading(false);
  };
  return (
    <>
      <ToastContainer />
      <dialog ref={dialog} className="p-6 rounded-lg">
        <ToastContainer />
        <h1 className="text-xl font-bold mb-8">Thêm khóa học</h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 uppercase text-sm font-semibold">
            Tiêu đề
          </label>
          <input
            className="block min-w-96 px-4 py-1.5 rounded-2xl bg-gray-100"
            name="title"
          />
          <label className="mt-4 block mb-2 uppercase text-sm font-semibold">
            Mô tả
          </label>
          <textarea
            className="block min-w-96 px-4 py-1.5 rounded-2xl bg-gray-100"
            name="description"
          />
          <label className="mt-4 block mb-2 uppercase text-sm font-semibold">
            Trình độ
          </label>
          <select
            className="px-4 py-2 border-1 mt-2 w-full border-custom-neutral-2 bg-gray-100 rounded-lg block"
            name="level"
          >
            <option value={0}>N5</option>
            <option value={1}>N4</option>
            <option value={2}>N3</option>
            <option value={3}>N2</option>
            <option value={4}>N1</option>
          </select>
          <div className="flex items-center mt-6 justify-end">
            <button
              type="button"
              className="text-lg font-semibold px-6 py-2 rounded-xl  hover:bg-theme-yellow hover:text-theme-white mr-4"
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

export default ModalAddCourse;
