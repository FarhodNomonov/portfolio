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
    hasError ? "border-red-500 focus:ring-red-500" : "border-line focus:ring-lime";

  const onSubmit = (data) => {
    setLoader(true);
    fetch("/.netlify/functions/send-message", {
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
    <div className="fixed inset-0 z-[60] grid place-items-center bg-night/70 p-4 backdrop-blur-sm">
      {loader && <Loader />}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        className="relative w-full max-w-md rounded-panel border border-line bg-surface p-6 shadow-glow-soft sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={intl.formatMessage({ id: "modal.close" })}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-ink/5 hover:text-ink"
        >
          <FiX size={18} />
        </button>

        <h2 id="contact-modal-title" className="font-display text-xl font-semibold">
          <FormattedMessage id="app.contactme" />
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4">
          <div>
            <label htmlFor="contact-name" className="mb-1.5 block text-sm text-muted">
              <FormattedMessage id="app.name" />
            </label>
            <input
              id="contact-name"
              type="text"
              {...register("first_name", { required: true })}
              className={`w-full rounded-xl border bg-surface-2 px-4 py-2.5 text-sm outline-none ring-0 transition-colors focus:ring-2 ${errorClass(
                !!errors.first_name
              )}`}
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="mb-1.5 block text-sm text-muted">
              <FormattedMessage id="app.email" />
            </label>
            <input
              id="contact-email"
              type="email"
              {...register("email", { required: true })}
              className={`w-full rounded-xl border bg-surface-2 px-4 py-2.5 text-sm outline-none ring-0 transition-colors focus:ring-2 ${errorClass(
                !!errors.email
              )}`}
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="mb-1.5 block text-sm text-muted">
              <FormattedMessage id="app.desc" />
            </label>
            <textarea
              id="contact-message"
              {...register("message")}
              rows="4"
              defaultValue={intl.formatMessage({ id: "app.tlg.msg" })}
              className="w-full rounded-xl border border-line bg-surface-2 px-4 py-2.5 text-sm outline-none ring-0 transition-colors focus:ring-2 focus:ring-lime"
            />
          </div>

          <button
            type="submit"
            className="btn-primary mt-2"
          >
            <FormattedMessage id="app.send" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
