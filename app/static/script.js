document.getElementById("textForm").onsubmit = function (e) {
  e.preventDefault();

  const text1 = document.getElementById("text1").value;
  const text2 = document.getElementById("text2").value;

  if (text1 === text2) {
    document.getElementById("result").innerText = "They are absolutely same.";
    document.getElementById("myDiffElement").innerHTML = ""; // Clear the diff output
    return;
  }

  document.getElementById("result").innerText = "There are some differences.";

  const diffString = createDiff(text1, text2);

  var targetElement = document.getElementById("myDiffElement");
  var configuration = {
    drawFileList: true,
    fileListToggle: false,
    fileListStartVisible: false,
    fileContentToggle: false,
    matching: "lines",
    outputFormat: "side-by-side",
    synchronisedScroll: true,
    highlight: true,
    renderNothingWhenEmpty: false,
  };
  var diff2htmlUi = new Diff2HtmlUI(targetElement, diffString, configuration);
  diff2htmlUi.draw();
  diff2htmlUi.highlightCode();
};

// function createDiff(text1, text2) {
//   const diff = `diff --git a/text1 b/text2
//   index 0000001..0ddf2ba
//   --- a/text1
//   +++ b/text2
//   @@ -1 +1 @@
//   -${text1}
//   +${text2}`;
//   return diff;
// }
function createDiff(text1, text2) {
  // Using jsdiff's createTwoFilesPatch to generate a proper diff string
  const diff = window.Diff.createTwoFilesPatch(
    "a/text",
    "b/text",
    text1,
    text2,
    "",
    ""
  );
  return diff;
}
