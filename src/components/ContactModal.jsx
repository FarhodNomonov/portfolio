import { createContext, lazy, Suspense, useCallback, useContext, useState } from "react";
import { Toaster } from "react-hot-toast";

// The form (react-hook-form + modal) loads only when someone opens it.
const Modal = lazy(() => import("./ui/modal"));

const ContactModalContext = createContext(() => {});

/** Lets any section (hero, contact) open the existing contact form modal. */
export function ContactModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const openModal = useCallback(() => setOpen(true), []);

  return (
    <ContactModalContext.Provider value={openModal}>
      {children}
      {open && (
        <Suspense fallback={null}>
          <Modal onClose={() => setOpen(false)} />
        </Suspense>
      )}
      <Toaster position="top-center" />
    </ContactModalContext.Provider>
  );
}

export const useContactModal = () => useContext(ContactModalContext);
