import Swal from "sweetalert2";
import "@/styles/swal.css";

const Delete = async ({ title, text, className }) => {
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
              <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M166.237 39.3501L274.162 226.275C275.808 229.125 276.674 232.359 276.674 235.65C276.674 238.941 275.808 242.175 274.162 245.025C272.517 247.875 270.15 250.242 267.3 251.888C264.449 253.534 261.216 254.4 257.925 254.4H42.0747C38.7834 254.4 35.5502 253.534 32.6999 251.888C29.8496 250.242 27.4827 247.875 25.8371 245.025C24.1915 242.175 23.3252 238.941 23.3252 235.65C23.3252 232.359 24.1916 229.125 25.8372 226.275L133.762 39.3501C140.975 26.8501 159.012 26.8501 166.237 39.3501ZM150 61.2251L52.8997 229.4H247.1L150 61.2251ZM150 187.5C153.315 187.5 156.494 188.817 158.839 191.161C161.183 193.505 162.5 196.685 162.5 200C162.5 203.315 161.183 206.495 158.839 208.839C156.494 211.183 153.315 212.5 150 212.5C146.685 212.5 143.505 211.183 141.161 208.839C138.817 206.495 137.5 203.315 137.5 200C137.5 196.685 138.817 193.505 141.161 191.161C143.505 188.817 146.685 187.5 150 187.5ZM150 100C153.315 100 156.494 101.317 158.839 103.661C161.183 106.005 162.5 109.185 162.5 112.5V162.5C162.5 165.815 161.183 168.995 158.839 171.339C156.494 173.683 153.315 175 150 175C146.685 175 143.505 173.683 141.161 171.339C138.817 168.995 137.5 165.815 137.5 162.5V112.5C137.5 109.185 138.817 106.005 141.161 103.661C143.505 101.317 146.685 100 150 100Z" fill="#F02626"/>
</svg>
            </div>
            <div class="custom-title">${title}</div>
            <div class="warning-text">${text}</div>
          </div>
        `,

        showCancelButton: true,
        confirmButtonColor: "#F02626",
        cancelButtonColor: "#6499E9",
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
        reverseButtons: true,
      })
      .then((result) => {
        resolve(result);
      });
  });
};

export default Delete;
