import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AppProvider } from "./context/AppContext";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import FavoritesPage from "./pages/FavoritesPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const [search, setSearch] = useState("");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <AppProvider>
      <BrowserRouter>
        <Header
          search={search}
          onSearch={setSearch}
          onlyFavorites={onlyFavorites}
          onToggleFavorites={() =>
            setOnlyFavorites((previous) => !previous)
          }
          onApiKeySaved={() =>
            setRefreshKey((previous) => previous + 1)
          }
        />

        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                search={search}
                onlyFavorites={onlyFavorites}
                refreshKey={refreshKey}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
