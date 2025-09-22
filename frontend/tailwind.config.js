/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}", // adjust to match your project structure
    ],
    theme: {
        extend: {
            colors: {
                deepteal: {
                    50: "var(--color-deepteal-50)",
                    100: "var(--color-deepteal-100)",
                    200: "var(--color-deepteal-200)",
                    300: "var(--color-deepteal-300)",
                    400: "var(--color-deepteal-400)",
                    500: "var(--color-deepteal-500)",
                    600: "var(--color-deepteal-600)",
                    700: "var(--color-deepteal-700)",
                    800: "var(--color-deepteal-800)",
                    900: "var(--color-deepteal-900)",
                },
                ocean: {
                    50: "var(--color-ocean-50)",
                    100: "var(--color-ocean-100)",
                    200: "var(--color-ocean-200)",
                    300: "var(--color-ocean-300)",
                    400: "var(--color-ocean-400)",
                    500: "var(--color-ocean-500)",
                    600: "var(--color-ocean-600)",
                    700: "var(--color-ocean-700)",
                    800: "var(--color-ocean-800)",
                    900: "var(--color-ocean-900)",
                },

                sage: {
                    50: "var(--color-sage-50)",
                    100: "var(--color-sage-100)",
                    200: "var(--color-sage-200)",
                    300: "var(--color-sage-300)",
                    400: "var(--color-sage-400)",
                    500: "var(--color-sage-500)",
                    600: "var(--color-sage-600)",
                    700: "var(--color-sage-700)",
                    800: "var(--color-sage-800)",
                    900: "var(--color-sage-900)",
                },

                cream: {
                    50: "var(--color-cream-50)",
                    100: "var(--color-cream-100)",
                    200: "var(--color-cream-200)",
                    300: "var(--color-cream-300)",
                    400: "var(--color-cream-400)",
                    500: "var(--color-cream-500)",
                    600: "var(--color-cream-600)",
                    700: "var(--color-cream-700)",
                    800: "var(--color-cream-800)",
                    900: "var(--color-cream-900)",
                },

                beige: {
                    50: "var(--color-beige-50)",
                    100: "var(--color-beige-100)",
                    200: "var(--color-beige-200)",
                    300: "var(--color-beige-300)",
                    400: "var(--color-beige-400)",
                    500: "var(--color-beige-500)",
                    600: "var(--color-beige-600)",
                    700: "var(--color-beige-700)",
                    800: "var(--color-beige-800)",
                    900: "var(--color-beige-900)",
                },

                pearl: {
                    50: "var(--color-pearl-50)",
                    100: "var(--color-pearl-100)",
                    200: "var(--color-pearl-200)",
                    300: "var(--color-pearl-300)",
                    400: "var(--color-pearl-400)",
                    500: "var(--color-pearl-500)",
                    600: "var(--color-pearl-600)",
                    700: "var(--color-pearl-700)",
                    800: "var(--color-pearl-800)",
                    900: "var(--color-pearl-900)",
                },
            },
        },
    },
    plugins: [],
};
