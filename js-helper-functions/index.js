// generate a random number between two specified numbers
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// generate a random boolean value, which can be interpreted as 0 or 1
function getRandomBoolean() {
  return Math.random() < 0.5 ? false : true;
}

// get a random hex color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// select a random element from an array.
function getRandomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// convert image to base64 ( ex. usage: const base64Image = await imageToBase64(selectedImage); )
function imageToBase64(image) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(image);
  });
}
