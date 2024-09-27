export const getCsrfToken = () => {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
};


// export const getCsrfToken = async () => {
//     try {
//         const response = await fetch("http://localhost:5500/csrf", {
//             method: "GET",
//             credentials: "include"
//         });

//         if (!response.ok) {
//             throw new Error("Failed to fetch CSRF token");
//         }

//         const token = await response.json();
//         console.log(token);
//         return token.token;
//     } catch (error) {
//         console.error("Error feetching CSRF Token:", error);
//         return null;
//     }
// };