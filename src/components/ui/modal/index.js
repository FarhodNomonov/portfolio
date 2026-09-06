import { useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { FiX } from "react-icons/fi";
import Loader from "../loader";

function Modal({ onClose }) {
  const intl = useIntl();
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const errorClass = (hasError) =>
    hasError ? "border-red-500 focus:ring-red-500" : "border-zinc-200 dark:border-zinc-700 focus:ring-indigo-500";

  const onSubmit = (data) => {
    setLoader(true);
    fetch("/api/send-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.ok) {
          toast.success(intl.formatMessage({ id: "app.contactme_scc" }));
          onClose();
          reset();
        } else {
          toast.error(intl.formatMessage({ id: "app.contactme_err" }));
        }
        setLoader(false);
      })
      .catch(() => {
        toast.error(intl.formatMessage({ id: "app.contactme_err" }));
        setLoader(false);
      });
  };

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-zinc-950/60 p-4 backdrop-blur-sm">
      {loader && <Loader />}
      <div className="relative w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
        >
          <FiX size={18} />
        </button>

        <h2 className="text-xl font-bold">
          <FormattedMessage id="app.contactme" />
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4">
          <div>
            <label className="mb-1 block text-sm text-zinc-500 dark:text-zinc-400">
              <FormattedMessage id="app.name" />
            </label>
            <input
              type="text"
              {...register("first_name", { required: true })}
              className={`w-full rounded-xl border bg-transparent px-4 py-2.5 text-sm outline-none ring-0 transition-colors focus:ring-2 ${errorClass(
                !!errors.first_name
              )}`}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-500 dark:text-zinc-400">
              <FormattedMessage id="app.email" />
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className={`w-full rounded-xl border bg-transparent px-4 py-2.5 text-sm outline-none ring-0 transition-colors focus:ring-2 ${errorClass(
                !!errors.email
              )}`}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-500 dark:text-zinc-400">
              <FormattedMessage id="app.desc" />
            </label>
            <textarea
              {...register("message")}
              rows="4"
              defaultValue={intl.formatMessage({ id: "app.tlg.msg" })}
              className="w-full rounded-xl border border-zinc-200 bg-transparent px-4 py-2.5 text-sm outline-none ring-0 transition-colors focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700"
            />
          </div>

          <button
            type="submit"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-transform hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
          >
            <FormattedMessage id="app.send" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
