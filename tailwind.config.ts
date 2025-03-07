//tailwind.config.ts
/** @type {import('tailwindcss').Config} */
export default {
	content: [
	  "./app/**/*.{js,ts,jsx,tsx}",
	  "./pages/**/*.{js,ts,jsx,tsx}",
	  "./components/**/*.{js,ts,jsx,tsx}",
	  "./app/globals.css",
	],
	theme: {
	  extend: {
		colors: {
		  "lumi-teal": "#54F4D0",
		  "lumi-dark-teal": "#1DD2AF",
		  "lumi-navy": "#00003C",
		  "lumi-light-navy": "#080464"
		},
		fontFamily: {
		  poppins: ["Poppins", "sans-serif"],
		},
	  },
	},
	plugins: [],
  };