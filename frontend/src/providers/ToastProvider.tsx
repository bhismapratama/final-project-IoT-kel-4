import 'react-toastify/dist/ReactToastify.css';

import { Slide, ToastContainer } from 'react-toastify';

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        closeButton={false}
        newestOnTop
        closeOnClick
        transition={Slide}
      />
    </>
  );
}
