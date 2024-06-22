export function fileToBase64(file) {
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const base64String = event.target.result.split(",")[1];
      return base64String;
    };
    reader.readAsDataURL(file);
  }
}
