import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouteLoaderData } from "react-router-dom";
import { createModule } from "../../utils/http";

const ModalAddModule = forwardRef(({ courseId, onModuleCreated }, ref) => {
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
    formData.courseId = courseId;
    setIsLoading(true);
    try {
      const data = await createModule(formData);
      toast.success(data.message, {
        position: "bottom-right",
      });
      dialog.current.close();
      if (onModuleCreated) {
        onModuleCreated(); // Trigger the callback to refresh data
      }
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
        <h1 className="text-xl font-bold mb-8">Thêm chương học</h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 uppercase text-sm font-semibold">
            Tên chương
          </label>
          <input
            className="block min-w-96 px-4 py-1.5 rounded-2xl bg-gray-100"
            name="name"
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

export default ModalAddModule;
