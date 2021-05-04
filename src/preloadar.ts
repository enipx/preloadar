type Func = (x: any) => any;

export default class preloadar {

   private static instance: preloadar;
   // Default Data
   private def = {
      packageName: "Preloadar",
      elements: {
         container: "#preloadarContainer"
      },
      optionDatas: {
         type: "page",
         animation: "spin",
         duration: 10,
         delay: 500,
         start: 0,
         end: 100,
         step: 1,
         unit: "%",
         color: "#2b84e4",
         secondaryColor: "#e8e7e7",
         bgColor: "#ffffff",
         progressElement: "",
         progress: 0,
         onActive: () => "",
         onComplete: () => "",
      },
      styles: {
         css: {
            color: "--preloadar-main-color",
            secondaryColor: "--preloadar-main-alt-color",
            bg: "--preloadar-bg-color",
         },
         type: {
            page: "preloadarPage",
            topBar: "preloadarTopBar"
         },
         body: "preloadarBodyStyle",
         scale: "preloadarScaleStyle",
         rotate: "preloadarRotateStyle",
         topBar: "preloadarTopBarStyle",
         spin: ["preloadarSpinStyle", "style"],
         hide: "preloadarHide",
      }
   };

   // Helper Functions
   private helperFunc = {
      log: (msg: string | number) => console.log(`%c${this.def.packageName}:`, "background-color:red; padding:3px 5px; border-radius:3px; color:white;", `${msg}`),

      isEmpty: (val: string) => val === "" || val === undefined || val === null,

      attributeExist: (obj: { element: string; attribute: string }) => document.querySelector(obj.element)?.hasAttribute(obj.attribute),

      getDOMElement: (identifier: string) => document.querySelector(identifier) as HTMLElement,

      verifyOptions: (options: any) => {
         if (!this.helperFunc.isEmpty(options)) {
            Object.keys(options).forEach((option) => {
               this.helperFunc.isEmpty(options[option]) ? this.helperFunc.log(`No value set in ${option}`) : this.def.optionDatas[option] = options[option];
            })
         }
      },

      changeCssVariable: (key: string, value: string) => {
         this.helperFunc.getDOMElement(":root").style.setProperty(key, value);
      },

      domAction: (obj: { action: string; element: string }) => {
         switch ((obj.action).toLowerCase()) {
            case "hide":
               this.helperFunc.getDOMElement(obj.element).style.display = "none";
               break;

            case "show":
               this.helperFunc.getDOMElement(obj.element).style.display = "block";
               break;

            case "flex":
               this.helperFunc.getDOMElement(obj.element).style.display = "flex";
               break;

            default: "";
         }
      },

      argumentsValidation: (...args: any[]) => {
         const log = this.helperFunc.log;

         switch (true) {

            case (args.length < 1):
               // log Error
               log("Specify element to preload");
               return false;

            case (args.length === 1 && !this.helperFunc.getDOMElement(args[0]) === null):
               // log Error
               log("Please specify an element within the DOM");
               return false;

            case (args.length === 1 && typeof args[0] !== "string"):
               // log Error
               log("String only accepted as first parameter");
               return false;

            case (args.length === 2 && typeof args[0] !== "string"):
               // log Error
               log("First argument only accepts strings")
               return false;

            case (args.length === 2 && typeof args[1] !== "object"):
               // log Error
               log("Second argument only accepts object")
               return false;

            case (args.length === 2 && this.helperFunc.getDOMElement(args[0]) === null):
               // log Error
               log("Element specify doesn't exist in dom, please check again")
               return false;

            case (args.length > 2):
               // log Error
               log("accepts only two argument `element` and `options`");
               return false;

            default:
               // Run Passed Element
               this.helperFunc.verifyOptions(args[1]);
               return true;
         }
      }
   }

   // Constructor
   private constructor() { }

   // Get Instance
   static run() {
      if (preloadar.instance) {
         return this.instance;
      }
      this.instance = new preloadar();
      return this.instance;
   }

   // Show Preloadar
   show(...args: any[]) {
      if (this.helperFunc.argumentsValidation(...args)) {
         const preloadarDOM = this.helperFunc.getDOMElement(args[0]);

         this.helperFunc.domAction({
            element: args[0],
            action: "flex"
         })

         preloadarDOM.classList.remove(this.def.styles.hide)
         preloadarDOM.classList.add(this.def.styles.type[this.def.optionDatas.type]);
         this.helperFunc.getDOMElement("body").classList.add(this.def.styles.body)

         if (this.def.optionDatas.color) {
            this.helperFunc.changeCssVariable(this.def.styles.css.color, this.def.optionDatas.color);
         }

         if (this.def.optionDatas.bgColor) {
            this.helperFunc.changeCssVariable(this.def.styles.css.bg, this.def.optionDatas.bgColor);
         }

         if (this.def.optionDatas.secondaryColor) {
            this.helperFunc.changeCssVariable(this.def.styles.css.secondaryColor, this.def.optionDatas.secondaryColor);
         }

         // onActive
         this.def.optionDatas.onActive ? this.def.optionDatas.onActive() : "";

         switch (true) {
            case ["scale", "rotate"].indexOf(this.def.optionDatas.animation) !== -1:
               preloadarDOM.children[0] ? preloadarDOM.children[0].classList.add(this.def.styles[this.def.optionDatas.animation]) : this.helperFunc.log(`No child element to animate found in element with this identifier "${args[0]}"`);
               break;

            case this.def.optionDatas.animation === "topBar":
               preloadarDOM.innerHTML = "";
               const animElem = document.createElement("div");
               animElem.classList.add(this.def.styles[this.def.optionDatas.animation]);
               preloadarDOM.append(animElem);
               break;

            default:
               preloadarDOM.innerHTML = "";
               preloadarDOM.insertAdjacentHTML("beforeend", `<div class="loadar ${this.def.optionDatas.animation}"></div>`)
               break;

         }
      }
   }

   // Close Preloadar
   hide(...args) {

      const preloadarDOM = this.helperFunc.getDOMElement(args[0]);
      let hasInstanceOfPreloadar = false;

      if (preloadarDOM) {

         if (args.length === 2) {
            this.helperFunc.argumentsValidation(...args)
         }

         Object.values(this.def.styles.type).forEach(type => {
            if (preloadarDOM.classList.contains(type)) {
               hasInstanceOfPreloadar = true;
               return;
            }
         })

         if (hasInstanceOfPreloadar) {

            preloadarDOM.classList.add(this.def.styles.hide);

            if (this.helperFunc.getDOMElement(this.def.elements.container)) {
               this.helperFunc.getDOMElement(this.def.elements.container).setAttribute("style", "display: block !important")
            }

            preloadarDOM.addEventListener("transitionend", () => {
               this.helperFunc.domAction({
                  element: args[0],
                  action: "hide"
               })

               this.helperFunc.getDOMElement("body").classList.remove(this.def.styles.body);

            })

            // OnComplete
            this.def.optionDatas.onComplete ? this.def.optionDatas.onComplete() : "";

         } else {
            this.helperFunc.log(`element with the identifier of ${args[0]} doesn't have the instance of preloadar`)
         }

      } else {
         this.helperFunc.log(`element with the identifier of ${args[0]} doesn't exist`)
      }
   }


   // On Load
   auto(...args) {
      this.show(...args);
      document.addEventListener("readystatechange", () => {
         if (document.readyState === "complete") {
            setTimeout(() => {
               this.hide(...args);
            }, this.def.optionDatas.delay)
         }
      })
   }


   // Manual
   manual(...args) {

      this.show(...args);
      let progress = this.def.optionDatas.start;

      const load = setInterval(() => {
         if (progress === this.def.optionDatas.end) {
            clearInterval(load);
            this.hide(...args);
         } else {
            progress += this.def.optionDatas.step;
            this.def.optionDatas.progress = Math.round((progress / this.def.optionDatas.end) * 100);

            // Update dom text here
            if (this.def.optionDatas.progressElement)
               this.helperFunc.getDOMElement(this.def.optionDatas.progressElement).innerHTML = (this.def.optionDatas.progress).toString();
         }

      }, this.def.optionDatas.end);

   }
}