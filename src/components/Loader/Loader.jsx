import { SyncLoader } from "react-spinners";

export const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center v-100 h-100 flex-column gap-4">
      <SyncLoader data-testid="loader" />
      <p>Caricamento in corso</p>
    </div>
  );
};
