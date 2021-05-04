const log = msg => console.log(msg)

const elements = {
   ouput: document.querySelector(".code-output"),
}

const buttons = {
   show: document.querySelector("#showPreloadar"),
   hide: document.querySelector("#hidePreloadar"),
   generate: document.querySelector("#generatePreloadar"),
}

const inputs = {
   type: document.querySelector("#typeInput"),
   animation: document.querySelector("#animationInput"),
   animationVariation: document.querySelector("#animationVariationInput"),
   delay: document.querySelector("#delayInput"),
   color: document.querySelector("#colorInput"),
   secondaryColor: document.querySelector("#secondaryColorInput"),
   bgColor: document.querySelector("#bgColorInput"),
   generateBox: document.querySelector("#generateTextbox")
}

inputs.animation.addEventListener("change", () => {
   if (["topBar"].indexOf(inputs.animation.value) !== -1) {
      // Disable variation
      inputs.animationVariation.setAttribute("disabled", true)
   } else {
      // Enable variation
      inputs.animationVariation.removeAttribute("disabled")
   }
})

buttons.show.addEventListener("click", () => {
   preloadar.run().show("#preloadar", {
      animation: `${inputs.animation.value}${inputs.animationVariation.value}`,
      color: inputs.color.value,
      secondaryColor: inputs.secondaryColor.value,
      bgColor: inputs.bgColor.value,
      onActive: () => {
         buttons.hide.classList.remove("hide")
      }
   })
})

buttons.hide.addEventListener("click", () => {
   preloadar.run().hide("#preloadar", {
      onComplete: () => {
         buttons.hide.classList.add("hide");
      }
   })
})

buttons.generate.addEventListener("click", () => {
   generateCodeHandler();
})

const generateCodeHandler = () => {
   let html;

   if (inputs.type.value === "hide") {
      html = `
      preloadar.run().${inputs.type.value}("#preloadar", {
         onComplete: () => {
            
         }
      })`
   } else {
      html = `
      preloadar.run().${inputs.type.value}("#preloadar", {
         animation: "${inputs.animation.value}${inputs.animationVariation.value}",
         delay: ${+inputs.delay.value},
         color: "${inputs.color.value}",
         secondaryColor: "${inputs.secondaryColor.value}",
         bgColor: "${inputs.bgColor.value}"
      })`
   }

   elements.ouput.innerHTML = html;
   Prism.highlightAll();
}

generateCodeHandler();

preloadar.run().auto("#preloadar", {
   animation: "spin",
   delay: 1000,
   color: "#2b84e4",
   secondaryColor: "#e8e7e7",
   bgColor: "#ffffff"
})