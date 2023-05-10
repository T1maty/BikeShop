export default {}

// export const getAnchor = () => {
//     // Get the header element
//     // const header = document.querySelector('header');
//
//     // Get the height of the header
//     const headerHeight = 80;
//     // const headerHeight = header!.offsetHeight;
//     document.querySelectorAll('a[href^="#"]')
//         .forEach(function (anchor) {
//             anchor.addEventListener('click',
//                 (event) => {
//                     event.preventDefault();
//
//                     // Get the target element that
//                     the anchor link points to
//                     const target = document.querySelector(
//                         this.getAttribute('href')
//                     );
//
//                     const targetPosition = target!
//                         .getBoundingClientRect().top - headerHeight;
//
//
//                     window.scrollTo({
//                         top: targetPosition + window.pageYOffset,
//                         behavior: 'smooth'
//                     });
//                 });
//         });
// }

// <body>
//     <style>
//         header {
//     position: fixed;
//     top: 0;
//     left: 0;
//     right: 0;
//     height: 60px;
//     background-color: lightgray;
// }
//
// .secone {
//     height: 150vh;
// }
//
// .sectwo {
//     height: 150vh;
// }
//
// main {
//     padding-top: 60px;
// }
//
// p {
//     font-size: 23px;
// }
// </style>
// <header>
// <h1>Fixed Header</h1>
// </header>
// <main>
// <div class="secone">
//
// <h2 id="section1">Section 1</h2>
// <a href="#section2">Go to Section 2</a>
// <h1>
// GeeksforGeeks: Computer Science
// Education Portal
// </h1>
// <br>
// </div>
//
// <div class="sectwo">
// <h2 id="section2">Section 2</h2>
// <a href="#section1">Go to Section 1</a>
// <h2>GeeksforGeeks: Online E-Leaning Platform</h2>
// </div>
//
// <a href="#section1">Go to Section 1</a> |
// <a href="#section2">Go to Section 2</a>
// </main>
//
// <script>
//
// // Get the header element
// var header = document.querySelector('header');
//
// // Get the height of the header
// var headerHeight = header.offsetHeight;
// document.querySelectorAll('a[href^="#"]')
//     .forEach(function (anchor) {
//         anchor.addEventListener('click',
//             function (event) {
//                 event.preventDefault();
//
//                 // Get the target element that
//                 // the anchor link points to
//                 var target = document.querySelector(
//                     this.getAttribute('href')
//                 );
//
//                 var targetPosition = target
//                     .getBoundingClientRect().top - headerHeight;
//
//                 window.scrollTo({
//                     top: targetPosition + window.pageYOffset,
//                     behavior: 'smooth'
//                 });
//             });
//     });
// </script>
// </body>