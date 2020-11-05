

const recipeEl = document.querySelectorAll(".recipe");
const toggleEl = document.querySelectorAll(".toggle");
const recipeDataEl = document.querySelectorAll(".recipe-data");

let show = false;

toggleEl.forEach((el, index) => {
  console.log(el)
  el.addEventListener("click", () => {
    recipeDataEl[index].classList.toggle("show");
    const text = el.innerHTML === "ESCONDER" ? "MOSTRAR" : "ESCONDER";
    el.innerHTML = text;
  });
});

recipeEl.forEach((recipe, index) => {
  recipe.addEventListener("click", () => {
    window.location.href = "/recipes/" + recipe.id;
  });
});
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

const Preparation = {
  addIngredient(event) {
    if (event.target.classList.value === "add-ingredient") {
      const ingredients = document.querySelector("#ingredients");
      const fieldContainer = document.querySelectorAll(".ingredient");
      // Realiza um clone do último ingrediente adicionado
      const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);
      // Não adiciona um novo input se o último tem um valor vazio
      if (newField.children[0].value == "") return false;
      // Deixa o valor do input vazio
      newField.children[0].value = "";
      ingredients.appendChild(newField);
    } else {
      const ingredients = document.querySelector("#steps");
      const fieldContainer = document.querySelectorAll(".step");
  
      // Realiza um clone do último ingrediente adicionado
      const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);
  
      // Não adiciona um novo input se o último tem um valor vazio
      if (newField.children[0].value == "") return false;
  
      // Deixa o valor do input vazio
      newField.children[0].value = "";
      ingredients.appendChild(newField);
    }
  }
}

const PhotosUpload = {
  input: "",
  preview: document.querySelector("#photos-preview"),
  uploadLimit: 5,
  files: [],
  handleInputFile(event) {
    const { files: fileList } = event.target;
    PhotosUpload.input = event.target;
    if (PhotosUpload.hasLimit(event))return;
      Array.from(fileList).forEach((file) => {
        PhotosUpload.files.push(file);
        const reader = new FileReader();
        reader.onload = () => {
          const image = new Image();
          image.src = String(reader.result);
          const div = PhotosUpload.createContainer(image);
          PhotosUpload.preview.appendChild(div)
        }
        reader.readAsDataURL(file);
    });
      PhotosUpload.input.files = PhotosUpload.getAllFiles();

    },
  getAllFiles() {
    const dataTransfer =
      new ClipboardEvent("").clipboardData || new DataTransfer();
    PhotosUpload.files.forEach((file) => dataTransfer.items.add(file));
    return dataTransfer.files;
  },
  hasLimit(event) {
    const { uploadLimit, input, preview } = PhotosUpload;
    const { files: fileList } = input;
    if (fileList.length > uploadLimit) {
      alert(`Envie no maximo ${uploadLimit} fotos`);
      event.preventDefault();
      return true;
    }
    const photosDiv = [];
    preview.childNodes.forEach((item) => {
      if (item.classList && item.classList.value == "photo") {
        photosDiv.push(item);
      }
    }) 
    const totalPhotos = fileList.length + photosDiv.length;
    if (totalPhotos > uploadLimit) {
      alert("Limite de fotosss atingido");
      return true;
  }
    return false;
  },
  createContainer(image) {
    const div = document.createElement("div");
    div.classList.add("photo");
    div.onclick = PhotosUpload.removePhoto;
    div.appendChild(image);
    div.appendChild(PhotosUpload.getRemoveButton());
    return div;
  },
  getRemoveButton() {
    const button = document.createElement("i");
    button.classList.add("material-icons");
    button.innerHTML = "close";
    return button;
  },
  removePhoto(event) {
    const photoDiv = event.target.parentNode;
    const photosArray = Array.from(PhotosUpload.preview.children);
    const index = photosArray.indexOf(photoDiv);
    PhotosUpload.files.splice(index, 1);
    PhotosUpload.input.files = PhotosUpload.getAllFiles();
    photoDiv.remove();
  },
  removeOldPhoto(event) {
    const photoDiv = event.target.parentNode;
    if (photoDiv.id) {

      const removedFiles = document.querySelector(
        'input[name="removed_files"]'
      );
      if (removedFiles) {
 
        removedFiles.value += `${photoDiv.id},`;
      }
      console.log(removedFiles)
    }

    photoDiv.remove();
  },
};

const ImageGallery = {
  previews: document.querySelectorAll('.gallery-preview img'),
  highlight: document.querySelector('.highlight > img'),
  setImage(e) {
      const { target } = e
      ImageGallery.previews.forEach(preview => {
          preview.classList.remove('active')
      })
      target.classList.add('active')
      ImageGallery.highlight.src = target.src
      console.log(e)
  }
}



