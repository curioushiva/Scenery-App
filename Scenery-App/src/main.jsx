import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/Utils/Redux/Store/Store";
import "@/Styles/index.css";
import App from "@/App/App";

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
);
