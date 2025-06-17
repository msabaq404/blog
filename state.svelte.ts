type Theme = "light" | "dark";

let theme: Theme = $state('light');


export const toggleTheme = () => {
  theme = document.documentElement.getAttribute("data-theme") as Theme || "light";
  theme = (theme === "light") ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
};

export const getTheme = () => theme;

export const setTheme = (newTheme: Theme) => theme = newTheme;
