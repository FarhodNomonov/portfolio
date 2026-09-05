import { useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import Loader from "../loader";

function Modal({ onClose }) {
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const errorsStyle = {
    true: {
      border: "1px solid red",
    },
    false: {},
  };


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
        toast.success(<FormattedMessage id="app.contactme_scc" />);
        onClose();
        reset();
      } else {
        toast.error(<FormattedMessage id="app.contactme_err" />);
      }
      setLoader(false);
    })
    .catch(() => {
      toast.error(<FormattedMessage id="app.contactme_err" />);
      setLoader(false);
    });
};

  return (
    <>
      {loader && <Loader />}
      <div className="modal">
        <div className="modal_container">
          <div className="close_btn" onClick={onClose}>
            &#x2715;
          </div>
          <div className="modal_title">
            <h2>
              <FormattedMessage id="app.contactme" />
            </h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              <FormattedMessage id="app.name" />
            </label>
            <input
              type="text"
              {...register("first_name", { required: true })}
              style={errorsStyle[!!errors.first_name]}
            />
            <label>
              <FormattedMessage id="app.email" />
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              style={errorsStyle[!!errors.email]}
            />
            <label>
              <FormattedMessage id="app.desc" />
            </label>

            <FormattedMessage id="app.tlg.msg" defaultMessage="search">
              {(placeholder) => (
                <textarea
                  {...register("message")}
                  cols="30"
                  rows="5"
                  defaultValue={placeholder}
                />
              )}
            </FormattedMessage>

            <button>
              <FormattedMessage id="app.send" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Modal;
