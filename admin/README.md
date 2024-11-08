## Admin Portal setup with Shadcn TailwindCss Vite

## Instal react using vite

```
npm create vite@latest
```

## Now run

```
npm i
```

This will load all node modules and create frontend folder structure

## To check vite-react project created run

```
npm run dev
```

## Installation of tailwind css

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Add below to tailwind.config.js.

```
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
```

## Add below to index.css file.

```
@tailwind base;
@tailwind components;
@tailwind utilities;

```

## Update App.js file with this

```
import "./App.css";

function App() {
  return (
    <>
      <h1 className="text-3xl underline">Heloo</h1>
    </>
  );
}

export default App;
```

## Check vite-react project with tailwind Css is running.

```
npm run dev
```

## Now Add shadcn to project

## Create new file jsconfig.json

```
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

## Run this

```
npm i -D @types/node
```

## Add this to vite.config.js

```
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

```

## Run this command

```
npx shadcn@latest init
```

If error occured re-run above command again or clear the cookie using.

```
npm cache clean --force
```

Select options correctly shown during installation.

## Add Button Component from shadcn

```
npx shadcn@latest add button
```

## Add this to App.jsx

```
import "./App.css";
import { Button } from "@/components/ui/button"

function App() {
return (
<>
<h1 className="text-3xl underline">Heloo</h1>
<Button>Click me</Button>
</>
);
}

export default App;

```

## Run app again

```
npm run dev
```
