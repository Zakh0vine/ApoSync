import Swal from "sweetalert2";
import "@/styles/swal.css";

const Edit = async ({ title, text, className }) => {
  return new Promise((resolve) => {
    const swalWithCustom = Swal.mixin({
      customClass: {
        container: "rounded",
        popup: `rounded-popup${className}`,
        actions: "custom-actions",
      },
    });
    swalWithCustom
      .fire({
        html: `
          <div class="custom-content">
            <div class="warning-icon">
              <svg width="281" height="250" viewBox="0 0 281 250" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3_809)">
<path d="M196.407 40.625L240.411 84.668C242.265 86.5234 242.265 89.5508 240.411 91.4062L133.865 198.047L88.5931 203.076C82.5438 203.76 77.4214 198.633 78.1043 192.578L83.1292 147.266L189.675 40.625C191.529 38.7695 194.553 38.7695 196.407 40.625ZM275.439 29.4434L251.632 5.61523C244.216 -1.80664 232.166 -1.80664 224.702 5.61523L207.433 22.9004C205.579 24.7559 205.579 27.7832 207.433 29.6387L251.436 73.6816C253.29 75.5371 256.315 75.5371 258.169 73.6816L275.439 56.3965C282.854 48.9258 282.854 36.8652 275.439 29.4434ZM187.333 169.043V218.75H31.2222V62.5H143.329C144.891 62.5 146.354 61.8652 147.476 60.791L166.99 41.2598C170.698 37.5488 168.063 31.25 162.843 31.25H23.4167C10.4887 31.25 0 41.748 0 54.6875V226.562C0 239.502 10.4887 250 23.4167 250H195.139C208.067 250 218.556 239.502 218.556 226.562V149.512C218.556 144.287 212.262 141.699 208.555 145.361L189.041 164.893C187.968 166.016 187.333 167.48 187.333 169.043Z" fill="#6499E9"/>
</g>
<defs>
<clipPath id="clip0_3_809">
<rect width="281" height="250" fill="white"/>
</clipPath>
</defs>
</svg>
            </div>
            <div class="custom-title">${title}</div>
            <div class="warning-text">${text}</div>
          </div>
        `,

        showCancelButton: true,
        confirmButtonColor: "#6499E9",
        cancelButtonColor: "#6499E9",
        confirmButtonText: "Edit",
        cancelButtonText: "Batal",
        reverseButtons: true,
        allowOutsideClick: false,
      })
      .then((result) => {
        resolve(result);
      });
  });
};

export default Edit;
