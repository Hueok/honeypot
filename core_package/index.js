import { html, parse } from "diff2html";
import "diff2html/bundles/css/diff2html.min.css";

document.getElementById("textForm").onsubmit = function (e) {
  e.preventDefault();
  fetch("/api/compare", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text1: document.getElementById("text1").value,
      text2: document.getElementById("text2").value,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("API Response:", data); // Debug: Check API response
      if (data.diff) {
        console.log("Diff Data:", data.diff); // Debug: Check diff data
        const diffJson = parse(data.diff);
        const diffHtml = html(diffJson, { drawFileList: false });
        document.getElementById("diffOutput").innerHTML = diffHtml;
      } else {
        console.error("Diff data is missing in the response");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("diffOutput").innerText =
        "An error occurred while processing the diff.";
    });
};
