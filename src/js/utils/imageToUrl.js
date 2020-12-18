export function toDataURL(element) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(element.files[0]);
    reader.onloadend = () => resolve(reader.result);
  });
}
